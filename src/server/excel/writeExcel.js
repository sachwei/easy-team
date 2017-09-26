/**
 * Created by sachuangwei on 2017-05-21.
 */
var workRecords = require('../database/db').workRecords;
var xlsx = require('node-xlsx');
var fs = require('fs');

var obj = xlsx.parse(__dirname + '/data/11.xlsx');
var excelObj = obj[0].data;
console.log(excelObj);

var data = [];
for(var i in excelObj){
    var arr=[];
    var value=excelObj[i];
    for(var j in value){
        arr.push(value[j]);
    }
    data.push(arr);
}
var buffer = xlsx.build([
    {
        name:'sheet1',
        data:data
    }
]);

//将文件内容插入新的文件中
fs.writeFileSync('test1.xlsx',buffer,{'flag':'w'});