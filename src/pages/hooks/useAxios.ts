import { useState } from 'react';
import axios from 'axios';

// 기본 API URL 설정
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // 공통 설정 및 헤더 처리
  const setupConfig = () => {
    const headers = {
      'Content-Type': 'application/json',
      // "Authorization": `Bearer ${token}`,
    };

    return {headers};
  };

  // 에러 처리 함수
  const handleError = (error : any) => {
    console.error('API 요청 오류:', error);
    
    const errorMessage = 
      error.response?.data?.message || 
      error.response?.data || 
      error.message || 
      '요청 처리 중 오류가 발생했습니다.';
    
    // 401 Unauthorized 에러 처리
    if (error.response?.status === 401) {
      // 토큰 만료 등의 처리
      // localStorage.removeItem('club_platform_token');
      console.log("401 Unauthorized (in useApi handleError), 로컬스토리지의 토큰이 삭제되어야 함");
    }
    
    setError(errorMessage);
    setLoading(false);
    return { error: errorMessage };
  };

  // GET 요청 - 이름 변경: useGet -> get
  const get = async (endpoint : string) => {
    setLoading(true);
    setError(null);
    
    try {
      const fullUrl = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
      const response = await axios.get(fullUrl, setupConfig());
      
      setData(response.data);
      setLoading(false);
      return { data: response.data };
    } catch (error) {
      return handleError(error);
    }
  };

  // POST 요청 - 이름 변경: usePost -> post
  const post = async (endpoint : string, body : any) => {
    setLoading(true);
    setError(null);
    
    try {
      const fullUrl = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
      const response = await axios.post(fullUrl, body, setupConfig());
      
      setData(response.data);
      setLoading(false);
      return { data: response.data };
    } catch (error) {
      return handleError(error);
    }
  };

  // PUT 요청 - 이름 변경: usePut -> put
  const put = async (endpoint : string, body : any) => {
    setLoading(true);
    setError(null);
    
    try {
      const fullUrl = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
      const response = await axios.put(fullUrl, body, setupConfig());
      
      setData(response.data);
      setLoading(false);
      return { data: response.data };
    } catch (error) {
      return handleError(error);
    }
  };

  // DELETE 요청 - 이름 변경: useDelete -> del
  const del = async (endpoint : string) => {
    setLoading(true);
    setError(null);
    
    try {
      const fullUrl = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
      const response = await axios.delete(fullUrl, setupConfig());
      
      setData(response.data);
      setLoading(false);
      return { data: response.data };
    } catch (error) {
      return handleError(error);
    }
  };

  return {
    get,       // useGet에서 변경
    post,      // usePost에서 변경
    put,       // usePut에서 변경
    del,       // useDelete에서 변경
    loading,
    error,
    data
  };
};