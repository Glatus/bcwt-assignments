"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const { getUserLogin } = require("../models/userModel");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
// local strategy for username password login
passport.use(
    new Strategy(async (username, password, done) => {
        const params = [username];
        console.log(params);
        try {
            const [user] = await getUserLogin(params);
            console.log("Local strategy", user); // result is binary row
            if (user === undefined) {
                return done(null, false, { message: "Incorrect email." });
            }
            if (user.password !== password) {
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, { ...user }, { message: "Logged In Successfully" }); // use spread syntax to create shallow copy to get rid of binary row type
        } catch (err) {
            return done(err);
        }
    })
);

// TODO: JWT strategy for handling bearer token
// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
},
    async (jwtPayload, done) => {
        console.log("user from token", jwtPayload);
        try {
            const user = await getUserById(jwtPayload.user_id)
            return done(null, user);
        } catch (error) {
            return done(error)
        }
        return done(null, jwtPayload);
    }
));
module.exports = passport;
