import { publicRequest } from "../requestMethods"
import { loginFaliure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try{
        const res = await publicRequest.post('/api/auth/login',user);
        dispatch(loginSuccess(res.data));
        return res.data;
    }catch(err){
        dispatch(loginFaliure())
    }
};