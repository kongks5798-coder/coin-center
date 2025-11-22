'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  birthDate: string;
  team: string;
  position: string;
  employeeId: string;
  joinDate: string;
  twoFactorEnabled: boolean;
  emergencyContact: string;
}

const SIGNUP_TEAMS = [
  { id: 'design', name: '디자인팀', count: 7, icon: '🎨', desc: 'UI/UX, 그래픽, 브랜딩', color: 'from-purple-500 to-pink-500' },
  { id: 'mardmard', name: 'MARD MARD', count: 8, icon: '🎬', desc: '크리에이티브, 컨텐츠, 마케팅', color: 'from-pink-500 to-rose-500' },
  { id: 'production', name: '생산팀', count: 3, icon: '🏭', desc: '제조, NEXUS OS, 품질관리', color: 'from-blue-500 to-cyan-500' },
  { id: 'online', name: '온라인팀', count: 3, icon: '💻', desc: '이커머스, SNS, 디지털마케팅', color: 'from-cyan-500 to-teal-500' },
  { id: 'offline', name: '오프라인팀', count: 2, icon: '🏪', desc: '매장운영, POS, 고객관리', color: 'from-fuchsia-500 to-purple-500' },
  { id: 'operations', name: '운영지원팀', count: 7, icon: '⚙️', desc: 'HR, 재무, IT, 법무', color: 'from-emerald-500 to-green-500' }
];

