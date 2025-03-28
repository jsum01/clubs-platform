import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Register: React.FC = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOAuthSignup = async (provider: string) => {
    try {
      setLoading(true);
      
      // 구글 회원가입일 경우
      if (provider === 'google') {
        // 실제로는 Google OAuth 클라이언트 ID가 필요합니다
        const clientId = 'your-google-client-id';
        const redirectUri = `${window.location.origin}/oauth/callback/google`; // 콜백 URL 설정
        // 요청할 권한 범위
        const scope = 'email profile';
        // CSRF 방지용 상태 토큰
        const state = Math.random().toString(36).substring(2);
        localStorage.setItem('oauth_state', state);
        // 회원가입임을 나타내는 파라미터 추가
        localStorage.setItem('oauth_signup', 'true');
        // 구글 OAuth 로그인 페이지로 리다이렉트
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}&prompt=select_account`;
        window.location.href = googleAuthUrl;
      } 
      // 카카오 회원가입일 경우
      else if (provider === 'kakao') {
        // 카카오 로그인은 REST API 키 필요
        const restApiKey = 'your-kakao-rest-api-key';
        // 콜백 URL 설정
        const redirectUri = `${window.location.origin}/oauth/callback/kakao`;
        // CSRF 방지용 상태 토큰
        const state = Math.random().toString(36).substring(2);
        localStorage.setItem('oauth_state', state);
        // 회원가입임을 나타내는 파라미터 추가
        localStorage.setItem('oauth_signup', 'true');
        // 카카오 OAuth 로그인 페이지로 리다이렉트
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&state=${state}`;
        window.location.href = kakaoAuthUrl;
      }
    } catch (err: any) {
      setError(err.message || `${provider} 회원가입 중 오류가 발생했습니다.`);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <CardTitle>회원가입</CardTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <OAuthButtons>
          <GoogleButton 
            type="button" 
            onClick={() => handleOAuthSignup('google')}
            disabled={loading}
          >
            Google 계정으로 가입
          </GoogleButton>
          
          <KakaoButton 
            type="button" 
            onClick={() => handleOAuthSignup('kakao')}
            disabled={loading}
          >
            카카오 계정으로 가입
          </KakaoButton>
        </OAuthButtons>
        
        <Footer>
          <p>이미 계정이 있으신가요? <a href="/login">로그인</a></p>
        </Footer>
      </Card>
    </Container>
  );
};

export default Register;

// 스타일드 컴포넌트 (파일 하단에 배치)
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
`;

const CardTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #2d3748;
`;

const OAuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OAuthButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
  padding-left: 2.5rem;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const GoogleButton = styled(OAuthButton)`
  background-color: white;
  color: #4a5568;
  border: 1px solid #e2e8f0;

  &:hover:not(:disabled) {
    background-color: #f7fafc;
  }

  &::before {
    content: '';
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%23FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="%23FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="%234CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="%231976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const KakaoButton = styled(OAuthButton)`
  background-color: #FEE500;
  color: #000000;
  border: none;

  &:hover:not(:disabled) {
    background-color: #F7D700;
  }

  &::before {
    content: '';
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23000000" d="M12,3C7.03,3,3,6.14,3,10c0,2.38,1.56,4.47,3.93,5.67c0.22,0.1,0.35,0.33,0.31,0.57l-0.32,1.87c-0.1,0.58,0.51,1.04,1.03,0.77L11.03,17c0.23-0.12,0.51-0.14,0.75-0.04C15.15,16.9,21,14.58,21,10C21,6.14,16.97,3,12,3z"/></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;

  p {
    margin: 0;
  }

  a {
    color: #4299e1;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fed7d7;
  color: #c53030;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;