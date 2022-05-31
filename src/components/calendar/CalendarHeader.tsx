import Button from "../common/Button";
import '../../css/Calendar.css';
import React from "react";

type CalendarHeaderProps = {
  user: any;
  headerNmae: string;
  tableCalendar: any;
  onClick: (idx:number) => void;
  onModalClick: () => void;
  onBackClick: () => void;
  onFormChange: (value:number) => void;
}

const CalendarHeader = ({user, headerNmae, tableCalendar, onClick, onModalClick, onBackClick, onFormChange}:CalendarHeaderProps) => {

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
        <div>{headerNmae}</div>
      <button className="right-arrow" onClick={() => onClick(1)} />
      <button className="today-button" onClick={() => onClick(0)}>오늘</button>
      {user &&(
      <div className="todo-add-wrap">
        <Button onClick={onModalClick}>일정 추가</Button>
      </div>)}
    </div>
    <div className="calendar-button-header">
      <button className="week-button" onClick={() => onFormChange(1)}>주</button>
      <button className="month-button on-button" onClick={() => onFormChange(0)}>월</button>
    </div>
    </>
  );
};

export default CalendarHeader;
