import React, { useState, useContext } from "react";
import { store } from "../store";
import styled from "styled-components";
import { Card } from "./Card";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils";
import { ColumnHeader } from "./ColumnHeader";
import { MoveMenu } from "./MoveMenu";
import { DropZones } from "./DropZones";

export const Column = ({ title, cards }) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [showMenu, setShowMenu] = useState(false);
  const [selected, setSelected] = useState([]);

  // handle drop zones
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

  // move candidates and save this action for undo
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
      <DropZones isActive={isActive} canDrop={canDrop} />

      {showMenu && (
        <MoveMenu
          onClick={(col) => {
            moveTo(selected, col);
            setShowMenu(false);
          }}
        />
      )}

      <div className="bottom-shadow" />
      <ColumnHeader
        selectedLength={selected.length}
        showmenu={showMenu}
        setShowMenu={setShowMenu}
        title={title}
      />
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

// Styles ----

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
`;
