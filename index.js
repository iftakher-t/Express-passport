const express = require ('express')
const multer = require ('multer')
const ejs = require ('ejs')
const path = require ('path')

// Set storage engine
const storage = multer.diskStorage({
    destination : './public/uploads/',
    filename : (req,file ,cb)=>{
    cb(null, file.fieldname + '-' + 
    Date.now()
     + path.extname(file.originalname))
}
})
// Init upload
const upload = multer({
    storage: storage,
    limits : {
        fileSize : 10
    }
}).single('myImage')

// Init app
const app =express()
// EJS
app.set('view engine', 'ejs')

//Public folder
app.use(express.static('./public'))

app.get('/', (req,res)=> res.render('index'))

app.post('./uploads' , (req,res)=>{
    uploads(req,res, (err)=>{
        if(err){
            res.render('index', {
                msg : err
            })
        }else{
            console.log(req.file)
            res.send('test')
        }
    })
})
const port = 3000
app.listen(port, ()=>{
    console.log(` Server started on ${port}.`)
})