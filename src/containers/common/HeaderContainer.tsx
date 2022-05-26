import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import { RootState } from "../../modules";
import { logout } from "../../modules/user"


const HeaderContainer = () => {
    const { user } = useSelector(({user}:RootState) => ({user: user.user}));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout());
    }

    useEffect(() => {
        if(!user){
            navigate('/'); //홈 화면으로 이동
        }
    },[navigate, user]);

    return <Header user={user} onLogout={onLogout}/>
}

export default HeaderContainer;