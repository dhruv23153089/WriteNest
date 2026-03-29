import React from 'react'
import {useSelector} from "react-redux"
import { Navigate } from "react-router-dom"

export default function AuthLayout({children, authentication = true}) {
    const authStatus = useSelector((state) => state.auth.status);

    const isAuthorized = authentication ? authStatus : !authStatus;

    if (!isAuthorized) {
        return <Navigate to={authentication ? "/login" : "/"} replace />;
    }

    return children;

}
