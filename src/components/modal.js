import React from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Modal = ({ isOpen, onClose, ingredients }) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;
