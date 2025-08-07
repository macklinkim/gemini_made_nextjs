"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 기본 검증
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      console.log('로그인 시도:', { email, password });

      // Spring Boot 백엔드로 요청 (기본적으로 localhost:8080)
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email, // 백엔드에서 username 필드를 사용하므로
          password: password,
        }),
      });

      if (!response.ok) {
        // HTTP 오류 상태 코드 처리
        const errorData = await response.json();
        setError(errorData.message || `로그인 실패: ${response.status}`);
        return;
      }

      // 응답 데이터 처리 - JSON 응답
      const data = await response.json();
      console.log('로그인 성공:', data);

      // JWT 토큰 저장
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      // 성공 메시지 표시 후 대시보드로 이동
      alert(data.message);

      // 사용자 정보를 localStorage에 저장
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isLoggedIn', 'true');

      // 대시보드로 이동
      router.push('/dashboard');

    } catch (err) {
      console.error('로그인 오류:', err);
      setError('네트워크 오류가 발생했습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              로그인
            </button>
          </div>

          <div className="text-center">
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-500"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}