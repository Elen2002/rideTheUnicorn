import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggedIn, setSignIn} from "../redux/slices/authSlice";
import {useEffect} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Routing from "./Routing";
import AuthRouting from "./AuthRouting";
import Cookies from 'js-cookie';

const AppRoute = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            let id;
            let username;
            let avatar;
            id = localStorage.getItem('id');
            userToken = localStorage.getItem('userToken');
            username = localStorage.getItem('username');
            avatar = localStorage.getItem('avatar');

            if (userToken || userToken != null || avatar || avatar != null || username || username != null) {
                dispatch(setSignIn({
                    isLoggedIn: true, userToken: userToken,
                    id: id,
                    avatar: avatar,
                    username: username,
                }))
            }

        };
        bootstrapAsync();
    }, []);

    return (
        <Router>
            {
                <Routing/>
                // isLoggedIn ?<Routing/>: <AuthRouting/>
            }
        </Router>
    )
}

export default AppRoute
