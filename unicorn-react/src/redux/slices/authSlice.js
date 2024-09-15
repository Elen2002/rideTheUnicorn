import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userToken: null,
    id: null,
    username: '',
}

const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setSignIn: (state, action) => {
            state.userToken  = action.payload.userToken ;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.avatar = action.payload.avatar;
        },
        setSignOut: (state) => {
            state.userToken = null;
            state.isLoggedIn = false;
            state.id = 0;
            state.username = '';
            state.avatar = null;
        },
        setLang: (state, action) => {
            state.lang = action.payload.lang;
        }
    }
});

export const { setSignIn, setSignOut, setLang} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn;
export const selectUserToken = (state) => state.userAuth.userToken;


export default authSlice.reducer;
