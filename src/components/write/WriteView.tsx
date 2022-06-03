
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "../../css/Todo.css";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import { ChangeEvent, FormEvent } from "react";

/* 에러를 보여줍니다. */
const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-bottom: 1rem;
`;

type LabelItemProps = {
    labels: {
        id: number;
        name: string;
        color: string;
    }[];
    labelStyle: string;
    onStyleClick: (id: number) => void;
}

const LabelItem = ({labels, labelStyle, onStyleClick }:LabelItemProps) => {
    return (
        <>
        {labels.map((label) => {
            const $classStyle = label.color === labelStyle? `label-on ${label.name}` : label.name;
            return <div className={$classStyle} key={label.id} onClick={() => onStyleClick(label.id)}></div>
        })}
        </>
    );
};

type WriteViewProps = {
    write: {
        title: string;
        body: string;
        startDay: string;
        startDate: {
            year: string;
            month: string;
            date: string;
            hour: string;
            min: string;
        },
        endDay: string;
        endDate: {
            year: string;
            month: string;
            date: string;
            hour: string;
            min: string;
        },
        hoursArray: number[],
        minArray: number[],
        labels: {
            id: number;
            name: string;
            color: string;
        }[];
        labelStyle: string;
        labelText: string;
    }
    error: string[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onDateChange: (date: Date, type: string) => void;
    onSubmit: (e: FormEvent) => void;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    calendarId: string|null;
    onStyleClick: (id: number) => void;
}

const WriteView = ({ write, error, onChange, onDateChange, onSubmit, onInputChange, calendarId, onStyleClick }:WriteViewProps) => {
    const { title, body, startDay, startDate, endDay, endDate, hoursArray, minArray, labels, labelStyle, labelText} = write;
    const sDate = new Date(startDay);
    const eDate = new Date(endDay);
    const titlestyle = error[0] === 'title'?  {'border': '1px solid red'} : {};
    const datestyle = error[0] === 'date'?  {'border': '1px solid red'} : {'border': '1px solid #ddd'};
    const labelstyle = error[0] === 'label'?  {'border': '1px solid red'} : {};
    
    return (
        <>
        <form onSubmit={onSubmit}>
            <ul>
                <li className="todo-title">
                    <Form.Control type="text" id="todo-title" name="title" placeholder="제목을 입력하세요" onChange={onInputChange} value={title} style={titlestyle} />
                </li>
                <li className="todo-date">
                    <div>
                        <DatePicker 
                            locale={ko} 
                            onChange={(date:Date) => onDateChange(date, "START")} 
                            value={sDate.toDateString()}
                            selected={sDate}
                            dateFormat="yyyy.MM.dd"
                            customInput={
                                <Form.Control type="text" id="start-day" style={datestyle} disabled={true} />
                            }
                        />
                        <Form.Select id="start-hours" value={startDate.hour} onChange={onChange} name="hour">
                            {hoursArray.map(hour => <option value={hour} key={hour}>{hour}시</option>)}
                        </Form.Select>
                        <Form.Select id="start-min" value={startDate.min} onChange={onChange} name="min">
                            {minArray.map(min => <option value={min} key={min}>{min}분</option>)}
                        </Form.Select>
                    </div>
                    <div>
                        <DatePicker 
                            locale={ko} 
                            onChange={(date:Date) => onDateChange(date, "END")} 
                            value={eDate.toDateString()}
                            selected={eDate}
                            dateFormat="yyyy.MM.dd"
                            customInput={
                                <Form.Control type="text" id="end-day" style={datestyle} disabled={true}/>
                            }
                        />
                        <Form.Select id="end-hours" value={endDate.hour} onChange={onChange} name="hour">
                            {hoursArray.map(hour => <option value={hour} key={hour}>{hour}시</option>)}
                        </Form.Select>
                        <Form.Select id="end-min" value={endDate.min} onChange={onChange} name="min">
                            {minArray.map(min => <option value={min} key={min}>{min}분</option>)}
                        </Form.Select>
                    </div>
                </li>
                <li>
                    <div className="label-wrap">
                        <LabelItem labels={labels} labelStyle={labelStyle} onStyleClick={onStyleClick} />
                    </div>
                    <div>
                        <input type="hidden" name="label-style" value={labelStyle} />
                        <Form.Control type="text" name="label-text" placeholder="라벨명을 입력하세요" onChange={onInputChange} value={labelText} style={labelstyle} />
                    </div>
                </li>
                <li className="todo-text">
                    <Form.Control as="textarea" name="body" rows={5} onChange={onInputChange} value={body}/>
                </li>
            </ul>
            {error[0] && <ErrorMessage>{error[1]}</ErrorMessage>}
            <div className="todo-bottom">
                {!calendarId? (
                    <>
                        <Button variant="secondary" data-btn="N">취소</Button>
                        <Button variant="primary" data-btn="Y" onClick={onSubmit}>저장</Button>
                    </>
                ):(
                    <>
                        <Button variant="secondary" data-btn="B">취소</Button>
                        <Button variant="primary" data-btn="Y" onClick={onSubmit}>수정</Button>
                    </>
                )}
            </div>
        </form>
        </>
    )
};


export default WriteView;