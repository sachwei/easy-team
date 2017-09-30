/**
 * Created by sachuangwei on 2017/8/18.
 */
export default {
    getClientHeight(){
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    },
    fillZero(number, digits){
        number = String(number);
        var length = number.length;
        if(number.length<digits){
            for(var i=0;i<digits-length;i++){
                number = "0"+number;
            }
        }
        return number;
    },
    // 日期格式化，传入毫秒
    formatDate(date) {
        // 获取js 时间戳
        let curDate = new Date();
        let time = new Date().getTime();
        // 去掉 js 时间戳后三位，与php 时间戳保持一致
        time = parseInt((time - date) / 1000, 10);

        // 存储转换值
        let s;
        let date1 = new Date(date);
        // 1分钟内
        if (time < 60) {
          return '刚刚';
        } else if ((time < 60 * 60 * 24) && (time > 60) && date1.getDay() === curDate.getDay()) {
          // 当天，超过1分钟少于1天
          s = fillZero(date1.getHours(), 2) + ':' + fillZero(date1.getMinutes(), 2);
        } else {
          // 当前年超过一天
          if (date1.getFullYear() === curDate.getFullYear()) {
            s = fillZero(date1.getMonth() + 1, 2) + '-' + fillZero(date1.getDate(), 2);
          } else {
            // 其他年超过一天
            s = String(date1.getFullYear()).substr(2) + '-' + fillZero(date1.getMonth() + 1, 2) + '-' + fillZero(date1.getDate(), 2);
          }
        }
        return s;
    }
}
