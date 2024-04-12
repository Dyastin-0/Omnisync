import React, { useState, useEffect } from 'react';

import { useData } from "../../contexts/data/data";

import { deconstructData } from "../../utils/chart-helper";
import { Loading } from '../loading/loading';

export const Insight = (props) => {
  const { chartData } = useData();
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      const deconstructed = deconstructData(chartData);
      setInsights(deconstructed);
    } else {
      setInsights([]);
    }
  }, [chartData]);

  return (
    <div className='content-panel'>
      <h3>{props.title}</h3>
      <div className='container'>
        {insights && insights.length > 0 ?
          insights.toReversed().map((value, key) => {
            const highestHours = Math.floor(value.highestUsage);
            const highestMinutes = Math.floor((value.highestUsage - highestHours) * 60);
            const highestSeconds = Math.floor(((value.highestUsage - highestHours) * 60 - highestMinutes) * 60);
            const currentDate = new Date();
            const options = { weekday: 'long' };
            const currentDay = currentDate.toLocaleDateString('en-US', options);
            return (
            <React.Fragment key={key} >
              <div className='box'>
              <h5>{value.day === currentDay ? 'Today' : value.day }</h5>
                <p>{`Your ${value.highestDevice} were on for ${highestHours} h ${highestMinutes} m ${highestSeconds} s
                  that is about ${((value.highestUsage / value.total) * 100).toFixed(0)}% of the total usage.
                `}</p>
              </div>
            </React.Fragment>
          )}) :
          <Loading text='No insights to display.'/>
        }
      </div>
    </div>
  );
}