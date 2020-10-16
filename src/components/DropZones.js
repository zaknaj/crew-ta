import React from "react";
import styled from "styled-components";

export const DropZones = ({ isActive, canDrop }) => {
  return (
    <Styled>
      {isActive ? (
        <div className="drop-zone  drop-zone-hovered" />
      ) : (
        canDrop && <div className="drop-zone" />
      )}
    </Styled>
  );
};

// Styles ----

const Styled = styled.div`
  .drop-zone {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.15);
    z-index: 8;
    border-radius: 15px;
    border: 1px dashed rgba(255, 255, 255, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    transition: 0.2s all;
    &.drop-zone-hovered {
      border: 1px dashed rgba(255, 255, 255, 0.5);
      background: rgba(0, 0, 0, 0.3);
    }
  }
`;
