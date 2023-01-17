import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext.js'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleOnClick = async () => {
    if (!username.length || !password.length) return;

    const success = await login({ username, password });

    if (success) {
      Swal.fire({
        position: 'top',
        title: '登入成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      return;
    }
    Swal.fire({
      position: 'top',
      title: '登入失敗！',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todo');
    }
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          type="text"
          placeholder="請輸入帳號"
          value={username}
          onChange={(usernameInputValue) => setUsername(usernameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="密碼"
          type="password"
          placeholder="請輸入密碼"
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleOnClick}>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
