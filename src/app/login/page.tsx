'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginCredentials {
  email: string;
  password: string;
}

// FIELD NINE 전체 직원 계정 (26명 + 임원 4명 = 30명)
const DEMO_USERS = [
  // 임원진 (4명)
  {
    email: 'ceo@fieldnine.io',
    password: 'field2025',
    name: '공경수',
    role: 'executive',
    department: 'Management',
    avatar: '👔'
  },
  {
    email: 'general@fieldnine.io',
    password: 'field2025',
    name: '김본부',
    role: 'general_manager',
    department: 'Management',
    avatar: '📊'
  },
  {
    email: 'director1@fieldnine.io',
    password: 'field2025',
    name: '이부장',
    role: 'director',
    department: 'Management',
    avatar: '💼'
  },
  {
    email: 'manager1@fieldnine.io',
    password: 'field2025',
    name: '박실장',
    role: 'manager',
    department: 'Management',
    avatar: '📋'
  },

  // FILLUMINATE (8명)
  {
    email: 'field@fieldnine.io',
    password: 'field2025',
    name: '김필드',
    role: 'manager',
    department: 'FILLUMINATE',
    avatar: '👨‍💼'
  },
  {
    email: 'data1@fieldnine.io',
    password: 'field2025',
    name: '이데이터',
    role: 'staff',
    department: 'FILLUMINATE',
    avatar: '📈'
  },
  {
    email: 'data2@fieldnine.io',
    password: 'field2025',
    name: '박분석',
    role: 'staff',
    department: 'FILLUMINATE',
    avatar: '📊'
  },
  {
    email: 'ai1@fieldnine.io',
    password: 'field2025',
    name: '최인공',
    role: 'staff',
    department: 'FILLUMINATE',
    avatar: '🤖'
  },
  {
    email: 'ai2@fieldnine.io',
    password: 'field2025',
    name: '정머신',
    role: 'staff',
    department: 'FILLUMINATE',
    avatar: '🧠'
  },
  {
    email: 'bi1@fieldnine.io',
    password: 'field2025',
    name: '강비아이',
    role: 'staff',
    department: 'FILLUMINATE',
    avatar: '💡'
  },
  {
    email: 'bi2@fieldnine.io',
    password: 'field2025',
    name: '윤인사이트',
    role: 'staff',
    department: 'FILLUMINATE',
    avatar: '🔍'
  },
  {
    email: 'analytics@fieldnine.io',
    password: 'field2025',
    name: '서애널리틱스',
    role: 'staff',
    department: 'FILLUMINATE',
    avatar: '📉'
  },

  // MARD MARD (8명)
  {
    email: 'creative@fieldnine.io',
    password: 'field2025',
    name: '이크리에이티브',
    role: 'team_leader',
    department: 'MARD MARD',
    avatar: '👩‍🎨'
  },
  {
    email: 'design1@fieldnine.io',
    password: 'field2025',
    name: '김디자인',
    role: 'staff',
    department: 'MARD MARD',
    avatar: '🎨'
  },
  {
    email: 'design2@fieldnine.io',
    password: 'field2025',
    name: '박그래픽',
    role: 'staff',
    department: 'MARD MARD',
    avatar: '✏️'
  },
  {
    email: 'brand@fieldnine.io',
    password: 'field2025',
    name: '최브랜드',
    role: 'staff',
    department: 'MARD MARD',
    avatar: '🏷️'
  },
  {
    email: 'content@fieldnine.io',
    password: 'field2025',
    name: '정콘텐츠',
    role: 'staff',
    department: 'MARD MARD',
    avatar: '📝'
  },
  {
    email: 'video@fieldnine.io',
    password: 'field2025',
    name: '강비디오',
    role: 'staff',
    department: 'MARD MARD',
    avatar: '🎬'
  },
  {
    email: 'marketing@fieldnine.io',
    password: 'field2025',
    name: '윤마케팅',
    role: 'staff',
    department: 'MARD MARD',
    avatar: '📢'
  },
  {
    email: 'mard8@fieldnine.io',
    password: 'field2025',
    name: '한마드',
    role: 'staff',
    department: 'MARD MARD',
    avatar: '🎭'
  },

  // DATABASE GUARD CENTER (5명)
  {
    email: 'blockchain@fieldnine.io',
    password: 'field2025',
    name: '서블록',
    role: 'manager',
    department: 'DATABASE GUARD',
    avatar: '🔗'
  },
  {
    email: 'security@fieldnine.io',
    password: 'field2025',
    name: '한보안',
    role: 'staff',
    department: 'DATABASE GUARD',
    avatar: '🛡️'
  },
  {
    email: 'nexus@fieldnine.io',
    password: 'field2025',
    name: '조넥서스',
    role: 'staff',
    department: 'DATABASE GUARD',
    avatar: '⚡'
  },
  {
    email: 'rfid@fieldnine.io',
    password: 'field2025',
    name: '배알에프',
    role: 'staff',
    department: 'DATABASE GUARD',
    avatar: '📡'
  },
  {
    email: 'iot@fieldnine.io',
    password: 'field2025',
    name: '신아이오티',
    role: 'staff',
    department: 'DATABASE GUARD',
    avatar: '📱'
  },

  // Infrastructure (2명)
  {
    email: 'devops@fieldnine.io',
    password: 'field2025',
    name: '최데브옵스',
    role: 'staff',
    department: 'Infrastructure',
    avatar: '👨‍💻'
  },
  {
    email: 'cloud@fieldnine.io',
    password: 'field2025',
    name: '황클라우드',
    role: 'staff',
    department: 'Infrastructure',
    avatar: '☁️'
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const departments = ['all', 'Management', 'FILLUMINATE', 'MARD MARD', 'DATABASE GUARD', 'Infrastructure'];
  
  const filteredUsers = selectedDept === 'all' 
    ? DEMO_USERS.slice(0, 8) // 처음 8명만 표시
    : DEMO_USERS.filter(u => u.department === selectedDept);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 간단한 인증 로직 (실제로는 백엔드 API 호출)
    setTimeout(() => {
      const user = DEMO_USERS.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        // 로컬 스토리지에 사용자 정보 저장
        localStorage.setItem('fieldnine-user', JSON.stringify(user));
        router.push('/workspace');
      } else {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        setLoading(false);
      }
    }, 1000);
  };

  const handleDemoLogin = (email: string, password: string) => {
    setCredentials({ email, password });
    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      form?.requestSubmit();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#02010a] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-6xl w-full relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* 왼쪽: 브랜드 소개 */}
        <div className="space-y-8">
          <Link href="/" className="inline-block">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              FIELD NINE
            </div>
          </Link>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              미래를 설계하는<br />
              혁신 플랫폼
            </h1>
            <p className="text-lg text-white/60">
              데이터 • 크리에이티브 • 블록체인<br />
              모든 업무를 하나의 플랫폼에서
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-xl">
              <div className="text-2xl font-bold text-purple-400">FILLUMINATE</div>
              <div className="text-xs text-white/40 mt-1">Data Intelligence</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-xl">
              <div className="text-2xl font-bold text-fuchsia-400">MARD MARD</div>
              <div className="text-xs text-white/40 mt-1">Creative Studio</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-xl">
              <div className="text-2xl font-bold text-cyan-400">NEXUS</div>
              <div className="text-xs text-white/40 mt-1">Blockchain Guard</div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 로그인 폼 */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-bold mb-6">워크스페이스 로그인</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">이메일</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                placeholder="email@fieldnine.io"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">비밀번호</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-white/40">빠른 로그인 (30명 전체):</div>
              <div className="text-xs text-white/30">비밀번호: field2025</div>
            </div>
            
            {/* 부서 탭 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    selectedDept === dept
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                      : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {dept === 'all' ? '전체' : dept}
                </button>
              ))}
            </div>

            {/* 계정 그리드 */}
            <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
              {filteredUsers.map(user => (
                <button
                  key={user.email}
                  onClick={() => handleDemoLogin(user.email, user.password)}
                  className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-all text-left"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{user.avatar}</span>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <div className="text-xs text-white/40">{user.role} • {user.department}</div>
                </button>
              ))}
            </div>
            
            {selectedDept === 'all' && (
              <div className="mt-3 text-center text-xs text-white/30">
                부서를 선택하면 해당 부서 직원 전체를 볼 수 있습니다
              </div>
            )}
          </div>

          <div className="mt-6 text-center space-y-2">
            <div className="text-sm text-white/40">
              계정이 없으신가요?{' '}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-all">
                회원가입하기
              </Link>
            </div>
            <Link href="/" className="block text-sm text-white/40 hover:text-white transition-all">
              ← 메인 페이지로 돌아가기
            </Link>
          </div>
        </div>
      </div>

      {/* 떠다니는 입자들 */}
      {[...Array(15)].map((_, i) => (
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
