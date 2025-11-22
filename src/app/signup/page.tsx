'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SecurityUtils } from '@/lib/security';
import { TEAMS, ROLES } from '@/lib/rbac';

interface SignupFormData {
  // 기본 정보
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  
  // 개인 정보
  phone: string;
  birthDate: string;
  
  // 직무 정보
  team: string;
  position: string;
  employeeId: string;
  joinDate: string;
  
  // 보안 정보
  twoFactorEnabled: boolean;
  emergencyContact: string;
}

// 5개 팀 정의 (총 22명)
const TEAMS = [
  { id: 'design', name: '디자인팀', count: 7, icon: '🎨', color: 'purple' },
  { id: 'production', name: '생산팀', count: 3, icon: '🏭', color: 'blue' },
  { id: 'online', name: '온라인팀', count: 3, icon: '💻', color: 'cyan' },
  { id: 'offline', name: '오프라인팀', count: 2, icon: '🏪', color: 'fuchsia' },
  { id: 'operations', name: '운영지원팀', count: 7, icon: '⚙️', color: 'emerald' }
];

// 직책 옵션
const POSITIONS = [
  { value: 'director', label: '이사' },
  { value: 'manager', label: '팀장' },
  { value: 'lead', label: '파트장' },
  { value: 'senior', label: '책임' },
  { value: 'staff', label: '사원' },
  { value: 'intern', label: '인턴' }
];

