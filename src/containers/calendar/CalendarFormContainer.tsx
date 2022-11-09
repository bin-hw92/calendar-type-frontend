import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../modules";

const CalendarForm = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 10rem;
`

//주별, 월별 변경될 때마다 실행 되고 List 컨데이너 호출용
const CalendarFormContainer = ({children}:any) => {
    const [childrenForm, setChildrenForm] = useState<any>([]);
    const { viewForm } = useSelector(({ form }:RootState) => ({
        viewForm: form.viewForm,
    }));

    useEffect(() => {
        setChildrenForm(children[viewForm]);
    }, [children, viewForm]);

    return <CalendarForm>{childrenForm}</CalendarForm>;
}

export default CalendarFormContainer;