import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { userContext } from '../../App'

function Login() {
	
	const { userName, setUserName, userPassword, setUserPassword } = useContext(userContext)
	
	const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm();
	
	const {
		register: register2,
		formState: { errors: errors2 },
		handleSubmit: handleSubmit2,
		reset: reset2
	} = useForm()
	
	const onSubmit = handleSubmit((data) => {
        fetch("http://localhost:3000/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
			reset()
		})
    })
	
	const onSubmitRegistration = handleSubmit2((data) => {
		fetch("http://localhost:3000/signup", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
			if (response.ok) {
				alert("Регистрация прошла успешно")
			}
			else {
				alert("Ошибка регистрации")
			}
			reset2()
		})
	})


	return (
		<>
			<form action="#" onSubmit={onSubmit}>
				<h1>Войти</h1>
				<input {...register("login", {
						required: "Поле обязательно к заполнению",
						minLength: {
							value: 2,
							message: "Введите больше 1 символов"
						},
						maxLength: {
							value: 20,
							message: "Введите менее 20 символов"
						},
						pattern: {
							value: /^[a-zA-Z0-9]+$/,
							message: "Только цифры и английские буквы"
						},
					})}
					placeholder="Логин"
				/>
				<div>{errors?.login && <p>{errors.login.message}</p>}</div>
				<input
					{...register("password", {
						required: "Поле обязательно к заполнению",
						pattern: {
							value: /^[a-z0-9_\-*]+$/,
							message: "Только цифры и маленькие английские буквы и _-*"
						},
					})}
					type="password"
					placeholder="Пароль"
				/>
				<div>{errors?.password && <p>{errors.password.message}</p>}</div>
				<button type="submit">Войти</button>
			</form>
			
			{/* Регистрация */}
			<form action="#" onSubmit={onSubmitRegistration}>
				<h1>Регистрация</h1>
				<input {...register2("login", {
						required: "Поле обязательно к заполнению",
						minLength: {
							value: 2,
							message: "Введите больше 1 символов"
						},
						maxLength: {
							value: 20,
							message: "Введите менее 20 символов"
						},
						pattern: {
							value: /^[a-zA-Z0-9]+$/,
							message: "Только цифры и английские буквы"
						},
					})}
					placeholder="Логин"
				/>
				<div>{errors2?.login && <p>{errors2.login.message}</p>}</div>
				<input
					{...register2("password", {
						required: "Поле обязательно к заполнению",
						pattern: {
							value: /^[a-z0-9_\-*]+$/,
							message: "Только цифры и маленькие английские буквы и _-*"
						},
					})}
					type="password"
					placeholder="Пароль"
				/>
				<div>{errors2?.password && <p>{errors2.password.message}</p>}</div>
				<button type="submit">Регистрация</button>
			</form>
		</>
	)
}

export default Login