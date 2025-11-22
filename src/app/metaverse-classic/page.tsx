'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClassicMetaverse() {
  const router = useRouter();

  useEffect(() => {
    // NEXUS OS (물류 시스템)로 리다이렉트
    router.push('/nexus');
  }, [router]);

  return (
    <div className="fixed inset-0 bg-[#02010a] flex items-center justify-center">
      <div className="text-center">
        <div className="text-cyan-400 text-2xl font-bold mb-4 animate-pulse">
          NEXUS OS로 이동 중...
        </div>
        <div className="text-gray-400">
          AI 물류 자동화 시스템
        </div>
      </div>
    </div>
  );
}
