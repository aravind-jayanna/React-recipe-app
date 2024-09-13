import styled from "styled-components";

export const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1.5s linear infinite;
  margin: 20px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  background: #f9d6d5;
  border: 1px solid #e74c3c;
  padding: 10px;
  border-radius: 5px;
  margin: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
`;

export const NoRecipesMessage = styled.div`
  color: #95a5a6;
  background: #ecf0f1;
  border: 1px solid #bdc3c7;
  padding: 10px;
  border-radius: 5px;
  margin: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
`;

export const WelcomeMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
  border: 2px solid #3498db; /* Border to highlight the message */
  padding: 30px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow for better visibility */
`;

export const ClickableHeader = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

export const Footer = styled.footer`
  background: #2c3e50;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #34495e;
`;

export const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background: #3498db;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #2980b9;
  }
`;
