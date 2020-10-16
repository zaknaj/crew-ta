import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { store } from "../store";
import { getCandidates } from "../api";

export const LoadMore = () => {
  const [loading, setLoading] = useState(false);
  const globalState = useContext(store);

  return (
    <Styled>
      {globalState.state.page === -1 ? (
        <div className="no-data">No more data to load.</div>
      ) : (
        <Button
          variant="load-more"
          disabled={loading}
          onClick={() => {
            setLoading(true);
            getCandidates(globalState.state.page).then((data) => {
              globalState.dispatch({ type: "add", value: data });
              setLoading(false);
            });
          }}
        >
          {!loading ? (
            <>
              Load more <span className="btn-arrow">{"->"}</span>
            </>
          ) : (
            "Loading new candidates..."
          )}
        </Button>
      )}
    </Styled>
  );
};

// Styles ----

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .no-data {
    font-size: 12px;
    color: hsl(222, 15%, 60%);
    line-height: 40px;
  }
`;
