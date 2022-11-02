import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    region: { type: String },
    location: { type: String },
    lat: { type: Number },
    lng: { type: Number }
});


export const User = mongoose.model('User', userSchema);