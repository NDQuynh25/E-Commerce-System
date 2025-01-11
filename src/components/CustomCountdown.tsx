import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled-components cho phần Countdown
const StyledCountdown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: bold;

  .time-unit {
    background-color: black;
    padding: 2px 5px;
    border-radius: 5px;
    color: white;
  }
`;

const CountdownComponent = () => {
    const [time, setTime] = useState<number>(10000000); // 10 triệu ms = 2 tiếng 46 phút

    useEffect(() => {
        setTimeout(() => {
            setTime((prev) => {
                if (prev <= 0) {
                return 0;
                }
                return prev - 1000; // Giảm 1 giây
            });
        }, 1000);

      
    }, [time]);

    
    const hours = Math.floor(time / 3600000); 
    const minutes = Math.floor((time % 3600000) / 60000); 
    const seconds = Math.floor((time % 60000) / 1000); 

  return (
    <StyledCountdown>
      <div className="time-unit">
        {hours < 10 ? `0${hours}` : hours}
      </div>
      <div className="time-unit">
        {minutes < 10 ? `0${minutes}` : minutes} 
      </div>
      <div className="time-unit">
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </StyledCountdown>
  );
};

export default CountdownComponent;
