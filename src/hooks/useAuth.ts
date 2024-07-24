
import { useState, useEffect } from 'react';

interface UseAuthResult {
  isAuthenticated: boolean;
  userRole: string | null;
}

const useAuth = (): UseAuthResult => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập và vai trò từ local storage hoặc API
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  return { isAuthenticated, userRole };
};

export default useAuth;
