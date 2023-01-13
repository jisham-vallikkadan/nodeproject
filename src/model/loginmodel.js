


const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://jishamvk:jishamvk123@cluster0.ow2lbjw.mongodb.net/ecommersapp1?retryWrites=true&w=majority')

const Schema=mongoose.Schema;

const LoginTable=new Schema({
    email:String,
    password:String,
});

var Logindata=mongoose.model('Login_tb',LoginTable)
module.exports=Logindata;