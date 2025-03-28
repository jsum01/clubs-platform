import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/auth';

// 로컬 스토리지 키
const TOKEN_KEY = 'club_platform_token';
const USER_KEY = 'club_platform_user';

// 사용자 타입 정의
export interface UserData {
  id?: number;
  name: string;
  email: string;
  phoneNumber?: string;
  role?: string;
  clubId?: number;
  clubName?: string;
}

// 응답 타입 정의
interface AuthResponse {
  token: string;
  refreshToken: string;
  user: UserData;
}

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // 토큰 만료 에러(401) && 재시도하지 않은 요청
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // 리프레시 토큰으로 새 토큰 받기
        const refreshToken = localStorage.getItem('club_platform_refresh_token');
        const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
        
        // 새 토큰 저장
        localStorage.setItem(TOKEN_KEY, response.data.token);
        localStorage.setItem('club_platform_refresh_token', response.data.refreshToken);
        
        // 헤더 업데이트
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        // 원래 요청 재시도
        return api(originalRequest);
      } catch (err) {
        // 리프레시 토큰도 만료된 경우 로그아웃
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem('club_platform_refresh_token');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    
    return Promise.reject(error);
  }
);

const authService = {
  // 로그인
  async login(email: string, password: string): Promise<UserData> {
    try {
      const response = await api.post<AuthResponse>('/login', { email, password });
      
      // 토큰 및 사용자 정보 저장
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem('club_platform_refresh_token', response.data.refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      
      return response.data.user;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || '로그인에 실패했습니다.');
      }
      throw new Error('서버에 연결할 수 없습니다.');
    }
  },
  
  // 회원가입
  async register(userData: UserData): Promise<UserData> {
    try {
      const response = await api.post<AuthResponse>('/register', userData);
      return response.data.user;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || '회원가입에 실패했습니다.');
      }
      throw new Error('서버에 연결할 수 없습니다.');
    }
  },
  
  // OAuth 로그인
  async oauthLogin(provider: string): Promise<void> {
    // OAuth는 리다이렉트 방식으로 처리
    window.location.href = `${API_URL}/oauth2/authorize/${provider}`;
  },
  
  // OAuth 콜백 처리
  async handleOAuthCallback(code: string, state: string, provider: string): Promise<UserData> {
    try {
      const response = await api.post<AuthResponse>(`/oauth2/callback/${provider}`, { code, state });
      
      // 토큰 및 사용자 정보 저장
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem('club_platform_refresh_token', response.data.refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      
      return response.data.user;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'OAuth 로그인에 실패했습니다.');
      }
      throw new Error('서버에 연결할 수 없습니다.');
    }
  },
  
  // 로그아웃
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('club_platform_refresh_token');
    
    // 로그인 페이지로 리다이렉트
    window.location.href = '/login';
  },
  
  // 현재 로그인한 사용자 가져오기
  getCurrentUser(): UserData | null {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },
  
  // 로그인 상태 확인
  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  
  // 사용자 정보 업데이트
  async updateUserInfo(userData: Partial<UserData>): Promise<UserData> {
    try {
      const response = await api.put<{ user: UserData }>('/user/update', userData);
      
      // 로컬 스토리지에 저장된 사용자 정보 업데이트
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...response.data.user };
        localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      }
      
      return response.data.user;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || '사용자 정보 업데이트에 실패했습니다.');
      }
      throw new Error('서버에 연결할 수 없습니다.');
    }
  },
  
  // 비밀번호 변경
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await api.post('/user/change-password', { currentPassword, newPassword });
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || '비밀번호 변경에 실패했습니다.');
      }
      throw new Error('서버에 연결할 수 없습니다.');
    }
  },
  
  // 비밀번호 재설정 요청
  async requestPasswordReset(email: string): Promise<void> {
    try {
      await api.post('/forgot-password', { email });
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || '비밀번호 재설정 요청에 실패했습니다.');
      }
      throw new Error('서버에 연결할 수 없습니다.');
    }
  },
  
  // 비밀번호 재설정
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await api.post('/reset-password', { token, newPassword });
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || '비밀번호 재설정에 실패했습니다.');
      }
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }
};

export default authService;