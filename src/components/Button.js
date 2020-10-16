import React from "react";
import styled, { css } from "styled-components";

const Styled = styled.button`
  transition: 0.25s all;
  cursor: pointer;
  display: flex;
  align-items: center;

  .btn-arrow {
    margin-left: 6px;
    display: inline-block;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform;
  }
  &:hover .btn-arrow {
    transform: translateX(3px);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  ${(props) => props.variant === "load-more" && loadMoreVariant}
  ${(props) => props.variant === "move-to" && moveToVariant}
`;

const moveToVariant = css`
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 4px;
  background: hsl(230, 52%, 57%);
  color: hsl(222, 15%, 10%);
  font-weight: 600;

  &:hover {
    background: hsl(230, 52%, 70%);
  }

  &:active {
    background: hsl(230, 52%, 57%);
  }
`;

const loadMoreVariant = css`
  font-size: 14px;
  height: 40px;
  border-radius: 15px;
  border: 1px solid hsl(222, 15%, 25%);
  padding: 0 24px;
  background: transparent;
  color: hsl(222, 15%, 60%);

  &:hover {
    border: 1px solid hsl(222, 15%, 40%);
  }

  &:active {
    border: 1px solid hsl(222, 15%, 25%);
  }
`;

export const Button = ({
  variant = "load-more",
  onClick,
  children,
  disabled,
}) => {
  return (
    <Styled disabled={disabled} variant={variant} onClick={onClick}>
      {children}
    </Styled>
  );
};
