import * as React from 'react'
import { userContext } from '../../App'
import { useContext } from 'react'

function Content() {
	
	const { userName, setUserName, userPassword, setUserPassword } = useContext(userContext)
	
	function handleExit() {
		setUserName(null)
		localStorage.setItem('user', null)
		setUserPassword(null)
		localStorage.setItem('password', null)
	}
 	return (
		<>
			<h1>Содержание</h1>
			<button onClick={handleExit}>Выйти</button>
		</>
	)
}

export default Content