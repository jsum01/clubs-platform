import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import NotFound from './pages/common/NotFound';
import AdminPanel from './pages/admin/AdminPanel';
import UserDashboard from './pages/user/UserDashBoard';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import AuthCallback from './pages/user/AuthCallback';

// 인증 경로 보호를 위한 래퍼 컴포넌트
interface ProtectedRouteProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  adminOnly?: boolean;
  isAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  isLoggedIn, 
  adminOnly = false, 
  isAdmin = false 
}) => {
  const location = useLocation();

  if (!isLoggedIn) {
    // 로그인하지 않은 경우 로그인 페이지로 리디렉션
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    // 관리자 전용 페이지에 일반 사용자가 접근한 경우
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// 메인 앱 컴포넌트
function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const token = localStorage.getItem('club_platform_token');
    if (token) {
      setIsLoggedIn(true);
      
      // 관리자 여부 확인 (실제로는 토큰에서 역할 정보를 추출해야 함)
      const userJson = localStorage.getItem('club_platform_user');
      if (userJson) {
        const user = JSON.parse(userJson);
        setIsAdmin(user.role === 'ADMIN');
      }
    }
    
    console.log(`Login Status: ${isLoggedIn}`);
  }, []);

  // 로그인 처리
  const handleLogin = (userData: any) => {
    // 사용자 정보와 토큰을 로컬 스토리지에 저장
    localStorage.setItem('club_platform_token', userData.token);
    localStorage.setItem('club_platform_user', JSON.stringify(userData.user));
    
    setIsLoggedIn(true);
    setIsAdmin(userData.user.role === 'ADMIN');
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('club_platform_token');
    localStorage.removeItem('club_platform_user');
    
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  // 메인 대시보드 컴포넌트
  const Dashboard = () => {
    const navigate = useNavigate();
    
    // 관리자/일반 사용자 뷰 전환
    const toggleAdminView = (adminView: boolean) => {
      setIsAdmin(adminView);
      navigate(adminView ? '/admin' : '/');
    };
    
    return (
      <>
        <AppHeader>
          <AppTitle>Club Platform</AppTitle>
          <Navigation>
            <NavButton 
              active={!isAdmin}
              onClick={() => toggleAdminView(false)}
            >
              사용자 뷰
            </NavButton>
            <NavButton 
              active={isAdmin}
              onClick={() => toggleAdminView(true)}
            >
              관리자 뷰
            </NavButton>
            <LogoutButton onClick={handleLogout}>
              로그아웃
            </LogoutButton>
          </Navigation>
        </AppHeader>
        <Main>
          {isAdmin ? <AdminPanel /> : <UserDashboard />}
        </Main>
      </>
    );
  };

  return (
    <Router>
      <AppContainer>
        <Routes>
          {/* 인증되지 않은 사용자용 라우트 */}
          <Route path="/login" element={
            isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            isLoggedIn ? <Navigate to="/" replace /> : <Register />
          } />
          <Route path="/oauth/callback/:provider" element={<AuthCallback />} />
          
          {/* 인증된 사용자용 라우트 */}
          <Route path="/" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} adminOnly={true} isAdmin={isAdmin}>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* 찾을 수 없는 페이지 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}


// 스타일드 컴포넌트
const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const AppTitle = styled.h1`
  margin: 0 0 1rem 0;
`;

const Navigation = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? '#61dafb' : '#4a5568')};
  color: ${(props) => (props.active ? '#282c34' : 'white')};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? '#61dafb' : '#2d3748')};
  }
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #f56565;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 1rem;

  &:hover {
    background-color: #e53e3e;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f7fafc;
`;


export default App;