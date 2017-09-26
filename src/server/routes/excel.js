/**
 * Created by sachuangwei on 2017-05-27.
 */
var express = require('express');
var router = express.Router();
var nodeExcel = require('excel-export');
var Mongodb = require('../database/mongodb');

/**
 * 导出指定月份调休记录
 */
router.post('/downloadFile', function(req, res){
    var param = req.body;
    var fileName = '企业互联网项目组加班调休-' + param.year + '-' + param.month + '.xlsx';
    var startDate = new Date(param.year, param.month - 1, 1, 0, 0, 0);
    var endDate = new Date(param.year, param.month - 1, 31, 23, 59, 59);
    console.log(param.month);

    Mongodb.find('workRecords', {"workDate": {'$gte': startDate, '$lte': endDate}}, {}).sort({"userName":1}).find(function(err, docs){
        var records = docs;
        var rowDatas = [];
        var curUserName = '', preUserName = '';
        var index = 1;
        var totalWorkDays = 0, totalWorkOffDays = 0;
        var workInfos = '';
        var row = [];
        var workDate, dateFormat;

        for(var i = 0, len = records.length; i < len; i++){

            if(curUserName === ''){
                curUserName = records[i].userName;
            } else if(curUserName !== records[i].userName){
                preUserName = curUserName;
                curUserName = records[i].userName;

                row.push(index);
                row.push(records[i - 1].userCnName);
                row.push(records[i - 1].workNum);
                row.push(workInfos);
                row.push(totalWorkDays);
                row.push(totalWorkOffDays);
                rowDatas.push(row);

                row = [];
                index = index + 1;
                totalWorkDays = 0;
                totalWorkOffDays = 0;
                workInfos = '';
            }

            ++totalWorkDays;
            totalWorkOffDays = totalWorkDays / 2;
            workDate = new Date(records[i].workDate);
            dateFormat = (workDate.getMonth() + 1) + '月' + workDate.getDate() + '日/';
            workInfos = workInfos + dateFormat + records[i].workNote + '\n';

            if(i === len - 1){
                row.push(index);
                row.push(records[i].userCnName);
                row.push(records[i].workNum);
                row.push(workInfos);
                row.push(totalWorkDays);
                row.push(totalWorkOffDays);
                rowDatas.push(row);
            }

        }

        var conf ={};
        conf.stylesXmlFile = "styles.xml";
        conf.name = "mysheet";
        conf.cols = [{
            caption:'序号',
            type:'number'
        },{
            caption:'姓名',
            type:'string'
        },{
            caption:'工号',
            type:'number'
        },{
            caption:'加班日期/内容',
            type:'string'
        },{
            caption:'合计加班天数',
            type:'number'
        },{
            caption:'申请调休天数',
            type:'number'
        }];
        conf.rows = rowDatas;
        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + 'fileName.xlsx');
        res.end(result, 'binary');
    });
});

module.exports = router;