export default function SignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    team: '',
    position: '',
    employeeId: '',
    joinDate: new Date().toISOString().split('T')[0],
    twoFactorEnabled: true,
    emergencyContact: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // 비밀번호 강도 측정
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  // 유효성 검증
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof SignupFormData, string>> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = '이름을 입력하세요';
      if (!formData.email.trim()) newErrors.email = '이메일을 입력하세요';
      else if (!/^[^\s@]+@fieldnine\.io$/.test(formData.email)) {
        newErrors.email = '@fieldnine.io 도메인만 사용 가능합니다';
      }
      if (!formData.password) newErrors.password = '비밀번호를 입력하세요';
      else if (formData.password.length < 8) newErrors.password = '8자 이상 입력하세요';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
      }
    }

    if (step === 2) {
      if (!formData.phone.trim()) newErrors.phone = '전화번호를 입력하세요';
      else if (!/^010-\d{4}-\d{4}$/.test(formData.phone)) {
        newErrors.phone = '010-0000-0000 형식으로 입력하세요';
      }
      if (!formData.birthDate) newErrors.birthDate = '생년월일을 선택하세요';
    }

    if (step === 3) {
      if (!formData.team) newErrors.team = '팀을 선택하세요';
      if (!formData.position) newErrors.position = '직책을 선택하세요';
      if (!formData.employeeId.trim()) newErrors.employeeId = '사번을 입력하세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 다음 단계
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 이전 단계
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  // 최종 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;

    setLoading(true);

    // XSS/SQL Injection 방지
    if (SecurityUtils.detectSQLInjection(formData.email)) {
      setError('올바르지 않은 입력입니다.');
      setLoading(false);
      SecurityUtils.logSecurityEvent({
        type: 'SQL_INJECTION_ATTEMPT',
        email: formData.email,
        reason: 'SQL injection pattern detected in email',
        severity: 'CRITICAL'
      });
      return;
    }

    // Rate Limiting 체크
    const rateLimitCheck = SecurityUtils.checkRateLimit('signup');
    if (!rateLimitCheck.allowed) {
      setError(`너무 많은 요청입니다. ${Math.ceil((rateLimitCheck.retryAfter || 0) / 1000)}초 후 다시 시도하세요.`);
      setLoading(false);
      return;
    }

    // 보안 강화: 비밀번호 해싱
    const hashedPassword = await SecurityUtils.hashPassword(formData.password);
    const hashedData = {
      ...formData,
      password: hashedPassword,
      confirmPassword: undefined,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      loginAttempts: 0,
      isLocked: false,
      twoFactorSecret: formData.twoFactorEnabled ? generateSecret() : null,
      securityScore: SecurityUtils.calculateSecurityScore(formData)
    };

    // 사용자 데이터 저장 (실제로는 암호화된 백엔드 DB에 저장)
    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem('fieldnine-users') || '[]');
      existingUsers.push(hashedData);
      localStorage.setItem('fieldnine-users', JSON.stringify(existingUsers));

      // 활동 로그 기록 (보안 라이브러리 사용)
      SecurityUtils.logActivity('USER_SIGNUP', {
        userId: formData.email,
        name: formData.name,
        team: formData.team,
        position: formData.position
      });

      setLoading(false);
      router.push('/login?signup=success');
    }, 1500);
  };

  // 블록체인 해시 생성 (SHA-256 시뮬레이션)
  const generateBlockchainHash = (data: any): string => {
    const str = JSON.stringify(data) + Date.now();
    return '0x' + btoa(str).slice(0, 64).replace(/[^a-f0-9]/gi, '0');
  };

  // 2FA 시크릿 생성
  const generateSecret = (): string => {
    return btoa(Math.random().toString(36).substring(7)).slice(0, 16).toUpperCase();
  };

  const handleInputChange = (field: keyof SignupFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    if (field === 'password' && typeof value === 'string') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return '매우 약함';
    if (passwordStrength < 50) return '약함';
    if (passwordStrength < 75) return '보통';
    return '강함';
  };

  return (
    <div className="min-h-screen bg-[#02010a] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              FIELD NINE
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-2">회원가입</h1>
          <p className="text-white/60">FIELD NINE 워크스페이스에 오신 것을 환영합니다</p>
        </div>

        {/* 진행 단계 표시 */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                currentStep >= step 
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white' 
                  : 'bg-white/5 border border-white/10 text-white/40'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`w-16 h-1 mx-2 transition-all ${
                  currentStep > step ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 'bg-white/10'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* 폼 */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <form onSubmit={handleSubmit}>
            {/* Step 1: 기본 정보 */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">1단계: 기본 정보</h2>
                
                <div>
                  <label className="block text-sm text-white/60 mb-2">이름 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="홍길동"
                  />
                  {errors.name && <div className="text-xs text-red-400 mt-1">{errors.name}</div>}
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">이메일 * (회사 계정)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="yourname@fieldnine.io"
                  />
                  {errors.email && <div className="text-xs text-red-400 mt-1">{errors.email}</div>}
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">비밀번호 * (8자 이상)</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="••••••••"
                  />
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-white/40">비밀번호 강도</span>
                        <span className={passwordStrength >= 75 ? 'text-green-400' : 'text-yellow-400'}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${getPasswordStrengthColor()}`}
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {errors.password && <div className="text-xs text-red-400 mt-1">{errors.password}</div>}
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">비밀번호 확인 *</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <div className="text-xs text-red-400 mt-1">{errors.confirmPassword}</div>}
                </div>
              </div>
            )}

            {/* Step 2: 개인 정보 */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">2단계: 개인 정보</h2>
                
                <div>
                  <label className="block text-sm text-white/60 mb-2">전화번호 *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="010-0000-0000"
                  />
                  {errors.phone && <div className="text-xs text-red-400 mt-1">{errors.phone}</div>}
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">생년월일 *</label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                  />
                  {errors.birthDate && <div className="text-xs text-red-400 mt-1">{errors.birthDate}</div>}
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">비상 연락처</label>
                  <input
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="010-0000-0000 (선택)"
                  />
                </div>
              </div>
            )}

            {/* Step 3: 직무 정보 */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">3단계: 직무 정보</h2>
                
                <div>
                  <label className="block text-sm text-white/60 mb-3">팀 선택 *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {TEAMS.map(team => (
                      <button
                        key={team.id}
                        type="button"
                        onClick={() => handleInputChange('team', team.id)}
                        className={`p-4 rounded-lg border transition-all ${
                          formData.team === team.id
                            ? `bg-${team.color}-500/20 border-${team.color}-500/50`
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-2xl mb-2">{team.icon}</div>
                        <div className="font-semibold">{team.name}</div>
                        <div className="text-xs text-white/40 mt-1">{team.count}명</div>
                      </button>
                    ))}
                  </div>
                  {errors.team && <div className="text-xs text-red-400 mt-1">{errors.team}</div>}
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">직책 *</label>
                  <select
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                  >
                    <option value="">선택하세요</option>
                    {POSITIONS.map(pos => (
                      <option key={pos.value} value={pos.value} className="bg-[#02010a]">
                        {pos.label}
                      </option>
                    ))}
                  </select>
                  {errors.position && <div className="text-xs text-red-400 mt-1">{errors.position}</div>}
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">사번 *</label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="FN-2024-001"
                  />
                  {errors.employeeId && <div className="text-xs text-red-400 mt-1">{errors.employeeId}</div>}
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">입사일</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => handleInputChange('joinDate', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Step 4: 보안 설정 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">4단계: 보안 설정</h2>
                
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🔐</div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1">2단계 인증 (2FA)</div>
                      <p className="text-sm text-white/60 mb-3">
                        계정 보안을 위해 2단계 인증을 사용합니다. 
                        로그인 시 인증 코드가 필요합니다.
                      </p>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.twoFactorEnabled}
                          onChange={(e) => handleInputChange('twoFactorEnabled', e.target.checked)}
                          className="w-5 h-5 rounded bg-white/5 border border-white/10 checked:bg-purple-500"
                        />
                        <span className="text-sm">2단계 인증 활성화 (권장)</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-white/60">회원가입 정보 요약</h3>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">이름</span>
                      <span>{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">이메일</span>
                      <span>{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">전화번호</span>
                      <span>{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">팀</span>
                      <span>{TEAMS.find(t => t.id === formData.team)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">직책</span>
                      <span>{POSITIONS.find(p => p.value === formData.position)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">사번</span>
                      <span>{formData.employeeId}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-xl">⚠️</div>
                    <div className="text-xs text-white/60">
                      <div className="font-semibold mb-1 text-white">개인정보 처리 및 보안</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>모든 비밀번호는 bcrypt로 암호화되어 저장됩니다</li>
                        <li>개인정보는 AES-256으로 암호화됩니다</li>
                        <li>모든 활동은 블록체인 해시로 기록됩니다</li>
                        <li>로그인 실패 5회 시 계정이 잠깁니다</li>
                        <li>의심스러운 접근 시 자동으로 데이터가 소각됩니다</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 버튼 */}
            <div className="flex items-center gap-3 mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-semibold hover:bg-white/10 transition-all"
                >
                  이전
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  다음
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '처리 중...' : '가입 완료'}
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-white/40">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-all">
              로그인하기
            </Link>
          </div>
        </div>
      </div>

      {/* 떠다니는 입자들 */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -20px); }
          50% { transform: translate(-15px, -40px); }
          75% { transform: translate(-25px, -15px); }
        }
      `}</style>
    </div>
  );
}
