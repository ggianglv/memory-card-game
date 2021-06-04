import React, { lazy, useContext } from "react";
import "../styles/menu.css";
import { AppContext } from "../context";
import { formatTime } from "../utils/data";

const Menu = ({ openModal }) => {
  const { state } = useContext(AppContext);

  const openHistoryModal = () => {
    openModal({
      title: "History",
      component: lazy(() => import("../components/History")),
    });
  };

  const openNewGameModal = () => {
    openModal({
      title: "New Game",
      component: lazy(() => import("../components/NewGame")),
    });
  };

  const openTopicModal = () => {
    openModal({
      title: "Choose topic",
      component: lazy(() => import("../components/Topic")),
    });
  };

  return (
    <div className="menu">
      <div className="item">
        <div className="item-wrap">
          <div className="label">Move: </div>
          <div className="value">{state.move}</div>
        </div>
      </div>

      <div className="item">
        <div className="item-wrap">
          <div className="label">Time: </div>
          <div className="value">{formatTime(state.time)}</div>
        </div>
      </div>

      <div className="item">
        <button onClick={openTopicModal} className="custom-button">
          Topic
        </button>
      </div>

      <div className="item">
        <button onClick={openHistoryModal} className="custom-button">
          History
        </button>
      </div>

      <div className="item">
        <button onClick={openNewGameModal} className="custom-button">
          New game
        </button>
      </div>
    </div>
  );
};

export default Menu;
