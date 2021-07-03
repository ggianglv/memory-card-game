import React, { useState, useContext, useEffect, useRef, lazy } from "react";
import PropTypes from "prop-types";

import "../styles/board.css";
import Card from "./Card";
import { AppContext } from "../context";
import { LEVEL } from "../constants";
import { usePrevious } from "../utils/data";
import { saveGame } from "../services/game";
import {
  UPDATE_DATA,
  UPDATE_MOVE,
  UPDATE_START,
  UPDATE_TIME,
} from "../reducers/actions";

const Board = ({ openModal }) => {
  const [selected, setSelected] = useState({});
  const { state, dispatch } = useContext(AppContext);
  const previousStart = usePrevious(state.start);
  const { start, cards, cardData } = state;
  const timeoutId = useRef(null);
  const intervalId = useRef(null);

  useEffect(() => {
    if (previousStart === false && state.start === true) {
      intervalId.current = setInterval(() => {
        dispatch({
          type: UPDATE_TIME,
        });
      }, 1000);
    }

    if (previousStart === true && state.start === false) {
      clearInterval(intervalId.current);
      setSelected({});
    }
  }, [state.start, previousStart, dispatch]);

  useEffect(async () => {
    if (
      Object.keys(state.removed).length === state.cards.length &&
      state.start
    ) {
      const nextState = {
        start: false,
        complete: true,
        history: [
          {
            time: state.time,
            move: state.move,
            mode: state.mode,
          },
          ...state.history,
        ],
      };
      if (!state.complete) {
        dispatch({
          type: UPDATE_DATA,
          payload: nextState,
        });
        await saveGame({ ...state, ...nextState }, state.id);
      }
      openModal({
        title: "Scores",
        component: lazy(() => import("../components/History")),
      });
    }
  }, [
    dispatch,
    state.complete,
    state.cards.length,
    Object.keys(state.removed).length,
  ]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, []);

  const mapHeight = {
    [LEVEL.EASY]: 400,
    [LEVEL.MEDIUM]: 500,
    [LEVEL.HARD]: 600,
  };
  const styles = {
    maxHeight: mapHeight[state.mode],
    backgroundImage: `url(/images/${state.topic}.png)`,
  };

  const setActive = async (cardIndex) => {
    if (!start) {
      dispatch({ type: UPDATE_START, payload: true });
    }

    if (Object.keys(selected).length === 0) {
      dispatch({
        type: UPDATE_MOVE,
        payload: state.move + 1,
      });
    }

    if (Object.keys(selected).length === 2) {
      return;
    }
    const nextSelected = {
      ...selected,
      [cardIndex]: true,
    };

    setSelected(nextSelected);
    const indexs = Object.keys(nextSelected);
    const isFull = indexs.length === 2;
    const isMatch = cardData[indexs[0]] === cardData[indexs[1]];
    if (isFull && !isMatch) {
      timeoutId.current = setTimeout(() => {
        setSelected({});
      }, 1000);
    }

    if (isFull && isMatch) {
      timeoutId.current = setTimeout(() => {
        setSelected({});
      }, 1000);
      const nextRemoved = {
        ...state.removed,
        [indexs[0]]: true,
        [indexs[1]]: true,
      };
      saveGame(
        {
          ...state,
          removed: nextRemoved,
        },
        state.id
      );
      dispatch({
        type: UPDATE_DATA,
        payload: { removed: nextRemoved, id: localStorage.getItem("userId") },
      });
    }
  };

  return (
    <div style={styles} className="board">
      {cards.map((cardIndex) => (
        <Card
          removed={state.removed[cardIndex]}
          active={selected[cardIndex]}
          image={cardData[cardIndex]}
          selected={selected}
          cardIndex={cardIndex}
          setActive={setActive}
          key={cardIndex}
        />
      ))}
    </div>
  );
};

Board.propTypes = {
  cards: PropTypes.number,
};

export default Board;
