import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import AuthForm from "../../components/auth/AuthForm";
import { changeField, initializeForm, register } from "../../modules/auth";
import { useNavigate } from "react-router-dom";
import { check } from "../../modules/user";
import { RootState } from "../../modules";

const RegisterForm = () => {
    const [error, setError] = useState<string|null>(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user  } = useSelector(({ auth, user }:RootState) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }
    ));

    const navigate = useNavigate();


    // 인풋 변경 이벤트 핸들러
    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };

    //폼 등록 이벤트 핸들러
    const onSubmit = (e:FormEvent) => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        // 하나라도 비어 있다면
        if([username, password, passwordConfirm].includes('')){ //includes 배열에 해당 값이 들어있는지 확인
            setError('빈 칸을 모두 입력하세요.');
            return;
        }
        if(password !== passwordConfirm){
            // TODO: 오류 처리
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({ form: 'register', key: 'password', value: ''}));
            dispatch(changeField({ form: 'register', key: 'passwordConfirm', value: ''}));
            return;
        }
        dispatch(register({ username, password }));
    };

    // 컴포넌트가 처음 렌더링될 때 form을 초기화함
    useEffect(() => {
        dispatch(initializeForm('register'));
    },[dispatch]);

    useEffect(() => {
          if(authError){
             // 계정명이 이미 존재할 때
             if(authError.response.status === 409){
                setError('이미 존재하는 계정명입니다.');
                return;
             }
             //기타 이유
             setError('회원가입 실패');
            return;
        }  
        if(auth){
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(check());
        }
    }, [authError, auth, dispatch]);

    useEffect(() => {
        if(user){
            navigate('/table'); //홈 화면으로 이동
            //로그인 유지
            try{
                localStorage.setItem('user', JSON.stringify(user));
            }catch(e){
                console.log('localStorage is not working');
            }
        }
    },[navigate, user]);

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
}

export default RegisterForm;