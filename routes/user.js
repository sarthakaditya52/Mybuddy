const express = require("express");
var router = express.Router({ mergeParams: true }),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    fs = require('fs'),
    path = require('path'),
    User =require('../models/user'),
    Invite =require('../models/invite'),
    dotenv = require('dotenv');
dotenv.config();

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

// @route to post new user
router.post('/user/new',(req,res)=>{
    User.findOne({email:req.body.email},(err,fuser)=>{
        if(err){
            res.send(err);
        }else{
            if(fuser==null){
                const user={
                    username:req.body.name,
                    email:req.body.email
                }
                User.create(user,(err,nuser)=>{
                    if(err){
                        res.send(err);
                    }else{
                        res.json({
                            user: nuser,
                            newU: true
                        });
                    }
                })
            }else{
                var status = false;
                if(fuser.qa.length < 1)
                    status = true;
                res.json({
                    user: fuser,
                    newU: status
                });
            }
        }
    })
})

// @route to render form to a user
router.get('/user/form/:id',(req,res)=>{
    User.findOne({_id:req.params.id},(err,fuser)=>{
        if(err){
            res.send(err);
        }else{
            if(fuser!=null){
                if(fuser.qa==[]){
                    res.render('user/form',{id:fuser._id});
                }else{
                    res.redirect('/user/share/'+fuser._id);
                }
                
            }else{
                req.flash("error","please enter details");
                res.redirect('/');
            }
        }
    })
})

// @route to post form data for a user
router.post('/user/form/:id',(req,res)=>{
    console.log(req.params.id)
    User.findOne({_id:req.params.id},(err,fuser)=>{
        if(err){
            res.send(err);
        }else{
            if(fuser!=null){
                fuser.qa=req.body.qa;
                console.log(fuser)
                fuser.save();
                res.redirect('/user/share/'+fuser._id);
            }else{
                res.redirect('/');
            }
        }
    })
})

// @share page for user
router.get('/user/share/:id',(req,res)=>{
    User.findOne({_id:req.params.id},(err,fuser)=>{
        if(err){
            res.send(err);
        }else{
            if(fuser!=null){
                Invite.find({userid:req.params.id},(err,finvites)=>{
                    if(err){
                        res.send(err);
                    }else{
                        // res.render('share page')
                    }
                })
            }
        }
    })
})
// @route to delete quiz and start new quiz
router.post('/user/delete/:id',(req,res)=>{
    User.findOne({_id:req.params.id},(err,fuser)=>{
        if(err){
            res.send(err);
        }else{
            fuser.qa=[];
            fuser.sharelink="";
            fuser.save();
            Invite.remove({userid:req.params.id},(err)=>{
                if(err){
                    res.send(err);
                }else{
                    res.redirect('/user/form/'+fuser._id);
                }
            })
        }
    })
})

// @route to delete scoreboard row for user
router.post('/user/delete/invite/:inviteid/:uid',(req,res)=>{
    Invite.remove({_id:req.params.inviteid},(err)=>{
        if(err){
            res.send(err);
        }else{
            res.redirect('/user/share/'+req.params.uid);
        }
    })
})









module.exports =router;