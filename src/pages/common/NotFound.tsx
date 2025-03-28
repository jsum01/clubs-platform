import React from "react";
import styled from "styled-components";

const NotFound: React.FC = () => {
  const handleGoHome = () => {
    // In a real app with routing, we would use history.push('/') or similar
    window.location.href = "/";
  };

  return (
    <NotFoundContainer>
      <NotFoundContent>
        <NotFoundCode>404</NotFoundCode>
        <NotFoundTitle>페이지를 찾을 수 없습니다</NotFoundTitle>
        <NotFoundMessage>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </NotFoundMessage>
        <HomeButton onClick={handleGoHome}>메인 페이지로 돌아가기</HomeButton>
      </NotFoundContent>
    </NotFoundContainer>
  );
};
const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7fafc;
  padding: 1rem;
`;

const NotFoundContent = styled.div`
  max-width: 500px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const NotFoundCode = styled.h1`
  font-size: 6rem;
  margin: 0;
  color: #4299e1;
  line-height: 1;
`;

const NotFoundTitle = styled.h2`
  margin: 1rem 0;
  color: #2d3748;
`;

const NotFoundMessage = styled.p`
  margin-bottom: 2rem;
  color: #718096;
`;

const HomeButton = styled.button`
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
export default NotFound;
