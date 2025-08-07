"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: number;
  email: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');

    if (!isLoggedIn || isLoggedIn !== 'true') {
      router.push('/login');
      return;
    }

    if (userEmail) {
      setUser({ id: 1, email: userEmail });
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <div style={{ fontSize: '20px', fontWeight: '500' }}>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* 스피너 애니메이션을 위한 스타일 */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .card {
          transition: all 0.3s ease;
        }
        .button:hover {
          transform: scale(1.05);
        }
        .button {
          transition: all 0.2s ease;
        }
      `}</style>

      {/* 네비게이션 바 */}
      <nav style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '64px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                D
              </div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                Dashboard
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', color: '#666' }}>환영합니다!</div>
                <div style={{ color: '#333', fontWeight: '600' }}>{user.email}</div>
              </div>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                {user.email.charAt(0).toUpperCase()}
              </div>
              <button
                className="button"
                onClick={handleLogout}
                style={{
                  background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
                  color: 'white',
                  fontWeight: '500',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(255,107,107,0.3)'
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 24px'
      }}>
        {/* 웰컴 섹션 */}
        <div style={{ marginBottom: '32px' }}>
          <div className="card" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '32px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* 배경 장식 */}
            <div style={{
              position: 'absolute',
              top: '-16px',
              right: '-16px',
              width: '96px',
              height: '96px',
              background: 'linear-gradient(135deg, rgba(102,126,234,0.3), rgba(118,75,162,0.3))',
              borderRadius: '50%'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-16px',
              left: '-16px',
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, rgba(255,107,107,0.3), rgba(254,202,87,0.3))',
              borderRadius: '50%'
            }}></div>

            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>
                안녕하세요, {user.email.split('@')[0]}님! 👋
              </h2>
              <p style={{
                fontSize: '20px',
                color: '#666',
                margin: 0
              }}>
                오늘도 멋진 하루 되세요! 대시보드에서 모든 기능을 살펴보세요.
              </p>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {[
            { title: '총 방문수', value: '1,234', icon: '📊', color: '#3b82f6', bgColor: '#dbeafe' },
            { title: '활성 프로젝트', value: '8', icon: '📈', color: '#10b981', bgColor: '#d1fae5' },
            { title: '완료된 작업', value: '42', icon: '✅', color: '#8b5cf6', bgColor: '#ede9fe' },
            { title: '팀 멤버', value: '12', icon: '👥', color: '#f59e0b', bgColor: '#fef3c7' }
          ].map((stat, index) => (
            <div key={index} className="card" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#666',
                    margin: '0 0 4px 0'
                  }}>{stat.title}</p>
                  <p style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: stat.color,
                    margin: 0
                  }}>{stat.value}</p>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: stat.bgColor,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 기능 카드 그리드 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {[
            { title: '프로필 관리', desc: '개인 정보를 확인하고 업데이트하세요', icon: '👤', color: '#3b82f6' },
            { title: '분석 리포트', desc: '상세한 데이터 분석과 인사이트를 확인하세요', icon: '📊', color: '#10b981' },
            { title: '프로젝트 관리', desc: '새로운 프로젝트를 생성하고 관리하세요', icon: '🚀', color: '#8b5cf6' },
            { title: '시스템 설정', desc: '애플리케이션 환경설정을 관리하세요', icon: '⚙️', color: '#f59e0b' },
            { title: '고객 지원', desc: '문의사항과 지원 요청을 처리하세요', icon: '💬', color: '#ec4899' },
            { title: '도움말', desc: '사용법 가이드와 FAQ를 확인하세요', icon: '📚', color: '#6366f1' }
          ].map((feature, index) => (
            <div key={index} className="card" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '32px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: `linear-gradient(45deg, ${feature.color}, ${feature.color}dd)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '24px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>{feature.title}</h3>
              <p style={{
                color: '#666',
                marginBottom: '16px',
                margin: '0 0 16px 0'
              }}>{feature.desc}</p>
              <button className="button" style={{
                backgroundColor: feature.color,
                color: 'white',
                padding: '8px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}>
                {index === 0 ? '설정하기' :
                 index === 1 ? '보기' :
                 index === 2 ? '시작하기' :
                 index === 3 ? '관리하기' :
                 index === 4 ? '문의하기' : '학습하기'}
              </button>
            </div>
          ))}
        </div>

        {/* 하단 네비게이션 */}
        <div style={{
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              <span style={{ fontSize: '20px' }}>🏠</span>
              <span>홈으로</span>
            </Link>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#666',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              <span style={{ fontSize: '20px' }}>🔄</span>
              <span>새로고침</span>
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#666',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              <span style={{ fontSize: '20px' }}>❓</span>
              <span>도움말</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}