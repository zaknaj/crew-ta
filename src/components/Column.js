import React, { useState, useContext } from "react";
import { store } from "../store.js";
import styled from "styled-components";
import { Card } from "./Card";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils";
import { Button } from "./Button";
import { columns } from "../constants.js";

const Styled = styled.div`
  width: 400px;
  height: 100%;
  margin-right: 35px;
  flex-shrink: 0;
  border-radius: 15px;
  background: hsl(222, 15%, 12%);
  padding: 21px 25px;
  padding-bottom: 0;
  position: relative;

  .header {
    padding-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 43px;
    .title {
      font-weight: 600;
      font-size: 18px;
    }
  }

  .cards {
    height: calc(100% - 60px);
    overflow-y: auto;
    overflow-x: visible;
    margin: 0 -25px;
    padding: 0 25px;
    padding-top: 16px;
  }

  .bottom-shadow {
    height: 30px;
    position: absolute;
    pointer-events: none;
    background: blue;
    background: linear-gradient(to top, hsl(222, 15%, 12%) 20%, transparent);
    z-index: 7;
    width: 100%;
    bottom: 15px;
    left: 0;
  }

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

  .move-menu {
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
  }
`;

export const Column = ({ title, cards }) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [showMenu, setShowMenu] = useState(false);
  const [selected, setSelected] = useState([]);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ name: "Column", title }),
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  const isActive = canDrop && isOver;

  const handleSelect = (id) => {
    selected.includes(id)
      ? setSelected(selected.filter((el) => el !== id))
      : setSelected([...selected, id]);
  };

  const moveTo = (ids, to) => {
    dispatch({ type: "move-candidates", value: ids, to });
    dispatch({
      type: "record-last-action",
      ids: ids,
      to,
      from: title,
    });
    setSelected([]);
  };

  return (
    <Styled ref={drop}>
      {isActive ? (
        <div className="drop-zone  drop-zone-hovered" />
      ) : (
        canDrop && <div className="drop-zone" />
      )}

      {showMenu && (
        <div className="move-menu">
          {columns.map((col) => (
            <div
              key={col}
              className="move-menu-item"
              onClick={() => {
                moveTo(selected, col);
                setShowMenu(false);
              }}
            >
              {col}
            </div>
          ))}
        </div>
      )}

      <div className="bottom-shadow" />
      <div className="header">
        {selected.length > 0 ? (
          <>
            <div className="title">{selected.length} Selected</div>
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
      </div>
      <div className="cards">
        {cards.map((c) => (
          <Card
            selected={selected.includes(c.id)}
            onSelect={handleSelect}
            key={c.id}
            data={c}
          />
        ))}
      </div>
    </Styled>
  );
};
