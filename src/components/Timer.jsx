import { useState, useEffect } from "react";

const Timer = ({ deadline }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = Date.parse(deadline) - Date.now();

      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div className="timer">
      {days < 0 ? (
        ""
      ) : (
        <p>{`${days}d: ${hours}hr: ${minutes}min: ${seconds}s left`}</p>
      )}
    </div>
  );
};

export default Timer;
