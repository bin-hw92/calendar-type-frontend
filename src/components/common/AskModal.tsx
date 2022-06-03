import { MouseEvent } from "react";

type AskModalProps = {
    onClick: (e:MouseEvent<Element>) => void;
    children: any;
}

const AskModal = ({onClick, children }:AskModalProps) => {

    return (
        <div className="todo-wrap" onClick={onClick}>
            <div className="todo-content">
                <button className="todo-close-btn" data-btn="N"></button>
                {children}
            </div>
        </div>
    );
};

export default AskModal;