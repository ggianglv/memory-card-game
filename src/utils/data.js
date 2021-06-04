import { useRef, useEffect } from "react";

const randomNumber = (max) => {
  if (max === 0) {
    return 0;
  }
  return Math.floor(Math.random() * max + 1);
};

export const generateGameData = ({ mode, topic }) => {
  const cards = [...Array(mode)].map((_, index) => index + 1);
  const arrayImages = [...Array(12)].map((_, index) => index + 1);
  const clonedCards = [...cards];
  const cardData = {};
  while (clonedCards.length) {
    const [first] = clonedCards.splice(randomNumber(clonedCards.length - 1), 1);
    const [second] = clonedCards.splice(
      randomNumber(clonedCards.length - 1),
      1
    );
    const image = arrayImages.shift();
    const imageUrl = `/images/${topic}/${image}.png`;
    cardData[first] = imageUrl;
    cardData[second] = imageUrl;
  }

  return {
    cards,
    cardData,
  };
};

export const usePrevious = (value) => {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  return ref.current;
};

export const formatTime = (duration) => {
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
};
