const express = require ('express');
const app = express() ;
const mongoose = require('mongoose');
const schema = require('./schema');
const bodyParser = require('body-parser');
const post = require ('./schema');
const path = require('path');
const router = express.Router();
const ejs = require('ejs');
const postsRoute = require('./posts');
const http = require('http');

function soso(puissance,statut,location) {
  if (puissance>=2000 
      && statut === 'particulier'
      && location==='Ile de france'){

      //bonus = puissance*(puissance/100)+400;
      return 900+400;
      
  }
  if (puissance>=2000 
    && statut ==='particulier' 
    && location==='Autre'){

    //bonus = puissance*(puissance/100);
    return 900;
    
}
  if (puissance>=2000 
    && statut === 'professionnel' 
    && location==='Autre'){

    //bonus =  puissance*(puissance/100);
    return  900;
    }
  
    if(2000<puissance<=10000 
      //&& puissance>=2000
      && statut === 'professionnel'
      && location === 'Ile de france'){  // a vérifier si pour entreprise ou seulement salarié.
      
     // bonus = 1500+puissance*(puissance/100);  // SI ENTREPRISE QUE 1500 SI MEME CHOSE ON AJOUTE PROFESSIONNEL
      return 1500+900;
  
}
     if (puissance <= 2000 
        &&location === 'Autre'
        && statut === 'particulier' 
      ){ 
      //bonus = 100;
      return 100;

      }

     if (location === 'Autre'
      && puissance <= 2000 
      && statut === 'professionnel' 
      ){ 
     // bonus = 100;
      return 100;

      }


      if (location === 'Ile de france'
      && puissance <= 2000 
      && statut === 'particulier' 
      ){ 
      //bonus = 100;
      return 100;

      }
      if (location === 'Ile de france'
      && puissance <= 2000 
      && statut === 'professionnel' 
      ){ 
      //bonus = 100;
      return 100;

      }



    
  else{
    return 0;
  }
      
  
  
      //alert("bonus est de "+bonus);
      
}
 
 app.set('view engine', 'ejs');
 app.use(express.json());
 app.use(express.static("public"));

app.use(express.urlencoded({
  extended : true
}));
  app.use('/posts', postsRoute)



  //ROUTES
 

 
//mogoose
const MongoClient = require('mongodb').MongoClient;
//const { request } = require('node:http');

const uri = "mongodb+srv://electriklab:gradiant@cluster0.nalxx.mongodb.net/hellowheels";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});  
   

//mongoose
mongoose.connect(uri, {useNewUrlParser: true} , ()=>
console.log('connected to db')
);

const schemabis = mongoose.Schema({
  puissance: Number,
  prix : Number,
  type : String,
  name: String
})

const moto = mongoose.model('moto',schemabis);

app.get('/resultat/', (req,res)=>{
  
  res.render('index2',{
    Bonus : req.query.bonus,
    //nvprix : req.query.prix - bonus 
  })
  
  
  
})

app.get('/', async(req,res)=>{
  const mt = new moto({
  puissance: "1400",
  prix: "2699",
  type: "scooter",
  name: "NQI+",

  });
  try { 
    const saved=await mt.save();
    
  } catch (error) {
    res.send(err);
    
  }
  moto.find({}, (err,motos)=>{
    console.log(motos);
    res.render('index',{
      motoList: motos,

      
      
    })
  })
})
//post conditions

app.post('/', async(req,res)=>{
let nvprix = 0;
let bonus = 0;
const location = req.body.location;
const name = req.body.name;
const statut = req.body.statut;
const power = name.split("-");
const puissance = power[1]; 
const prix = req.body.prix;
//const nom = power[0];
console.log(prix);
/*console.log(bonus);
console.log(location);
console.log(puissance);*/
bonus = soso(puissance,statut,location);
console.log(bonus)
console.log("le bonus est de " + bonus);
//console.log('le nom est ' + nom );


res.redirect('/resultat/?bonus=' + bonus );

/*const mo = mongoose.model('moto',schemabis);

   const m = await moto.findOne({mo.name : name });
   
        
   
    console.log(m);
      res.redirect('/resultat/?bonus=' + bonus + '?prix='+ motos.prix);
    console.log(req.body);
    
    

    /*render ('index2',{
      Bonus : bonus,
      nvprix : prix - bonus 
    })*/
        
    //const savedData= await moto.save()
    //res.send(savedData);
    
//catch(err){
    //res.status(400).send(err);
     

});


app.listen(process.env.PORT || 5000, ()=>{
    console.log('serveur a lécoute');
});


