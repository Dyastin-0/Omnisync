import React from 'react';
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
import { randomColor } from '../../utils/color';

export const UsageChart = (props) => {
  const { chartData, renderedArea, isFetching } = useData();
  const color = randomColor();

  return (
    <div className='content-panel width-max'>
      <h2>{props.title}</h2>
      <div className='container height-fit'>
        {chartData.length > 0 ? (
          <ResponsiveContainer width='100%' height='98%'>
          <AreaChart width='100%' height='100%' data={chartData}>
            <YAxis />
            <XAxis dataKey='day' />
            <CartesianGrid 
              color='black'
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type='monotone' 
              dataKey='total'
              stroke={color}
              fill={color}
            />
            {!isFetching && renderedArea.length > 0 &&
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