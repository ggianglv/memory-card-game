import React from "react";
import { LEVEL } from "../constants";
import { AppContext } from "../context";
import { formatTime } from "../utils/data";

const History = () => {
  const { state } = React.useContext(AppContext);
  const { history = [] } = state;

  const modeMap = {
    [LEVEL.EASY]: "Easy",
    [LEVEL.MEDIUM]: "Med",
    [LEVEL.HARD]: "Hard",
  };
  return (
    <div className="play-history">
      {history.map((item, index) => (
        <div key={index} className="modal-item history">
          <div className="history-item">
            <div className="label">Move:</div>
            <div className="value">{item.move}</div>
          </div>

          <div className="history-item">
            <div className="label">Time:</div>
            <div className="value">{formatTime(item.time)}</div>
          </div>

          <div className="history-item">
            <div className="label">Mode:</div>
            <div className="value">{modeMap[item.mode]}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
