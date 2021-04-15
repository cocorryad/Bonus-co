const express = require ('express');
const router = express.Router();
const Moto = require ('./schema');

const app = express;

/*
router.get('/', async(req, res)=> {
    
    
    try { 
      const moto= await Moto.find();
        res.json(moto);
        }
     catch(err){
        res.status(400).send(err);
        }

  });

*/
    
module.exports = app;
module.exports = router;
