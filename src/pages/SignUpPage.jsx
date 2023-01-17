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


const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  const { register, isAuthenticated } = useAuth();

  const handleOnClick = async () => {
    if (!username.length || !password.length || !email.length) return

    const success = await register({username, password, email});

    if (success) {
      Swal.fire({
        position: 'top',
        title: '註冊成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      return;
    }
    Swal.fire({
      position: 'top',
      title: '註冊失敗！',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todo')
    }
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          type="text"
          placeholder="請輸入帳號"
          value={username}
          onChange={(userNameInputValue) => setUsername(userNameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="Email"
          type="email"
          placeholder="請輸入 email"
          value={email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="密碼"
          type="password"
          placeholder="請輸入密碼"
          value={password}
          onChange={(passwordInputValue) =>
            setPassword(passwordInputValue)
          }
        />
      </AuthInputContainer>
      <AuthButton onClick={handleOnClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
