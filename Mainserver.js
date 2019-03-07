var express = require('express');
var bodyparser = require('body-parser');
var cors = require("cors");
var app = express();
app.use(cors());
app.use(bodyparser.json());
const port=process.env.PORT||3000;

var logs=[];
var tub=[];
var users=[];


app.post('/setUser', (req, res) => {
    tub.push({
        user: req.body.user,
        imb: []
    });
    console.log(tub);
    console.log(req.body.user+" joined Stream");
    res.send("You Have Successfully Joined Stream");
    logs.push("Time=>" + String(new Date()) + " ====>User " + req.body.user + " Joined Stream");
});

app.post('/sendmsg', (req, res) => {
    console.log(req.body.msg,req.body.user+" sendmsg");
    var l=tub.length;
    for(var i=0;i<l;i++)
    {
        if(tub[i].user!==req.body.user)
        {
            tub[i].imb.push({msg:req.body.msg,user:req.body.user});
            console.log(tub[i].imb);
        }
    }
    
    res.send("Message Echoed To everyone Connected");
    }, (e) => {
        //console.log("Sorry problem sending message "+e)
        logs.push("Time=>" + String(new Date()) +" ====>Sorry problem sending message from post");
    });

app.get('/getmsg', (req, res) => {
        var l=tub.length;
        for(var x=0;x<l;x++)
        {
            if(tub[x].user===req.query.user)
            {   
                if(tub[x].imb.length!==0)
                {
                    res.send(tub[x].imb);
                    console.log(tub[x].user+ "sended=>  " + tub[x].imb);
                    tub[x].imb=[];
                }
                else
                res.send([]);
                {
                }
                break;
            }

        }
}, (e) => {
    //console.log("Sorry problem sending message " + e)
    logs.push("Time=>" + String(new Date()) +"===>Sorry problem sending message from get")
});

app.get('/serverinfo',(req,res)=>{
    res.send(logs);
    logs=[];
},(e)=>{
    console.log("Problem Connecting"+e);
});

app.listen(port,()=>{
    logs.push("Time=>" + String(new Date()) +"===>Server is Live Since then...")
    console.log("Server is Live ...");
})

