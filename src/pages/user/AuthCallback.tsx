import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAxios } from "../hooks/useAxios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api/auth";

interface AuthCallbackProps {
  onLogin: (userData: any) => void;
}

const AuthCallback: React.FC<AuthCallbackProps> = ({ onLogin }) => {
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(true);
  const navigate = useNavigate();
  const { provider } = useParams<{ provider: string }>();
  const location = useLocation();
  const { post } = useAxios(); // usePost에서 post로 변경

  useEffect(() => {
    processOAuthCallback();
  }, []);

  const processOAuthCallback = async () => {
    try {
      console.log("OAuth 콜백 처리 시작:", provider);
      console.log("현재 URL:", window.location.href);

      // Google과 Kakao 모두 처리하기 위한 변수 초기화
      let code = "";
      let state = "";
      let accessToken = "";

      // 쿼리 파라미터에서 코드와 상태 추출 (카카오용)
      if (location.search) {
        const searchParams = new URLSearchParams(location.search);
        code = searchParams.get("code") || "";
        state = searchParams.get("state") || "";
        console.log(`Query 파라미터: code=${code}, state=${state}`);
      }

      // 해시 파라미터에서 액세스 토큰 추출 (구글용)
      if (location.hash) {
        const hashParams = new URLSearchParams(location.hash.substring(1));
        console.log(`hashParams: ${hashParams}`);
        accessToken = hashParams.get("access_token") || "";
        if (!state) {
          state = hashParams.get("state") || "";
        }
        console.log(
          `Hash 파라미터:\n- access_token=${accessToken}\n- state=${state}`
        );
      }

      // 에러 파라미터 확인
      const errorParam =
        new URLSearchParams(location.search).get("error") ||
        new URLSearchParams(location.hash.substring(1)).get("error");

      if (errorParam) {
        throw new Error(`OAuth 로그인 실패: ${errorParam}`);
      }

      // 요청 데이터 구성 및 API 호출
      if (provider === "google") {
        if (accessToken) {
          console.log(
            "Google OAuth (Implicit Flow): access_token으로 요청합니다."
          );
          const pureAccessToken = accessToken.split("=");
          console.log("추출된 엑세스 토큰: ", pureAccessToken);
          const payload = { access_token: pureAccessToken[0] };
          console.log(`Payload: ${JSON.stringify(payload)}`);
          const response = await post(
            `/api/auth/oauth2/callback/google`,
            payload
          );

          console.log("백엔드 응답:", response);

          if ("data" in response && response.data) {
            onLogin(response.data);
            console.log("응답받은 정보: " + JSON.stringify(response.data));
            navigate("/", { replace: true }); // 브라우저 히스토리 스택에서 AuthCallback을 제거. -> 로그인 후 Callback페이지로 돌아갈 수 없도록 함
          }
        } else {
          throw new Error("Google OAuth 인증에 필요한 액세스 토큰이 없습니다.");
        }
      } else if (provider === "kakao") {
        if (code) {
          console.log("Kakao OAuth: code로 요청합니다.");
          const response = await post(`/api/auth/oauth2/callback/kakao`, {
            code,
            state,
          });

          console.log("백엔드 응답:", response);

          // // 토큰과 사용자 정보 저장
          // localStorage.setItem("club_platform_token", response.data.token);
          // localStorage.setItem(
          //   "club_platform_refresh_token",
          //   response.data.refreshToken
          // );
          // localStorage.setItem(
          //   "club_platform_user",
          //   JSON.stringify(response.data.user)
          // );

          // 성공 시 메인 페이지로 리디렉션
          navigate("/", { replace: true });
        } else {
          throw new Error("Kakao OAuth 인증에 필요한 코드가 없습니다.");
        }
      }
    } catch (err: any) {
      console.error("OAuth 인증 처리 중 오류:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "OAuth 로그인 처리 중 오류가 발생했습니다."
      );
      setProcessing(false);
    }
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <Container>
      <Card>
        {error ? (
          <>
            <CardTitle>로그인 오류</CardTitle>
            <ErrorMessage>{error}</ErrorMessage>
            <Button onClick={handleGoToLogin}>로그인 페이지로 돌아가기</Button>
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

// 스타일 컴포넌트 정의는 그대로 유지
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
