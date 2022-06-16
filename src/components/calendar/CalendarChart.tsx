import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";
import styled from 'styled-components';
import { getCalendarListDB } from '../../types';
ChartJS.register(...registerables);

/* styled component */
const ChartWrap = styled.div`
    padding-bottom: 30px;
    width: 100%;
    height: 300px;
    border-bottom: 1px solid #333;
`;
/* Type Props */
type CalendarChartProps = {
    calendarList: getCalendarListDB[];
}

const CalendarChart = ({calendarList}:CalendarChartProps) => {
    const labelArr:string[] = [];
    const dataArr:number[] = [];

    /* 추후 수정 필요 효율성 떄문에 수정 필수 */
    calendarList.map(data => {
        if(!labelArr.includes(data.startDate.month)){
            labelArr.push(data.startDate.month);
        }
    });

    labelArr.forEach(month => {
        dataArr.push(calendarList.filter(data => data.startDate.month === month).length);
    });
    
    const data = {
        labels: labelArr,
        datasets: [
          {
            label: '작성 개수',
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: dataArr,
          }
        ],
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <ChartWrap>
            <Bar data={data} options={options} />
        </ChartWrap>
    )
}

export default CalendarChart;