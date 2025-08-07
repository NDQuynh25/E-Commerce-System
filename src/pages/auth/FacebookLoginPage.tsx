import React from "react";
import { Button } from "antd";

import FacebookIcon from "../../assets/facebook-icon.svg";

import styled from "styled-components";
import { useFacebookLoginHandler } from "../../hooks/useFacebookLoginHandler";

const ButtonContainer = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white !important;
  color: black;
  width: 100%;
  height: 40px;
  border: 1px solid #dadce0 !important;
  border-radius: 50px;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(66, 133, 244, 0.08) !important;
    color: black !important;
  }
`;

const LoginSocialButton: React.FC = () => {
  const login = useFacebookLoginHandler();
  return (
    <ButtonContainer onClick={login}>
      <img src={FacebookIcon} alt="Facebook" style={{ width: 28.5 }} />
      <span
        style={{
          fontSize: 14,
          fontWeight: 400,
        }}
      >
        Đăng nhập bằng Facebook
      </span>
    </ButtonContainer>
  );
};

export default LoginSocialButton;
