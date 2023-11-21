const User = require('../models/userModel')

exports.addUser = async (req, res) => {
	try {
		const user = await User.create(req.body)
		res.status(200).json(user)
	} catch (error) {
		console.log(error.mesage)
		res.status(500).json({message: error.message})
	}
}

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({})
		res.status(200).json(users)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

exports.loginUser = async (req, res) => {
	const {login, password} = req.body
	
	try {
		const user = await User.login(login, password)
		res.status(200).json(user)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
	
}



