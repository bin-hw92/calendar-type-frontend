import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import { RootState } from "../../modules";
import { changeModal } from "../../modules/calendar";
import { changeForm } from "../../modules/form";
import { tableout } from "../../modules/tables";
import { useCalendar } from "../utils/useCalendar";
import { useCalendarHeader } from "../utils/useCalendarHeader";

const CalendarHeaderContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {viewYear, viewMonth, viewDate, user, tableCalendar, viewForm} = useSelector(({ calendar, user, tables, form }:RootState) => ({
        viewYear: calendar.form.viewYear,
        viewMonth: calendar.form.viewMonth,
        viewDate: calendar.form.viewDate,
        user: user.user,
        tableCalendar: tables.tableCalendar,
        viewForm: form.viewForm,
    }));

    const headerName = useCalendarHeader({viewYear, viewMonth, viewDate, viewForm}); 

    const onClick = useCalendar({viewYear, viewMonth, viewDate, viewForm}); 

    const onModalClick = () => {
        dispatch(changeModal({modalFlag:true, type:'wrtie'}));
    };

    const onBackClick = () => {
        dispatch(tableout());
    };

    const onFormChange = useCallback((value:number) => {
        dispatch(changeForm({key: 'viewForm', value}));
    },[dispatch]);

    useEffect(() => {
        if(!user){
            navigate('/');
            return;
        }
        if(!tableCalendar){
            navigate('/table');
            return;
        }
    },[navigate, tableCalendar, user]);

    return (
        <CalendarHeader 
            user={user} 
            headerName={headerName}
            tableCalendar={tableCalendar} 
            viewForm={viewForm}
            onClick={onClick} 
            onModalClick={onModalClick} 
            onBackClick={onBackClick}
            onFormChange={onFormChange}
        />
    )
};

export default CalendarHeaderContainer;