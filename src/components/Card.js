import React, { useContext } from "react";
import { store } from "../store.js";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils";
import { Pill } from "./Pill";
import { ReactComponent as Check } from "../assets/check.svg";
import { ReactComponent as Github } from "../assets/github.svg";
import { ReactComponent as Linkedin } from "../assets/linkedin.svg";
import { ReactComponent as Twitter } from "../assets/twitter.svg";

const Styled = styled.div`
  background: hsl(222, 15%, 16%);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 16px;
  padding-bottom: 8px;
  margin-bottom: 20px;
  transition: 0.25s all;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.35);
    background: hsl(222, 15%, 17%);
  }

  display: flex;

  .tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    a {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      margin-right: 8px;
      color: hsl(222, 15%, 50%);
      transition: 0.15s all;
      &:hover {
        color: hsl(222, 15%, 80%);
      }
    }
  }

  .picture-container {
    width: 42px;
    flex-shrink: 0;
    margin-right: 16px;
    position: relative;
    .picture-selected-overlay {
      border-radius: 42px;
      height: 42px;
      width: 42px;
      background: green;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.5;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    .picture {
      border-radius: 42px;
      height: 42px;
      width: 42px;
      background: hsl(222, 15%, 50%);
    }
  }

  .text-container {
    flex: 1;
    font-size: 14px;
    .name {
      font-weight: 600;
      margin-bottom: 4px;
    }
    .title {
      margin-bottom: 12px;
      color: hsl(222, 15%, 50%);
    }
  }
`;

export const Card = ({ selected = false, data, onSelect }) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: ItemTypes.CARD, id: data.id, stage: data.stage },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dispatch({
          type: "move-candidates",
          value: [item.id],
          to: dropResult.title,
        });
        dispatch({
          type: "record-last-action",
          ids: [item.id],
          to: dropResult.title,
          from: item.stage,
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Styled ref={dragRef} style={{ opacity: isDragging ? 0.2 : 1 }}>
      <div className="picture-container">
        {selected && (
          <div className="picture-selected-overlay">
            <Check />
          </div>
        )}
        <div className="picture" onClick={() => onSelect(data.id)} />
      </div>
      <div className="text-container">
        <div className="name">{data.firstName + " " + data.lastName}</div>
        <div className="title">{data.job}</div>
        <div className="tags">
          {data.tags.map((tag, i) => (
            <Pill
              key={`tag_${tag}_${i}`}
              title={tag}
              onClick={() => {
                dispatch({ type: "set-filter", value: tag });
              }}
            />
          ))}
          {data.github && (
            <a className="social-icon" target="__blank" href={data.github}>
              <Github />
            </a>
          )}
          {data.linkedin && (
            <a className="social-icon" target="__blank" href={data.linkedin}>
              <Linkedin />
            </a>
          )}
          {data.twitter && (
            <a className="social-icon" target="__blank" href={data.twitter}>
              <Twitter />
            </a>
          )}
        </div>
      </div>
    </Styled>
  );
};
