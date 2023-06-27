const fsPromise = require('fs').promises
const path = require('path')
const fs = require('fs')


const rename = async ()=>{
    try{
        await fsPromise.rename(path.join(__dirname, 'copy.docs'),path.join(__dirname, 'promises.txt'))
    }catch(err){
        console.log(err)
    }
}

rename()