/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

const TimeCounter = ({ startedDate, duration, onGameEnd }) => {
  const [remainingTime, setRemainingTime] = useState({});

  let millisecondsInDay = 86400000; // 1000 * 60 * 60 * 24;
  let start = new Date(startedDate);
  const endDate = new Date(start.getTime() + 6.237 * millisecondsInDay);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const distance = new Date(endDate).getTime() - currentTime;
      if (distance <= 0) {
        setRemainingTime({
          days: 0,
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      if (onGameEnd) onGameEnd(currentTime);
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = (
          "0" +
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        ).slice(-2);
        const minutes = (
          "0" + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        ).slice(-2);
        const seconds = (
          "0" + Math.floor((distance % (1000 * 60)) / 1000)
        ).slice(-2);
        setRemainingTime({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <p className="text-center mb-0">
      Time Remaining<br></br> {remainingTime.days} days, {remainingTime.hours}:
      {remainingTime.minutes}:{remainingTime.seconds}
    </p>
  );
};

export default TimeCounter;
