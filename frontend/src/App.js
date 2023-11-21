import React from "react"
import { Link, Routes, Route } from 'react-router-dom'
import { RequireAuth } from './hocs/withAuth'
import { RequireNotAuth } from './hocs/withNotAuth'
import { Login, Content } from './pages'
import { useState, useEffect } from 'react'

const ROUTES = {
	main: '/',
	login: '/login',
}

export const userContext = React.createContext()

export function App() {
	
	const [userName, setUserName] = useState(localStorage.getItem('user'))
	const [userPassword, setUserPassword] = useState(localStorage.getItem('password'))
		
	useEffect(() => {
        fetch("http://localhost:3000/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
				login: userName,
				password: userPassword,
			})
        }).then((response) => {
			if (response.ok) {
				return response.json()
			}
			throw new Error('Something went wrong')
		}).then(data => {
			setUserName(data.login)
			localStorage.setItem('user', data.login)
			setUserPassword(data.password)
			localStorage.setItem('password', data.password)
		}).catch(error => {
			setUserName(null)
			localStorage.setItem('user', null)
			setUserPassword(null)
			localStorage.setItem('password', null)
		})
    }, [])
	
	return (
		<userContext.Provider value={{ userName, setUserName, userPassword, setUserPassword }}>
			<div>
				{ /* <ul>
					<li><Link to={ ROUTES.login }>Логин</Link></li>
					<li><Link to={ ROUTES.main }>Контент</Link></li>
				</ul> */ }
				<Routes>
					<Route path={ ROUTES.main } element={
							<RequireAuth>
								<Content />
							</RequireAuth>
						} />
					<Route path={ ROUTES.login } element={
							<RequireNotAuth>
								<Login />
							</RequireNotAuth>
						} />
				</Routes>
			</div>
		</userContext.Provider>
	)
}
