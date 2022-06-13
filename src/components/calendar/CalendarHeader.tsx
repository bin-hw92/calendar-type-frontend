import Button from "../common/Button";
import '../../css/Calendar.css';
import React from "react";

type CalendarHeaderProps = {
  user: {
    [key in string] : string;
  }|null;
  headerName: string;
  tableCalendar: any;
  viewForm:number;
  onClick: (idx:number) => void;
  onModalClick: () => void;
  onBackClick: () => void;
  onFormChange: (value:number) => void;
}

const CalendarHeader = ({user, headerName, tableCalendar, viewForm, onClick, onModalClick, onBackClick, onFormChange}:CalendarHeaderProps) => {
  const monthClass = viewForm === 0? 'month-button on-button' : 'month-button';
  const weekClass  = viewForm === 1? 'week-button on-button' : 'week-button';
  return (
    <>
    <div className="calendar-top-header">
      <div className="calendar-top-title">{tableCalendar && tableCalendar.title}</div>
      <div className="calendar-top-close">
        <button className="back-button" onClick={onBackClick}/>
      </div>
    </div>
    <div className="calendar-header">
      <button className="left-arrow" onClick={() => onClick(-1)} />
        <div>{headerName}</div>
      <button className="right-arrow" onClick={() => onClick(1)} />
      <button className="today-button" onClick={() => onClick(0)}>오늘</button>
      {user &&(
      <div className="todo-add-wrap">
        <Button onClick={onModalClick}>일정 추가</Button>
      </div>)}
    </div>
    <div className="calendar-button-header">
      <button className={weekClass} onClick={() => onFormChange(1)}>주</button>
      <button className={monthClass} onClick={() => onFormChange(0)}>월</button>
    </div>
    </>
  );
};

export default CalendarHeader;
