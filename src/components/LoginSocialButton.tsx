import React from "react";
import { Button } from "antd";

import FacebookIcon from "../assets/facebook-icon.svg";
import GoogleIcon from "../assets/google-icon.svg";
import styled from "styled-components";
interface IProps {
  type: "Facebook" | "Google" | "Apple";
  label: string;
  onClick?: () => void;
}
const ButtonContainer = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  width: 100%;
  height: 50px;
  border: 1px solid #dadce0 !important;
  border-radius: 60px;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(66, 133, 244, 0.08) !important;
    color: black !important;
  }
`;
const getIcon = (type: IProps["type"]) => {
  switch (type) {
    case "Facebook":
      return FacebookIcon;
    case "Google":
      return GoogleIcon;
    default:
      return "";
  }
};

const LoginSocialButton: React.FC<IProps> = ({ type, onClick, label }) => {
  const login = onClick;
  return (
    <ButtonContainer onClick={login}>
      <img src={getIcon(type)} alt="Facebook" style={{ width: 30 }} />
      <span>{label}</span>
    </ButtonContainer>
  );
};

export default LoginSocialButton;
