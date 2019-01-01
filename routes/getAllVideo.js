var express = require('express');
var router = express.Router();

var fs = require('fs');

var fileIndex=0,dirIndex=0;
var vodeoListArr = [];
var vodeoListlist = [];
var level = 1;
function fileInDir(url,arr,listArr){
    var obj = {};
    obj[url] = [];
    obj['name'] = url;
    obj['children']=[];
    obj['level']=level;
    level++;
    arr.forEach(function (file) {
        let stat = fs.statSync(url+"\\"+file);
        if(stat.isFile()){
            fileIndex++;
            listArr.push(file);
            obj[url].push(file);

        }else if(stat.isDirectory()){
            dirIndex++;
            var str = url+"\\"+file;
            obj['children'].push(str);

            fileInDir(str,fs.readdirSync(str),listArr)

        }
    })
    vodeoListlist.push(obj);
}



/* GET home page. */
router.get('/', function(req, res, next) {
    
    let str =decodeURI(req._parsedUrl.query);
    console.log(str)

    fileIndex=0; 
    dirindex=0; 
    vodeoListArr = []; 
    vodeoListlist = []; 
    level = 1; 
    //var url = 'F:\\迅雷下载';
    var url = str;

    fileIndex=0,dirIndex=0;
    try{
        let allList=fs.readdirSync(url);
        console.log(allList)
        fileInDir(url,allList,vodeoListArr)
        vodeoListArr.push(dirIndex)
        vodeoListArr.push(fileIndex)
    }catch (e) {
        console.log(e)
    }


    res.send(vodeoListlist)
});

module.exports = router;
