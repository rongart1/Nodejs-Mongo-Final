const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name:String,
  info:String,
  category:String,
  img_url:String,
  price:Number,
  user_id:String
},{timestamps:true})

exports.ToysModel = mongoose.model("toys",schema);

exports.validateToy = (_reqBody) => {
  const joiSchema = Joi.object({
    name:Joi.string().min(2).max(30).required(),
    info:Joi.string().min(2).max(200).required(),
    category:Joi.string().min(2).max(20).required(),
    img_url:Joi.string().min(2),
    price:Joi.number().min(1).max(999999).required()
  })
  return joiSchema.validate(_reqBody);
}