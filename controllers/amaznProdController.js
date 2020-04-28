const products = require('../models/Amaznprod');
const _=require('lodash');



let getAllprods = (req,res)=>{
    products.find({},(err, prods)=>{
        if(err) console.log(err);
        else{
            res.json({status:true, prods})
        }
    })
}

let categories = (req, res)=>{
 
    let categoryNames=[];
    products.find({},(err, prods)=>{
        if(err) console.log(err);
        else{
            
            for(let i=0; i<prods.length; i++){
                
                let oneCat = prods[i].category
                categoryNames.push(oneCat)
                
                
            }
            let filteredName = categoryNames.filter( function( item, index, inputArray ) {
                return inputArray.indexOf(item) == index;
            });
            
            for(let i=0; i<filteredName.length; i++){
                var cato={ "catergoryName":"", "count":""}, categoryArr=[]
                products.count({"category":filteredName[i]})
                .then(count=>{
                    console.log(filteredName[i] ,count)
                    cato={ "catergoryName":filteredName[i], "count":count}
                    
                    categoryArr.push(cato)
                    console.log(categoryArr)
                    if(i +1 == filteredName.length){
                        res.json({status:true, categoryArr})
                    }
                    
                })
               
                
                
            }
                 
                //res.json({status:true, catName, catObj})
        }
        
    })
}

let categoricalProds =(req, res)=>{
    if(req.query.cat){
    products.find({"category":req.query.cat})
    .then(resu=>{
        console.log(resu)
        res.json({status:true, resu})
    })
}else{
    products.find({})
    .then(resu=>{
        res.json({status:true, resu})
    })
}
}

//let test= (req, res)=>{}

module.exports = {getAllprods, categories, categoricalProds}