import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20, 
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type:String,
        required: true,
        min:6,
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type: String,
        max:50
    },
    city:{
        type: String,
        max: 50
    },
    from:{
        type: String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1, 2, 3]
    }
},
{timestamps: true}
);

const user = mongoose.model("user", userSchema)

export default user;