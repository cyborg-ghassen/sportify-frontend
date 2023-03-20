import {useState} from 'react';
import {setAuthToken} from "../../../utils/backend.instance";

export default function useToken() {
    const getToken = () => {
        return localStorage.getItem('access')
    };
    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('access', userToken.access);
        localStorage.setItem('refresh', userToken.refresh);
        localStorage.setItem('user', JSON.stringify(userToken.user));
        setToken(userToken);
        setAuthToken(userToken.access);
    };

    return {
        setToken: saveToken,
        token
    }
}
