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
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setRemainingTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div>
      <p className="text-center mb-0">
        Time Remaining<br></br> {remainingTime.days} days, {remainingTime.hours}
        :{remainingTime.minutes}:{remainingTime.seconds}
      </p>
    </div>
  );
};

export default TimeCounter;
