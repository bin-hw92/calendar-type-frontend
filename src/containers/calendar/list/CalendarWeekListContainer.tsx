import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarWeekList from "../../../components/calendar/list/CalendarWeekList";
import { RootState } from "../../../modules";
import { changeCalendar, changeCalendarMonth, changeModal, changeSubWrite, changeWrite, listCalendar, listHoliday } from "../../../modules/calendar";
import { WeekDay, WeekStartEnd } from "../../utils/WeekCalc";

const CalendarWeekListContainer = () => {
    const [dates, setDates] = useState<any>([]);
    const dispatch = useDispatch();
    const {form, calendarList, error, loading, holidayList } = useSelector(({ calendar, loading }:RootState) => ({
        form: calendar.form,
        calendarList: calendar.calendarList,
        error: calendar.error,
        loading: loading['calendar/LIST_CALENDAR'],
        holidayList: calendar.holidayList,
    }));
    const {viewYear, viewMonth, viewDate} = form;
 
    useEffect(() => {
        const thisDates = WeekStartEnd({viewYear, viewMonth}); //calendarList가 있을 경우
        dispatch(listCalendar(thisDates)); //처음 입장 시 
        dispatch(changeCalendarMonth(thisDates));
    },[viewYear, viewMonth, dispatch]);
    
    useEffect(() => {
        dispatch(listHoliday({viewYear})); //처음 입장 시
    },[viewYear, dispatch]);
 
    useEffect(() => {
        const thisDates = WeekDay({viewYear, viewMonth, viewDate, calendarList, holidayList}); //calendarList가 있을 경우
        setDates(thisDates);
    },[calendarList, holidayList, viewMonth, viewYear, viewDate]);

    const onClick = useCallback((fullDate:string) => {
        const DateArray = fullDate.split('.');
        dispatch(changeCalendar({
            viewYear: DateArray[0],
            viewMonth: DateArray[1],
            viewDate: DateArray[2],
        }));
        //팝업 띄우기 전에 write에 달력 값 넣기
        dispatch(changeWrite({key: 'startDay', value: fullDate}));
        dispatch(changeWrite({key: 'endDay', value: fullDate}));
        dispatch(changeSubWrite({form: 'startDate', key: 'year', value: DateArray[0]}));
        dispatch(changeSubWrite({form: 'startDate', key: 'month', value: DateArray[1]}));
        dispatch(changeSubWrite({form: 'startDate', key: 'date', value: DateArray[2]}));
        dispatch(changeSubWrite({form: 'endDate', key: 'year', value: DateArray[0]}));
        dispatch(changeSubWrite({form: 'endDate', key: 'month', value: DateArray[1]}));
        dispatch(changeSubWrite({form: 'endDate', key: 'date', value: DateArray[2]}));
        
        //값이 있을 경우 해당 날짜 상세 보여주기!!
        const TodoLen = calendarList !== null && calendarList.filter(({startDay, endDay}) => startDay <= fullDate && endDay >= fullDate).length;
        if(TodoLen > 0) dispatch(changeModal({modalFlag:true, type:'view'}));
    },[calendarList, dispatch]);

    if(calendarList === null && holidayList === null) return <></>;

    return <CalendarWeekList 
                loading={loading}
                dates={dates}
                viewDate={viewDate}
                error={error}
                onClick={onClick}
            />
};

export default CalendarWeekListContainer;