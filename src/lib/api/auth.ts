import client from "./client";

//로그인
export const login = ({username, password}:AuthApistate) => {
    return client.post('/api/auth/login', { username, password });
}
//로그인 Google
export const loginGoogle = ({username, email}:AuthApistate) => {
    return client.post('/api/auth/loginGoogle', { username, email });
}

//회원가입
export const register = ({username, password}:AuthApistate) => {
    return client.post('/api/auth/register', { username, password });
}

//로그인 상태 확인
export const check = () => client.get('/api/auth/check');

//로그아웃
export const logout = () => client.post('/api/auth/logout');

export type AuthApistate = {
    [key: string] : string,
}