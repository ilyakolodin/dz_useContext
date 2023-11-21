const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        login: String,
		password: String
    },
    {
        timestamps: true
    }
)

userSchema.statics.login = async function(login, password) {

  if (!login || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ login })
  
  if (!user) {
    throw Error('Incorrect login')
  }
  
  if (password !== user.password) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)