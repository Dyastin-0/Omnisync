import '../content-panel.css';

import { AreaChart,
  Area,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

import { useData } from '../../contexts/data/data';
import { Loading } from '../loading/loading';
import { CustomTooltip } from './custom-tooltip';

export const UsageChart = (props) => {
const { chartData } = useData();

  return (
    <div className='content-panel width-max'>
      <h2>{props.title}</h2>
      <div className='container height-fit'>
        {chartData.length > 0 ? (
          <ResponsiveContainer width='100%' height='98%'>
          <AreaChart width='100%' height='100%' data={chartData}>
            <YAxis />
            <XAxis dataKey='day' />
            <CartesianGrid />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type='monotone' 
              dataKey='total'
              stroke='var(--secondary-color)'
              fill='var(--secondary-color)'
            />
          </AreaChart>
        </ResponsiveContainer>
        ) : (
          <Loading text='No data to display.' />
        )}
      </div>
    </div>
  );
}