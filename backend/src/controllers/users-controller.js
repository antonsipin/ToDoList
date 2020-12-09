require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const salt = process.env.saltRounds || 10

const serializeUser = (user) => {
  return {
    name: user.name,
    id: user.id,
    email: user.email
  }
}

const renderSignUp = (req, res) => {
  res.render('signUp')
}

const renderSignIn = (req, res) => {
  res.render('signIn')
}

const signUp = async (req, res) => {
  const { name, email, password } = req.body
  console.log('req.body >>>>>>>>>>', name, email, password)
  
  if (name && email && password) {
    try {
      const hashPassword = await bcrypt.hash(password, Number(salt))
      console.log('hashPassword:>>>>>>>', hashPassword);
      
      const newUser = new User({
        name,
        email,
        password: hashPassword
      })

      console.log('newUser:>>>>>>>>>', newUser)

      await newUser.save()

      req.session.user = serializeUser(newUser)

      console.log('req.session.user:>>>>>>>>>', req.session.user);
      console.log('serializeUser(newUser) >>>>>>>>>>>>>', serializeUser(newUser))

      res.redirect('/account')

    } catch (e) {

      console.log('e >>>>>>>>>', e);

      res.render('signUp', { error: 'User not found please try again'})
  }
  } else {

    res.render('signUp', {error: 'Missing Email or Password'})
}
}

const signIn = async (req, res) => {
  const { email, password } = req.body
  
  if (email && password) {
    try {
      const user = await User.findOne({ email }).lean()
      console.log('user >>>>>>>>>>>>>>>>>', user);
      if (user) {
        const validPassword = await bcrypt.compare(password, user.password)
        if (validPassword) {
          req.session.user = serializeUser(user)
          res.redirect('/account')
        } else {
           res.render('signIn', { error: 'Wrong Email or Password' })
        }
     } else {
        res.render('signIn', { error: 'Wrong Email or Password' })
      }
    } catch (e) {
      console.log('e >>>>>>>>>>>', e);
      res.render('signIn', { error: 'User not found please try again' })
    }
  } else {
    res.render('signIn', {error: 'Login or password missing, try again!'})
  }
}

const logOut = (req, res) => {
  req.session.destroy(function (err) {
    if (err) throw new Error(err)
    res.clearCookie(req.app.get('session cookie name'))
    return res.redirect('/')
  })
}

module.exports = {
  renderSignUp,
  renderSignIn,
  signUp,
  signIn,
  logOut,
}
