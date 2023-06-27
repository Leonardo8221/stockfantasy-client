/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

const TimeCounter = ({ startedDate, duration }) => {
  const [remainingTime, setRemainingTime] = useState({});

  let millisecondsInDay = 86400000; // 1000 * 60 * 60 * 24;
  let start = new Date(startedDate);
  const endDate = new Date(start.getTime() + duration * millisecondsInDay);

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = new Date(endDate).getTime() - new Date();

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = (
        "0" + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ).slice(-2);
      const minutes = (
        "0" + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      ).slice(-2);
      const seconds = ("0" + Math.floor((distance % (1000 * 60)) / 1000)).slice(
        -2
      );

      setRemainingTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <p className="text-center mb-0">
      Time Remaining<br></br> {remainingTime.days} days, {remainingTime.hours}:
      {remainingTime.minutes}:{remainingTime.seconds}
    </p>
  );
};

export default TimeCounter;
