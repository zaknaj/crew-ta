import React from "react";
import styled from "styled-components";
import { columns } from "../constants.js";

export const MoveMenu = ({ onClick }) => {
  return (
    <Styled>
      {columns.map((col) => (
        <div key={col} className="move-menu-item" onClick={() => onClick(col)}>
          {col}
        </div>
      ))}
    </Styled>
  );
};

// Styles ----

const Styled = styled.div`
  width: 200px;
  box-shadow: 0px 1px 30px #000000;
  position: absolute;
  z-index: 8;
  border-radius: 10px;
  background: hsl(230, 52%, 70%);
  right: 25px;
  top: 60px;
  overflow: hidden;
  .move-menu-item {
    height: 55px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid hsl(230, 43%, 62%);
    color: hsl(222, 15%, 14%);
    font-size: 14px;
    font-weight: 600;
    background: hsl(230, 52%, 70%);
    transition: 0.2s all;
    cursor: pointer;

    &:hover {
      background: hsl(230, 52%, 75%);
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;
