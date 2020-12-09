const isAuth = (req, res, next) => {
  if (req.session.user) {
    return next()
  }
  res.redirect ('/users/signin')
}

const userName = (req,res,next)=> {
  if (req.session.user){
    res.locals.userName = req.session.user.name
console.log(res.locals.userName)
  }
    
 next()
}

module.exports ={
    isAuth,
    userName
} 
