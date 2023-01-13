const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://jishamvk:jishamvk123@cluster0.ow2lbjw.mongodb.net/ecommersapp1?retryWrites=true&w=majority')
// mongoose.connect('mongodb+srv://jisham:jisham@cluster0.mvywqf8.mongodb.net/ecommersapp?retryWrites=true&w=majority')
const Schema=mongoose.Schema;
const registration=new Schema({
    fristname:{type:String,required:true},
    lastname:{type:String,required:true},
    Email:{type:String,required:true},
    phonenumber:{type:Number},
    password:{type:String,required:true},
})
var Registrationdata=mongoose.model('Register_tb',registration,)
module.exports=Registrationdata;