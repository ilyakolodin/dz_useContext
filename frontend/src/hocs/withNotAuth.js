import * as React from 'react';
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../App'
 
export const RequireNotAuth = ({ children }) => {
	
	const { userName, setUserName, userPassword, setUserPassword } = useContext(userContext)

    if (userName) {
        return <Navigate to='/'/>
    }
	
    return children
}