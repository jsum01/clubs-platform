import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const AuthCallback: React.FC = () => {
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(true);
  const navigate = useNavigate();
  const { provider } = useParams<{ provider: string }>();
  const location = useLocation();
  
  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        // URL에서 파라미터 추출
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        
        // 에러 처리
        const errorParam = urlParams.get('error');
        if (errorParam) {
          throw new Error(`OAuth 로그인 실패: ${errorParam}`);
        }
        
        if (!code || !state || !provider) {
          throw new Error('OAuth 콜백 처리에 필요한 정보가 누락되었습니다.');
        }
        
        // API 호출 시뮬레이션 (실제로는 authService.handleOAuthCallback 같은 것 사용)
        // 실제 구현에서는 여기서 백엔드 API로 code와 state를 전송하여 인증 처리
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 인증 성공 후 응답 가정 (실제로는 서버에서 받은 사용자 정보와 토큰)
        const userData = {
          token: 'oauth_token_' + Date.now(),
          user: {
            id: 100,
            name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
            email: `user@${provider}.com`,
            role: 'USER',
            clubId: 1,
            clubName: 'Photography Club'
          }
        };
        
        // 로컬 스토리지에 토큰과 사용자 정보 저장
        localStorage.setItem('club_platform_token', userData.token);
        // DEBUG
        console.log("LocalStorage(club_platform_token)\n", userData.token)
        localStorage.setItem('club_platform_user', JSON.stringify(userData.user));
        // DEBUG
        console.log("LocalStorage(club_platform_user)\n", userData.token)
        
        // 성공 시 메인 페이지로 리디렉션
        navigate('/', { replace: true });
      } catch (err: any) {
        setError(err.message || 'OAuth 로그인 처리 중 오류가 발생했습니다.');
        setProcessing(false);
      }
    };
    
    processOAuthCallback();
  }, [navigate, provider, location]);
  
  const handleGoToLogin = () => {
    navigate('/login');
  };
  
  return (
    <Container>
      <Card>
        {error ? (
          <>
            <CardTitle>로그인 오류</CardTitle>
            <ErrorMessage>{error}</ErrorMessage>
            <Button onClick={handleGoToLogin}>
              로그인 페이지로 돌아가기
            </Button>
          </>
        ) : (
          <>
            <CardTitle>요청을 처리하고 있습니다!</CardTitle>
            <LoadingSpinner />
            <LoadingText>잠시만 기다려주세요...</LoadingText>
          </>
        )}
      </Card>
    </Container>
  );
};

export default AuthCallback;

// 스타일 컴포넌트 정의 (파일 하단에 배치)
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7fafc;
  padding: 1rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CardTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #2d3748;
`;

const ErrorMessage = styled.div`
  background-color: #fed7d7;
  color: #c53030;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3182ce;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #4299e1;
  animation: spin 1s ease-in-out infinite;
  margin: 1rem 0;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: #4a5568;
  margin-bottom: 0;
`;