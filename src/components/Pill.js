import React from "react";
import styled, { css } from "styled-components";

import { ReactComponent as Delete } from "../assets/x.svg";

const Styled = styled.div`
  padding: 4px 6px;
  font-size: 10px;
  border-radius: 4px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid hsl(222, 15%, 30%);
  color: hsl(222, 15%, 65%);
  margin-right: 8px;
  margin-bottom: 8px;

  cursor: pointer;
  transition: 0.15s all;
  display: inline-flex;
  align-items: center;
  position: relative;
  font-weight: 600;

  &:hover {
    border: 1px solid hsl(222, 15%, 50%);
  }

  &:active {
    border: 1px solid hsl(222, 15%, 60%);
  }

  .delete-icon {
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border-left: 1px solid hsl(222, 15%, 45%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${(props) =>
    props.withDelete &&
    css`
      border: 1px solid hsl(222, 15%, 45%);
      color: hsl(222, 15%, 80%);
      padding-right: 26px;
      margin-bottom: 0px;
      margin-right: 16px;

      &:hover {
        border: 1px solid hsl(222, 15%, 65%);
      }
    `}
`;

export const Pill = ({ onClick, title, withDelete = false }) => {
  return (
    <Styled withDelete={withDelete} onClick={onClick}>
      {title}
      {withDelete && (
        <div className="delete-icon">
          <Delete />
        </div>
      )}
    </Styled>
  );
};
