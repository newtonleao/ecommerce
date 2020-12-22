const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuidv1')
const { timeStamp } = require('console')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    about:{
        type:String
    },
    history: {
        type:Array,
        default:[]
    },
    salt: String,
    role: {
        type:Number,
        default:0
    }

},{timestamp:true})

userSchema.virtual('password')
.set(function(){
    this._password = this.password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods = {
    encryptPassword: function(password) {
        if(!password) return ''
        try{
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }
        catch(error){
            return error
        }
    }
}

module.exports = mongoose.model('User',userSchema)