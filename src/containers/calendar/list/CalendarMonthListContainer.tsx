import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarMonthList from "../../../components/calendar/list/CalendarMonthList";
import { RootState } from "../../../modules";
import { listCalendar, listHoliday, changeCalendarMonth } from "../../../modules/calendar";
import { DayCalc, DayStartEnd } from "../../utils/MonthCalc";
import { useCalendarClick } from "../../utils/useCalendarClick";

const CalendarMonthListContainer = () => {
    const [dates, setDates] = useState([]);
    const dispatch = useDispatch();
    const {form, calendarList, error, loading, holidayList } = useSelector(({ calendar, loading }:RootState) => ({
        form: calendar.form,
        calendarList: calendar.calendarList,
        error: calendar.error,
        loading: loading['calendar/LIST_CALENDAR'],
        holidayList: calendar.holidayList,
    }));
    const {viewYear, viewMonth, viewDate} = form;
    
    /* useEffect(() => {
        return () => { // 언마운트될 때 초기화
            dispatch(initialize());
        };
    },[dispatch]); */

    useEffect(() => {
        const thisDates = DayStartEnd({viewYear, viewMonth}); //calendarList가 있을 경우
        dispatch(listCalendar(thisDates)); //처음 입장 시 
        dispatch(changeCalendarMonth(thisDates));
    },[viewYear, viewMonth, dispatch]);
    
    useEffect(() => {
        dispatch(listHoliday({viewYear})); //처음 입장 시
    },[viewYear, dispatch]);


    useEffect(() => {
        const thisDates = DayCalc({viewYear, viewMonth, calendarList, holidayList}); //calendarList가 있을 경우
        setDates(thisDates);
    },[calendarList, holidayList, viewMonth, viewYear]);

    const onClick = useCalendarClick({calendarList});

    if(calendarList === null && holidayList === null) return <></>;
    return (
        <CalendarMonthList
            loading={loading}
            dates={dates} 
            viewDate={viewDate}
            error={error}
            onClick={onClick}
        />
    )
};

export default CalendarMonthListContainer;