import React, { useState, useContext } from "react";
import styled from "styled-components";
import { store } from "../store";

export const Search = () => {
  const [value, setValue] = useState("");
  const globalState = useContext(store);
  const { dispatch } = globalState;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.length > 0) {
          dispatch({ type: "add-filter", value });
          setValue("");
        }
      }}
    >
      <Styled
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by tag, name or job title"
      />
    </form>
  );
};

// Styles ----

const Styled = styled.input`
  border-radius: 15px;
  padding: 0 24px;
  background: hsl(222, 15%, 20%);
  height: 40px;
  width: 350px;
  font-size: 14px;
  &::placeholder {
    color: hsl(222, 15%, 50%);
    opacity: 1;
    font-size: 14px;
  }
`;