const POSITIONS = [
  { value: 'executive', label: '총괄', level: 9, icon: '👑' },
  { value: 'general_manager', label: '본부장', level: 8, icon: '⭐' },
  { value: 'director', label: '부장', level: 7, icon: '💎' },
  { value: 'manager', label: '실장', level: 6, icon: '🔷' },
  { value: 'team_leader', label: '팀장', level: 5, icon: '🔹' },
  { value: 'lead', label: '파트장', level: 4, icon: '📌' },
  { value: 'senior', label: '책임', level: 3, icon: '🔸' },
  { value: 'staff', label: '사원', level: 2, icon: '👤' },
  { value: 'intern', label: '인턴', level: 1, icon: '🎓' }
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
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // 비밀번호 강도 계산
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
      else if (formData.password.length < 8) newErrors.password = '최소 8자 이상 입력하세요';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
      }
      if (!formData.employeeId.trim()) newErrors.employeeId = '사번을 입력하세요';
    }

    if (step === 2) {
      if (!formData.phone.trim()) newErrors.phone = '전화번호를 입력하세요';
      else if (!/^010-\d{4}-\d{4}$/.test(formData.phone)) {
        newErrors.phone = '010-0000-0000 형식으로 입력하세요';
      }
      if (!formData.birthDate) newErrors.birthDate = '생년월일을 선택하세요';
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = '비상연락처를 입력하세요';
    }

    if (step === 3) {
      if (!formData.team) newErrors.team = '팀을 선택하세요';
      if (!formData.position) newErrors.position = '직책을 선택하세요';
    }

    if (step === 4) {
      if (!agreedToTerms) {
        alert('이용약관에 동의해주세요');
        return false;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;

    setLoading(true);

    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem('fieldnine-users') || '[]');
      existingUsers.push({
        ...formData,
        password: btoa(formData.password),
        confirmPassword: undefined,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('fieldnine-users', JSON.stringify(existingUsers));

      setLoading(false);
      router.push('/login?signup=success');
    }, 1500);
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
    if (passwordStrength < 40) return 'bg-red-500';
    if (passwordStrength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return '약함';
    if (passwordStrength < 70) return '보통';
    return '강함';
  };

  return (
    <div className="min-h-screen bg-[#02010a] text-white relative overflow-hidden">
      {/* 고급스러운 배경 그라데이션 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-fuchsia-900/20 via-transparent to-transparent" />
      </div>

      {/* 그리드 패턴 */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block group">
              <div className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                FIELD NINE
              </div>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">워크스페이스 가입</h1>
            <p className="text-white/60 text-sm md:text-base">30명의 팀원과 함께 미래를 설계하세요</p>
          </div>

          {/* 진행 단계 표시 (고급형) */}
          <div className="mb-10 px-4 md:px-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[
                { step: 1, label: '계정 정보', icon: '👤' },
                { step: 2, label: '개인 정보', icon: '📋' },
                { step: 3, label: '직무 정보', icon: '💼' },
                { step: 4, label: '완료', icon: '✓' }
              ].map(({ step, label, icon }) => (
                <div key={step} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    {/* 연결선 */}
                    {step < 4 && (
                      <div className={`absolute top-6 left-1/2 w-full h-0.5 transition-all duration-500 ${
                        currentStep > step 
                          ? 'bg-gradient-to-r from-purple-500 to-cyan-500' 
                          : 'bg-white/10'
                      }`} />
                    )}
                    
                    {/* 스텝 아이콘 */}
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                      currentStep >= step 
                        ? 'bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/50' 
                        : 'bg-black/60 border border-white/10'
                    }`}>
                      {currentStep > step ? '✓' : icon}
                    </div>
                    
                    {/* 라벨 */}
                    <div className={`mt-2 text-xs md:text-sm font-medium transition-colors ${
                      currentStep >= step ? 'text-white' : 'text-white/40'
                    }`}>
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 메인 폼 카드 */}
          <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl max-w-3xl mx-auto">
            <form onSubmit={handleSubmit}>
              {/* STEP 1: 계정 정보 */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      계정 정보
                    </h2>
                    <p className="text-white/60 text-sm">로그인에 사용할 계정 정보를 입력하세요</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        이름 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="홍길동"
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">⚠️ {errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        사번 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.employeeId}
                        onChange={(e) => handleInputChange('employeeId', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="F9-2025001"
                      />
                      {errors.employeeId && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">⚠️ {errors.employeeId}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      회사 이메일 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="yourname@fieldnine.io"
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">⚠️ {errors.email}</p>}
                    <p className="text-xs text-white/40 mt-1.5">@fieldnine.io 도메인만 사용 가능합니다</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      비밀번호 <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all pr-12"
                        placeholder="8자 이상, 영문+숫자+특수문자"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                              style={{ width: `${passwordStrength}%` }}
                            />
                          </div>
                          <span className="text-xs text-white/60">{getPasswordStrengthText()}</span>
                        </div>
                      </div>
                    )}
                    {errors.password && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">⚠️ {errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      비밀번호 확인 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="비밀번호를 다시 입력하세요"
                    />
                    {errors.confirmPassword && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">⚠️ {errors.confirmPassword}</p>}
                  </div>
                </div>
              )}

              {/* STEP 2: 개인 정보 */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      개인 정보
                    </h2>
                    <p className="text-white/60 text-sm">본인 확인을 위한 개인 정보를 입력하세요</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        전화번호 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="010-0000-0000"
                      />
                      {errors.phone && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">⚠️ {errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        생년월일 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                      {errors.birthDate && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">⚠️ {errors.birthDate}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      비상연락처 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="가족 또는 지인 연락처"
                    />
                    {errors.emergencyContact && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">⚠️ {errors.emergencyContact}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      입사일 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.joinDate}
                      onChange={(e) => handleInputChange('joinDate', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: 직무 정보 */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      직무 정보
                    </h2>
                    <p className="text-white/60 text-sm">소속 팀과 직책을 선택하세요</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">
                      소속 팀 <span className="text-red-400">*</span>
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {SIGNUP_TEAMS.map(team => (
                        <button
                          key={team.id}
                          type="button"
                          onClick={() => handleInputChange('team', team.id)}
                          className={`relative p-4 rounded-xl border-2 transition-all text-left group ${
                            formData.team === team.id
                              ? `border-transparent bg-gradient-to-br ${team.color} shadow-lg`
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-3xl">{team.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-white mb-0.5 flex items-center gap-2">
                                {team.name}
                                <span className="text-xs px-2 py-0.5 rounded-full bg-black/30">
                                  {team.count}명
                                </span>
                              </div>
                              <div className="text-xs text-white/60">{team.desc}</div>
                            </div>
                            {formData.team === team.id && (
                              <div className="text-white text-xl">✓</div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    {errors.team && <p className="text-xs text-red-400 mt-2 flex items-center gap-1">⚠️ {errors.team}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">
                      직책 <span className="text-red-400">*</span>
                    </label>
                    <div className="grid md:grid-cols-3 gap-3">
                      {POSITIONS.map(pos => (
                        <button
                          key={pos.value}
                          type="button"
                          onClick={() => handleInputChange('position', pos.value)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.position === pos.value
                              ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="text-2xl mb-1">{pos.icon}</div>
                          <div className="font-bold text-sm text-white">{pos.label}</div>
                          <div className="text-xs text-white/40">Level {pos.level}</div>
                        </button>
                      ))}
                    </div>
                    {errors.position && <p className="text-xs text-red-400 mt-2 flex items-center gap-1">⚠️ {errors.position}</p>}
                  </div>
                </div>
              )}

              {/* STEP 4: 최종 확인 */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="mb-6 text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      거의 다 완료되었습니다!
                    </h2>
                    <p className="text-white/60 text-sm">입력하신 정보를 확인해주세요</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-white/40 mb-1">이름</div>
                        <div className="font-medium">{formData.name}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 mb-1">사번</div>
                        <div className="font-medium">{formData.employeeId}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 mb-1">이메일</div>
                        <div className="font-medium">{formData.email}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 mb-1">전화번호</div>
                        <div className="font-medium">{formData.phone}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 mb-1">소속 팀</div>
                        <div className="font-medium">
                          {SIGNUP_TEAMS.find(t => t.id === formData.team)?.icon} {SIGNUP_TEAMS.find(t => t.id === formData.team)?.name}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 mb-1">직책</div>
                        <div className="font-medium">
                          {POSITIONS.find(p => p.value === formData.position)?.icon} {POSITIONS.find(p => p.value === formData.position)?.label}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.twoFactorEnabled}
                        onChange={(e) => handleInputChange('twoFactorEnabled', e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-purple-500 focus:ring-2 focus:ring-purple-500/50"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm group-hover:text-purple-400 transition-colors">
                          🔒 2단계 인증 활성화 (권장)
                        </div>
                        <div className="text-xs text-white/40 mt-1">
                          계정 보안을 위해 2단계 인증을 활성화합니다
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-purple-500 focus:ring-2 focus:ring-purple-500/50"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm group-hover:text-purple-400 transition-colors">
                          이용약관 및 개인정보처리방침에 동의합니다 <span className="text-red-400">*</span>
                        </div>
                        <div className="text-xs text-white/40 mt-1">
                          <Link href="/terms" className="hover:text-purple-400 transition-colors">이용약관</Link> 및{' '}
                          <Link href="/privacy" className="hover:text-purple-400 transition-colors">개인정보처리방침</Link>을 읽고 동의합니다
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* 버튼 영역 */}
              <div className="mt-8 flex gap-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-medium"
                  >
                    ← 이전
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all font-bold shadow-lg shadow-purple-500/50"
                  >
                    다음 →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !agreedToTerms}
                    className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all font-bold shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        처리 중...
                      </>
                    ) : (
                      <>
                        🎉 가입 완료
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* 하단 링크 */}
          <div className="text-center mt-8 text-sm text-white/60">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              로그인하기 →
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
