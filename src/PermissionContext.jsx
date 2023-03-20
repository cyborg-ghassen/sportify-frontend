import React, {createContext, useContext, useEffect, useState} from 'react';
import {api, setAuthToken} from "./utils/backend.instance";

export const PermissionContext = createContext({permissions: [], groups: []});

export const PermissionProvider = ({ children }) => {
    const [permissions, setPermissions] = useState([]);
    const [groups, setGroups] = useState([]);

    const refreshPermissions = async () => {
        const refresh = localStorage.getItem("refresh")
        const response = await api.post('/v1/account/auth/refresh/', {refresh: refresh});
        const data = await response.data;
        setAuthToken(data.access)
        setPermissions(data.permissions_name);
        setGroups(data.groups_name);
    }

    useEffect(()=>{
        refreshPermissions()
    },[])
    return (
        <PermissionContext.Provider value={{ permissions, groups, refreshPermissions }}>
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermissions = () => {
    return useContext(PermissionContext)
}
