const express = require("express");
const { ToysModel, validateToy } = require("../models/ToysModel");
const { auth } = require("../middlewares/auth")
const router = express.Router();

router.get("/", async (req, res) => {
    try {

        const skip = req.query.skip;

        const data = await ToysModel.find({})
        .limit(10)
        .skip(skip)

        res.json(data).status(200);

    } catch (error) {
        res.json("server error").status(400);
        console.error(error);
    }
    
});

router.get("/search",async (req,res) =>{
    try {
        const skip = req.query.skip;
        const s = req.query.s;

        const data = await ToysModel.find({$or: [
            { name: { $regex: s, $options: 'i' } },
            { info: { $regex: s, $options: 'i' } }
          ]})
        .limit(10)
        .skip(skip)

        res.json(data).status(200);

        
    } catch (error) {
        res.json("server error").status(400);
        console.error(error);
    }
});

router.get("/category/:catname",async (req,res) =>{
    try {

        const skip = req.query.skip;
        const category = req.params.catname;

        const data = await ToysModel.find({category:category})
        .limit(10)
        .skip(skip)

        res.json(data).status(200);

        
    } catch (error) {
        res.json("server error").status(400);
        console.error(error);
    }
});

router.get("/prices",async(req,res)=>{
    const skip = req.query.skip;
    const min = req.query.min || 0;
    const max = req.query.max || 10000;

    try {
        const data = await ToysModel.find({$and:[
            {price:{$gte:min}},
            {price:{$lt:max}}
        ]})
        .limit(10)
        .skip(skip)

        res.json(data)
    } catch (error) {
        res.json("server error").status(400);
        console.error(error);
    }

});

router.get("/single/:id",async(req,res)=>{

    const id = req.params.id;

    try {
        const data = await ToysModel.findOne({_id:id});

        res.json(data);
        
    } catch (error) {
        res.json("server error").status(400);
        console.error(error);
    }

});

router.post("/",auth,async (req,res)=>{
    const user_id = req.tokenData._id;

    const valid = validateToy(req.body);

    if(valid.error) return res.json(valid.error.details).status(400);

    try {
        const newToy = new ToysModel(req.body);

        newToy.user_id = user_id;

        newToy.save();

        res.json(newToy).status(200);
        
    } catch (error) {
        res.json("server error").status(400);
        console.error(error);
    }
});

router.put("/:id",auth,async (req,res)=>{
    const id = req.params.id;

    const valid = validateToy(req.body);
    if(valid.error) return res.json(valid.error.details).status(400);

    try {
        const updatedToy = await ToysModel.findOneAndUpdate(
            {_id:id,user_id:req.tokenData._id},
            req.body,
            {new:true,runValidators:true}
        );

        if (!updatedToy) {
            return res.status(404).json({ message: "Toy not found" });
        }

        res.json(updatedToy).status(200);

        
    } catch (error) {
        res.json("server error").status(400);
        console.error(error);
    }
});

router.delete("/:id",auth,async(req,res)=>{

    const id = req.params.id;

    try {
        const deleted = await ToysModel.deleteOne({_id:id,user_id:req.tokenData._id});

        if(!deleted.acknowledged){
            return res.json("no user owned toy with that id").status(400);
        }

        return res.json(deleted);
    
    } catch (error) {
        res.json("server error").status(400);
        console.error(error);
    }

});

module.exports = router;

