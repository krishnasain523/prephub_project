const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User=require("../models/userschema");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
       let user=await User.findOne({googleId: profile.id});
       if(!user)
       {
       user = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        picture:profile.photos[0].value
      };
    }
      return done(null, user);
    }
  )
);