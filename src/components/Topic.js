import React, { useContext } from "react";
import { AppContext } from "../context";
import { UPDATE_TOPIC } from "../reducers/actions";

const Topic = ({ closeModal }) => {
  const { state, dispatch } = useContext(AppContext);

  const changeTopic = (topic) => {
    dispatch({
      type: UPDATE_TOPIC,
      payload: topic,
    });
    closeModal();
  };

  const topics = [
    {
      key: "pepe",
      name: "Pepe",
    },
    {
      key: "rick-and-morty",
      name: "Rick & morty",
    },
  ];

  return (
    <div className="topic">
      {topics.map((topic) => (
        <div
          onClick={() => changeTopic(topic.key)}
          key={topic.key}
          data-testid={topic.key}
          className={`modal-item ${topic.key === state.topic ? "active" : ""}`}
        >
          {topic.name}
        </div>
      ))}
    </div>
  );
};

export default Topic;
