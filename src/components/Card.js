import React from "react";

import "../styles/card.css";
const Card = ({ image, cardIndex, setActive, active, removed }) => {
  const styles = {
    background: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#dddddd",
  };

  let className = "flip-card";
  if (active) {
    className += " flip-card-active";
  }
  if (removed) {
    className += " flip-card-removed";
  }

  return (
    <div onClick={() => setActive(cardIndex)} className={className}>
      <div className="flip-card-inner">
        <div className="flip-card-front" />
        <div style={styles} className="flip-card-back" />
      </div>
    </div>
  );
};

export default Card;
