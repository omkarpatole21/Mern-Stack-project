import axios from "axios";
import { userActions } from "./user-slice";

export const getSignuUp =(user) => async(dispatch) =>{
    try{
        dispatch(userActions.getSingupRequest());
        const {data} = await axios.post("/api/v1/rent/user/signup", user);

        dispatch(userActions.getSingupDetails(data.user));
    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

export const getLogIn = (user) => async(dispatch)=>{
    try{
        dispatch(userActions.getLoginRequest());
        const{data} = await axios.post("/api/v1/rent/user/login", user);
        dispatch(userActions.getLoginDetails(data.user));
    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

export const currentUser =() => async(dispatch)=>{
    try{
    dispatch(userActions.getCurrentUserRequest());
    const {data}= await axios.get("/api/v1/rent/user/me");
    dispatch(userActions.getCurrentUser(data.user));
    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

export const updateUser=(updateUser)=> async(dispatch)=>{
    try{
        dispatch(userActions.getUpdateUserRequest());
        await axios.patch("/api/v1/rent/user/updateMe", updateUser);
        const {data} = await axios.get("/api/v1/rent/user/me");
        dispatch(userActions.getCurrentUser(data.user));
    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

export const forgotPassword= (email)=> async(dispatch) => {
    try{
        await axios.post("/api/v1/rent/user/forgotPassword", {email});
    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

export const resetPassword = (repassword, token) => async(dispatch)=>{
    try{
        await axios.patch(`/api/v1/rent/user/resetPassword/${token}`, repassword);
    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

export const updatePassword = (password) => async(dispatch)=>{
    try{
        dispatch(userActions.getPasswordRequest());
        await axios.patch("/api/v1/rent/user/updatePassword", password);
        dispatch(userActions.getPasswordSuccess(true))
    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

export const Logout =()=> async(dispatch)=>{
    try{
        await axios.get("/api/v1/rent/user/logout");
        dispatch(userActions.getLogout(null))
    }catch(error){
        dispatch(userActions.getError(error));
    }
};