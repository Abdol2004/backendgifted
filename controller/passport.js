const { log } = require("console");
const passport= require("passport");
const jwtPassport= require("passport-jwt");
const JwtStrategy= require("passport-jwt").Strategy;
const ExtractJwt= require("passport-jwt").ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User= require("../model/User")


module.exports= (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:6500/api/v5/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      let user= await User.findOne({googleId: profile.id})
      if (user) {
        return done(null, user)
      }else{
        const newUser= ({
          googleId: profile.id,
          googleDisplayName: profile.displayName,
        })
        user= await User.create(newUser)
        return done(null, user)
      }
    } catch (error) {
      console.log(error)
    }
   
  }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

  
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.secret_key;
  
  opts.secretOrKey = process.env.secret_key;
  
  
  opts.secretOrKey = process.env.secret_key;
  
  
  passport.use(
      new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
          const user = await User.findById(jwt_payload.id);
    
          if (!user) {
            return done(null, false);
          }
    
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      })
  );
}

