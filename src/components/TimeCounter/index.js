import React, { useState, useEffect } from 'react';

const TimeCounter = () => {
  const [remainingTime, setRemainingTime] = useState({});
  const [endDate, setEndDate] = useState(new Date('2023-07-01T00:00:00'));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(endDate).getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setRemainingTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div>
      <p>Time Remaining: {remainingTime.days} days, {remainingTime.hours} hours, {remainingTime.minutes} minutes, {remainingTime.seconds} seconds</p>
    </div>
  );
};

export default TimeCounter;
