import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isFechting:false,
        error:false
    },
    reducers : {
        loginStart:(state) => {
           state.isFechting = false;
        },
        loginSuccess:(state,action) => {
            state.isFechting = false;
            state.currentUser = action.payload;
        },
        loginFaliure:(state) => {
            state.isFechting = false;
            state.error = true;
        },
        logoutSuccess: (state) => {
            state.currentUser = null;
        }
    },
});

export const { loginStart, loginSuccess, loginFaliure, logoutSuccess } = userSlice.actions;
export const selectUser = (state) => state.user.currentUser;

export default userSlice.reducer;