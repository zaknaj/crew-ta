import React, { useContext } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Search } from "./Search";
import { Pill } from "./Pill";
import { store } from "../store.js";

const Styled = styled.div`
  height: 70px;
  border-bottom: 1px solid hsl(222, 15%, 20%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;

  .search-container {
    display: flex;
    align-items: center;
    .clear-button {
      margin-right: 32px;
      font-size: 12px;
      cursor: pointer;
      color: hsl(222, 15%, 80%);
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const Navbar = () => {
  const globalState = useContext(store);

  return (
    <Styled>
      <Logo />
      <div className="search-container">
        {globalState.state.filters.map((filter, i) => (
          <Pill
            key={`filter_${filter}_${i}`}
            withDelete
            title={filter}
            onClick={() =>
              globalState.dispatch({ type: "remove-filter", value: filter })
            }
          />
        ))}
        {globalState.state.filters.length > 0 && (
          <div
            className="clear-button"
            onClick={() => globalState.dispatch({ type: "clear-filters" })}
          >
            Clear filters
          </div>
        )}
        <Search />
      </div>
    </Styled>
  );
};
