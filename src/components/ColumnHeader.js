import React from "react";
import { Button } from "./Button";
import styled from "styled-components";

export const ColumnHeader = ({
  selectedLength,
  showMenu,
  setShowMenu,
  title,
}) => {
  return (
    <Styled>
      {selectedLength > 0 ? (
        <>
          <div className="title">{selectedLength} Selected</div>
          <Button
            variant="move-to"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            {showMenu ? (
              "Close"
            ) : (
              <>
                Move to <span className="btn-arrow">{"->"}</span>
              </>
            )}
          </Button>
        </>
      ) : (
        <div className="title">{title}</div>
      )}
    </Styled>
  );
};

// Styles ----

const Styled = styled.div`
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 43px;
  .title {
    font-weight: 600;
    font-size: 18px;
  }
`;
