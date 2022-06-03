import { MouseEvent } from "react";
import "../../css/Todo.css";
import { getCalendarListDB } from "../../types";
import Loading from "../common/Loading";

type TimeItemProps = {
    startDate: {
        year: string;
        month: string;
        date: string;
        hour: string;
        min: string;
    };
    endDate: {
        year: string;
        month: string;
        date: string;
        hour: string;
        min: string;
    }
}

const TimeItem = ({startDate, endDate}:TimeItemProps) => {
    return (
        <>
        {startDate.year === endDate.year && startDate.month === endDate.month && startDate.date === endDate.date?
            (<div className="time">{startDate.hour}:{startDate.min} ~ {endDate.hour}:{endDate.min}</div>):
            (
            <div className="time">
                {startDate.year}년{startDate.month}월{startDate.date}일 {startDate.hour}:{startDate.min} ~ 
                {endDate.year}년{endDate.month}월{endDate.date}일 {endDate.hour}:{endDate.min}
            </div>
            )}
        </>
        
    )
}

type CalendarViewProps = {
    calendars: getCalendarListDB[] | null;
    onClick: (e: MouseEvent<Element>, id: string) => Promise<void>;
    User: {
        [key in string] : string;
    }|null;
    viewYear: string;
    viewMonth: string;
    viewDate: string;
    loading: any;
}

const CalendarView = ({ calendars, onClick, User, viewYear, viewMonth, viewDate, loading }:CalendarViewProps) => {

    return (
        <div className="todo-list">
            <div className="todo-top-title">{viewYear}년{viewMonth}월{viewDate}일</div>
            {loading && calendars === null? (<Loading />) : 
                (<>
                    {calendars !== null && calendars.map(({_id, title, body, startDate, endDate, label, user}) => {
                        const labelStyle = {'background': label.style};
                        return <ul className="todo-list-item" key={_id} onClick={(e) => onClick(e, _id)}>
                                <li className="label">
                                    <span>{label.text}</span>
                                    <div style={labelStyle}></div>
                                </li>
                                {User?
                                    User.username === user.username? (
                                    <>
                                        <li className="title">
                                            <div className="title-font">{title}</div>
                                            <TimeItem startDate={startDate} endDate={endDate} key={_id} />
                                        </li>
                                        <li className="body">{body}</li>
                                        <li className="delete"></li>
                                    </>
                                ): (
                                    <>
                                        <li className="title-none">
                                            <div className="title-none-font">{title}</div>
                                            <TimeItem startDate={startDate} endDate={endDate} key={_id} />
                                        </li>
                                        <li className="body">{body}</li>
                                        <li className="delete-none"></li>
                                    </>
                                ) : 
                                (<li className="delete-none"></li>)
                                }
                            </ul>  
                        })}
                    </>
                )
            }
            
        </div>
    );
};

export default CalendarView;