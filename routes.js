const express = require('express')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

const route = express.Router()

route.get('/teste', (req, res) => {
	console.log('teste teste')

	var form = new formidable.IncomingForm();
	console.log('teste pra ver se passa saporra1')

    form.parse(req, function(err, fields, files) {
      if (err) {
        console.error(err.message);
        return;
	  }
	//   var teste = fs.createWriteStream('\\pathtest')

	  //util.inspect({fields: fields, files: files})	  
    });
	res.render('teste')
})
route.get('/testdrag', (req,res) => {
	res.render('testdrag')
})
route.get('/*', (req, res) => {
	console.log('teste 0')
	data = {dir: JSON.stringify(__dirname), parent: JSON.stringify(path.parse(__dirname).dir)}
	res.render('index', data)
})
route.post('/download', (req,res) => {
    fs.createReadStream(req.body.path).pipe(res)
})
route.post('/upload', (req,res) => {
	const form = formidable({multiples: true}); 
    form.parse(req, function(err, fields, files){ 
  
		if(files['fileselect'].length)
		{
		files['fileselect'].forEach(f => {
			var oldPath = f.path;
			var rawData = fs.readFileSync(oldPath) 		  
			fs.writeFile(path.join('teste', f.name), rawData, function(err){ 
				if(err) console.log(err) 
				return true 
			}) 			
		})		
		}
		else
		{
			var oldPath = files['fileselect'].path;
			var rawData = fs.readFileSync(oldPath) 		  
			fs.writeFile(path.join(files['fileselect'].name), rawData, function(err){ 
				if(err) console.log(err) 
				return true 
			})			
		}
  }) 	  
  res.render('index', data)
    })

module.exports = route