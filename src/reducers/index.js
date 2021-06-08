import { LEVEL, TOPICS } from "../constants";
import {
  UPDATE_DATA,
  SET_MODE,
  UPDATE_MOVE,
  UPDATE_REMOVED,
  UPDATE_START,
  UPDATE_TIME,
  UPDATE_TOPIC,
} from "./actions";
import { generateGameData } from "../utils/data";

const initData = generateGameData({ topic: TOPICS.RICK, mode: LEVEL.EASY });

export const initialState = {
  move: 0,
  removed: {},
  time: 0,
  start: false,
  topic: TOPICS.RICK,
  mode: LEVEL.EASY,
  isLoading: false,
  complete: false,
  history: [],
  ...initData,
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
    case UPDATE_DATA:
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
    case UPDATE_REMOVED:
      return {
        ...state,
        removed: action.payload,
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
