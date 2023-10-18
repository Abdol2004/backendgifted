const express= require("express");
const bodyParser= require("body-parser")
const router = express.Router();
const {regUser, logUser}= require("../controller/auth");
const passport= require("passport")


router.route("/signup").post(regUser)
router.route("/signin").post(logUser)
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router ;