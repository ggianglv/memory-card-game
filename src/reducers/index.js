import { LEVEL, TOPICS } from "../constants";
import {
  SET_INIT_DATA,
  SET_MODE,
  UPDATE_MOVE,
  UPDATE_START,
  UPDATE_TIME,
  UPDATE_TOPIC,
} from "./actions";
import { generateGameData } from "../utils/data";

const initData = generateGameData({ topic: TOPICS.RICK, mode: LEVEL.EASY });

export const initialState = {
  move: 0,
  resolved: {},
  time: 0,
  start: false,
  topic: TOPICS.RICK,
  ...initData,
  mode: LEVEL.EASY,
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case SET_MODE:
      const data = generateGameData({
        topic: state.topic,
        mode: action.payload,
      });
      return {
        ...state,
        ...data,
        mode: action.payload,
      };
    case SET_INIT_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_START:
      return {
        ...state,
        start: action.payload,
      };

    case UPDATE_MOVE:
      return {
        ...state,
        move: action.payload,
      };
    case UPDATE_TIME:
      return {
        ...state,
        time: state.time + 1,
      };
    case UPDATE_TOPIC: {
      const data = generateGameData({
        topic: action.payload,
        mode: state.mode,
      });
      return {
        ...state,
        ...data,
        topic: action.payload,
        start: false,
        time: 0,
        move: 0,
      };
    }
    default:
      return state;
  }
};
