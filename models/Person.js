const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
// Define the Person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    type: String,
  },
});


// pre is used just before saving
personSchema.pre('save',async function(next){
    const person = this;
    
    // has the password been modedfied earlier or not and its new
    if(!person.isModified('password')) return next();
    try {

        
        // hash password generate
        const salt = await bcrypt.genSalt(10);

        // hash
        const hashpassword = await bcrypt.hash(person.password,salt);
        // overridding the password
        person.password = hashpassword;


        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
try {
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
} catch (error) {
    throw error;
}}


// Create Person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
