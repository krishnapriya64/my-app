/**
 * Counter component with both timer and manual counter functionality.
 * Timer counts up from 0 with start, stop, reset.
 * Manual counter allows increment, decrement, reset.
 * Uses useEffect for timer interval management.
 */

import React, { useState, useEffect } from "react";

function Counter() {
  // State for timer
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // State for manual counter
  const [count, setCount] = useState(0);

  // useEffect for timer interval
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  // Timer functions
  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  // Manual counter functions
  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count - 1);
  const resetCount = () => setCount(0);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {/* Timer section */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Timer</h3>
        <p style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px', fontFamily: 'monospace' }}>
          {formatTime(time)}
        </p>
        <button onClick={startTimer} disabled={isRunning} style={{ margin: '0 5px', padding: '10px 15px', opacity: isRunning ? 0.5 : 1 }}>Start</button>
        <button onClick={stopTimer} disabled={!isRunning} style={{ margin: '0 5px', padding: '10px 15px', opacity: !isRunning ? 0.5 : 1 }}>Stop</button>
        <button onClick={resetTimer} style={{ margin: '0 5px', padding: '10px 15px' }}>Reset Timer</button>
      </div>

      {/* Manual counter section */}
      <div>
        <h3>Manual Counter</h3>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>{count}</p>
        <button onClick={incrementCount} style={{ margin: '0 5px', padding: '10px 15px' }}>Increment</button>
        <button onClick={decrementCount} style={{ margin: '0 5px', padding: '10px 15px' }}>Decrement</button>
        <button onClick={resetCount} style={{ margin: '0 5px', padding: '10px 15px' }}>Reset Counter</button>
      </div>
    </div>
  );
}

export default Counter;
