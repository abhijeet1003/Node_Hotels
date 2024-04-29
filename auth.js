// created a separate file for auth and then call  {const passport = require("./auth");} inside server.js to keep code clean


const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; // username and pasword strategy
const Person = require("./models/Person");

// configure local strategy
// creating a verfication function to verify
passport.use(
    new LocalStrategy(async (USERNAME, password, done) => {
      try {
        const user = await Person.findOne({ username: USERNAME });
  
        //   done(error , user , info)  parameters of done
  
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password." });
        }
      } catch (error) {
        return done(error);
      }
    })
  );





  module.exports = passport;