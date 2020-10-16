import React, { useContext, useEffect } from "react";
import { store } from "../store.js";
import styled from "styled-components";
import { Column } from "./Column";
import { getCandidates } from "../api";
import { columns } from "../constants";
import { filterDataByColumn } from "../utils";

const Styled = styled.div`
  padding: 60px 80px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  height: calc(100vh - 180px);
  display: flex;
  flex-wrap: no-wrap;
  overflow: auto;
  position: relative;
  .spacer {
    min-width: 100px;
  }
  .shadow {
    width: 100px;
    height: 100%;
    position: fixed;
    height: calc(100vh - 190px);
    top: 70px;
    background: red;
    pointer-events: none;
    z-index: 9;
  }

  .shadow-right {
    right: 0;
    background: linear-gradient(to left, #15171c, transparent);
  }

  .shadow-left {
    left: 0;
    background: linear-gradient(to right, #15171c, transparent);
  }
`;

export const MainContainer = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  useEffect(() => {
    getCandidates(0).then((data) => {
      dispatch({ type: "add", value: data });
    });
  }, [dispatch]);

  return (
    <Styled>
      <div className="shadow shadow-left" />
      <div className="shadow shadow-right" />
      {columns.map((col) => (
        <Column
          key={col}
          cards={filterDataByColumn(
            globalState.state.data,
            col,
            globalState.state.filters
          )}
          title={col}
        />
      ))}
      <div className="spacer" />
    </Styled>
  );
};