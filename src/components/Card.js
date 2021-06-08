import React from "react";

import "../styles/card.css";
const Card = ({ image, cardIndex, setActive, active, removed }) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#dddddd",
  };

  let className = "flip-card";
  if (active || removed) {
    className += " flip-card-active";
  }

  const onCardClick = () => {
    if (removed) {
      return;
    }
    setActive(cardIndex);
  };

  return (
    <div onClick={onCardClick} className={className}>
      <div className="flip-card-inner">
        <div className="flip-card-front" />
        <div data-testid="image" style={styles} className="flip-card-back" />
      </div>
    </div>
  );
};

export default Card;
