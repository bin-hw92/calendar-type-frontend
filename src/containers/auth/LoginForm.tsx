import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import AuthForm from "../../components/auth/AuthForm";
import { changeField, initializeForm, login, loginGoogle } from "../../modules/auth";
import { useNavigate } from "react-router-dom";
import { check } from "../../modules/user";
import { RootState } from "../../modules";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState<string|null>(null);
    const { form, auth, authError, user } = useSelector(({auth, user}:RootState) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    const navigate = useNavigate();

    //인풋 변경 이벤트 핸들러
    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };

    //폼 등록 이벤트 핸들러
    const onSubmit = (e:FormEvent) => {
        e.preventDefault();
        const { username, password} = form;
        dispatch(login({username, password}));
    };
        
    const onGoogleSignInSuccess = async (res:any) => {
        dispatch(loginGoogle({username: res.response.data.name, email: res.response.data.name}));
    };

    const googleError = (error:Error) => {
        console.log(error);
      };

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if(authError){
            console.log('오류 발생');
            console.log(authError);
            setError('로그인 실패');
            return;
        }
        if(auth){
            console.log('로그인 성공');
            console.log(auth);
            dispatch(check());
        }
    },[auth, authError, dispatch]);

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
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
            onGoogleSignInSuccess={onGoogleSignInSuccess}
            googleError={googleError}
        />
    );
};

export default LoginForm;