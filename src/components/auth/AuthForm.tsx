import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import GoogleLogin from 'react-google-login';
import { ChangeEvent, FormEvent } from "react";

/* 
    회원가입 또는 로그인 폼을 보여 줍니다.
*/
const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

/* 
    스타일링된 input
*/
const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-botton: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 1rem;
    }
`;
/* 
    폼 하단에 로그인 혹은 회원가입 링크를 보여 줌
*/
const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover {
            color: ${palette.gray[9]};
        }
    }
`;

/* 에러를 보여줍니다. */
const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const ButtonMarginTop = styled(Button)`
    margin-top: 1rem;
`;

const textMap = {
    login: '로그인',
    register: '회원가입',
};

type AuthFormProps = {
    type: string;
    form: any;
    onChange:(e:ChangeEvent<HTMLInputElement>) => void;
    onSubmit:(e:FormEvent) => void;
    error: any;
    onGoogleSignInSuccess?: (res:any) => void,
    googleError?: (error:Error) => void,
}

const AuthForm = ({type, form, onChange, onSubmit, error, onGoogleSignInSuccess, googleError}:AuthFormProps) => {
    const clientId = "275610597847-procqllf16u5n6up887qqr1713cl69d5.apps.googleusercontent.com";
    const text = type === 'register'? textMap.register : textMap.login;

    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <StyledInput autoComplete="username" name="username" placeholder="아이디" onChange={onChange} value={form.username}/>
                <StyledInput autoComplete="new-password" name="password" placeholder="비밀번호" type="password" onChange={onChange} value={form.password}/>
                {type === 'register' && (
                    <StyledInput autoComplete="new-password" name="passwordConfirm" placeholder="비밀번호 확인" type="password" onChange={onChange} value={form.passwordConfirm}/>
                )}
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <ButtonMarginTop cyan fullWidth >
                    {text}
                </ButtonMarginTop>
                {type === 'login' ? 
                (
                <div style={{marginTop: '20px'}}>
                    <GoogleLogin
                        clientId={clientId}
                        onSuccess={(res) => onGoogleSignInSuccess? onGoogleSignInSuccess(res) : ''}
                        onFailure={(error) => googleError? googleError(error) : ''}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
                ) : ('')}
            </form>
            <Footer>
                {type === 'login' ? (
                    <Link to="/register" >회원가입</Link>
                ): (
                    <Link to="/" >로그인</Link>
                )}
            </Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;