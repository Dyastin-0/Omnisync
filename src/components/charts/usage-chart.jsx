import React, { useEffect, useRef } from 'react';
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
import Toggle from '../toggle/toggle';
import { useSettings } from '../../contexts/settings/settings';

export const UsageChart = (props) => {
  const { chartData, renderedArea } = useData();
  const { toggleIncludeDevice, areDevicesIncluded } = useSettings();

  const includeDevicesRef = useRef(null);

  useEffect(() => {
    includeDevicesRef.current.checked = areDevicesIncluded;
  }, [areDevicesIncluded]);

  return (
    <div className='content-panel flex-max'>
      <h3>{props.title}</h3>
      <div className='container'>
        {chartData.length > 0 ? (
          <ResponsiveContainer width='100%' height='98%'>
          <AreaChart width='100%' height='100%' data={chartData} margin={{right: 30}}>
            <YAxis tickFormatter={(value) => {
              if (value >= 1) {
                return (`${value} h`);
              } else if (value < 0.0060) {
                return (`${(value * 3600).toFixed(2)} s`);
              } else {
                return (`${(value * 60).toFixed(2)} m`);
              }
            }} />
            <XAxis dataKey='day' />
            <CartesianGrid />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type='monotone' 
              dataKey='total'
              stroke='var(--text-color)'
              fill='var(--text-color)'
            />
            {areDevicesIncluded && renderedArea.length > 0 &&
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
      <div className='row'>
        <h6>Include devices</h6>
       <Toggle size='small' ref={includeDevicesRef} onchange={toggleIncludeDevice}/>
      </div>
    </div>
  );
}