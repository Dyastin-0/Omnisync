import React, { useEffect, useState } from 'react';
import '../content-panel.css';

import { AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

import { useData } from '../../contexts/data/data';
import { Loading } from '../loading/loading';
import { CustomTooltip } from './custom-tooltip';

import { constructData } from '../../utils/chart-helper';

export const UsageChart = (props) => {
  const { toggles, messages } = useData();
  const [renderedArea, setRenderedArea] = useState([]);
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    if (messages) {
    const data = constructData(messages);
    setChartData(data);
    }
  }, [messages]);

  useEffect(() => {
    messages && renderAreas();
  }, [messages]);

  const renderAreas = () => {    
    const rendered = Object.entries(toggles).map(([key, value], index) => {
      return (
      <Area 
        key={index}
        type='monotone' 
        dataKey={value.name}
        stroke='var(--text-color)'
        fill='var(--text-color)'
      />
      );
    });
    setRenderedArea(rendered);
  }
  return (
    <div className='content-panel flex-max'>
      <h2>{props.title}</h2>
      <div className='container'>
        {chartData.length > 0 ? (
          <ResponsiveContainer width='100%' height='98%'>
          <AreaChart width='100%' height='100%' data={chartData} margin={{right: 30}}>
            <YAxis />
            <XAxis dataKey='day' />
            <CartesianGrid />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type='monotone' 
              dataKey='total'
              stroke='var(--text-color)'
              fill='var(--text-color)'
            />
            {renderedArea.length > 0 &&
              renderedArea.map((area, index) => (
                <React.Fragment key={index}>
                  {area}
                </React.Fragment>
              ))  
            }
          </AreaChart>
        </ResponsiveContainer>
        ) : (
          <Loading text='No data to display.' />
        )}
      </div>
    </div>
  );
}