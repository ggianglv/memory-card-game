import React, { useContext } from "react";
import { SET_MODE } from "../reducers/actions";
import { LEVEL } from "../constants";
import { AppContext } from "../context";

const NewGame = ({ closeModal }) => {
  const { dispatch } = useContext(AppContext);

  const setMode = (mode) => {
    dispatch({
      type: SET_MODE,
      payload: mode,
    });

    closeModal();
  };

  return (
    <div className="new-game">
      <div onClick={() => setMode(LEVEL.EASY)} className="modal-item">
        Easy (4x4)
      </div>
      <div onClick={() => setMode(LEVEL.MEDIUM)} className="modal-item">
        Medium (4x5)
      </div>
      <div onClick={() => setMode(LEVEL.HARD)} className="modal-item">
        Hard (4x6)
      </div>
    </div>
  );
};

export default NewGame;
