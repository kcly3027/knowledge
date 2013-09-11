//为日期型数据加格式化（yyyy-MM-dd hh:mm:ss）
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
//原生JavaScript全角转换成半角函数
function ToCDB(str){
  var result = '';
  for(var i=0; i < str.length; i++){
    code = str.charCodeAt(i);
    if(code >= 65281 && code <= 65374){
      result += String.fromCharCode(str.charCodeAt(i) - 65248);
    }else if (code == 12288){
      result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
    }else{
      result += str.charAt(i);
    }
  }
 return result;
}
//原生JavaScript半角转换为全角函数
function ToDBC(str){
  var result = '';
  for(var i=0; i < str.length; i++){
    code = str.charCodeAt(i);
    if(code >= 33 && code <= 126){
      result += String.fromCharCode(str.charCodeAt(i) + 65248);
    }else if (code == 32){
      result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
    }else{
      result += str.charAt(i);
    }
  }
 return result;
}
//原生JavaScript获取浏览器版本号
function browserVersion(types) {
    var other = 1;
    for (i in types) {
        var v = types[i] ? types[i] : i;
        if (USERAGENT.indexOf(v) != -1) {
            var re = new RegExp(v + '(\\/|\\s|:)([\\d\\.]+)', 'ig');
            var matches = re.exec(USERAGENT);
            var ver = matches != null ? matches[2] : 0;
            other = ver !== 0 && v != 'mozilla' ? 0 : other;
        } else {
            var ver = 0;
        }
        eval('BROWSER.' + i + '= ver');
    }
    BROWSER.other = other;
}
//原生JavaScript判断IE版本号
var _IE = (function(){
    var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : false ;
}());
//原生JavaScript获取窗体可见范围的宽与高
function getViewSize(){
    var de=document.documentElement;
    var db=document.body;
    var viewW=de.clientWidth==0 ?  db.clientWidth : de.clientWidth;
    var viewH=de.clientHeight==0 ?  db.clientHeight : de.clientHeight;
    return Array(viewW ,viewH);
}
//原生JavaScript实现utf8解码
function utf8_decode(str_data){
    var tmp_arr = [],i = 0,ac = 0,c1 = 0,c2 = 0,c3 = 0;str_data += '';
    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 > 191 && c1 < 224) {       
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    } 
    return tmp_arr.join('');
}
//原生JavaScript实现base64解码
function base64_decode(data){
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,ac = 0,dec = "",tmp_arr = [];
    if (!data) { return data; }
    data += '';
    do { 
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
    dec = tmp_arr.join('');
    dec = utf8_decode(dec);
    return dec;
}
//原生JavaScript判断变量是否空值
/**
 * 判断变量是否空值
 * undefined, null, '', false, 0, [], {} 均返回true，否则返回false
 */
function empty(v){
    switch (typeof v){
        case 'undefined' : return true;
        case 'string'    : if(trim(v).length == 0) return true; break;
        case 'boolean'   : if(!v) return true; break;
        case 'number'    : if(0 === v) return true; break;
        case 'object'    : 
            if(null === v) return true;
            if(undefined !== v.length && v.length==0) return true;
            for(var k in v){return false;} return true;
            break;
    }
    return false;
}
//原生JavaScript用正则清除空格分左右
function ltrim(s){ return s.replace( /^(\s*|　*)/, ""); } 
function rtrim(s){ return s.replace( /(\s*|　*)$/, ""); } 
function trim(s){ return ltrim(rtrim(s));} 
//原生JavaScript实现窗体改变事件resize的操作（兼容所以的浏览器）
(function(){
    var fn = function(){
        var w = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth
            ,r = 1255
            ,b = Element.extend(document.body)
            ,classname = b.className;
        if(w < r){
            //当窗体的宽度小于1255的时候执行相应的操作
        }else{
            //当窗体的宽度大于1255的时候执行相应的操作
        }
    }
    if(window.addEventListener){
        window.addEventListener('resize', function(){ fn(); });
    }else if(window.attachEvent){
        window.attachEvent('onresize', function(){ fn(); });
    }
    fn();
})();
//原生JavaScript常用的正则表达式大收集
//匹配中文字符的正则表达式： [\u4e00-\u9fa5] 
//匹配双字节字符（包括汉字在内）：[^\x00-\xff] 
//匹配空行的正则表达式：\n[\s| ]*\r 
//匹配 HTML 标记的正则表达式：<(.*)>.*<\/\1>|<(.*) \/>
//匹配首尾空格的正则表达式：(^\s*)|(\s*$) 
//匹配 IP 地址的正则表达式：/(\d+)\.(\d+)\.(\d+)\.(\d+)/g
//匹配 Email 地址的正则表达式：\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
//匹配网址 URL 的正则表达式：http://(/[\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
//sql 语句：^(select|drop|delete|create|update|insert).*$ 
//非负整数：^\d+$ 
//正整数：^[0-9]*[1-9][0-9]*$ 
//非正整数：^((-\d+)|(0+))$ 
//负整数：^-[0-9]*[1-9][0-9]*$ 
//整数：^-?\d+$ 
//非负浮点数：^\d+(\.\d+)?$ 
//正浮点数：^((0-9)+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$ 
//非正浮点数：^((-\d+\.\d+)?)|(0+(\.0+)?))$ 
//英文字符串：^[A-Za-z]+$ 
//英文大写串：^[A-Z]+$ 
//英文小写串：^[a-z]+$ 
//英文字符数字串：^[A-Za-z0-9]+$ 
//英数字加下划线串：^\w+$ 
//E-mail地址：^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$ 
//URL：^[a-zA-Z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\s*)?$ 或：^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$ 
//邮政编码：^[1-9]\d{5}$ 
//电话号码：^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$ 
//手机号码：^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$ 
//双字节字符（包括汉字在内）：^\x00-\xff 
//匹配首尾空格：(^\s*)|(\s*$)
//匹配 HTML 标记：<(.*)>.*<\/\1>|<(.*) \/> 
//匹配空行：\n[\s| ]*\r 
//提取信息中的网络链接：(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
//提取信息中的邮件地址：\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)* 
//提取信息中的图片链接：(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
//提取信息中的 IP 地址：(\d+)\.(\d+)\.(\d+)\.(\d+) 
//提取信息中的中国手机号码：(86)*0*13\d{9} 
//提取信息中的中国固定电话号码：(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8} 
//提取信息中的中国电话号码（包括移动和固定电话）：(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14} 
//提取信息中的中国邮政编码：[1-9]{1}(\d+){5} 
//提取信息中的浮点数（即小数）：(-?\d*)\.?\d+ 
//提取信息中的任何数字 ：(-?\d*)(\.\d+)? 
//IP：(\d+)\.(\d+)\.(\d+)\.(\d+) 
//电话区号：^0\d{2,3}$
//腾讯 QQ 号：^[1-9]*[1-9][0-9]*$ 
//帐号（字母开头，允许 5-16 字节，允许字母数字下划线）：^[a-zA-Z][a-zA-Z0-9_]{4,15}$ 
//中文、英文、数字及下划线：^[\u4e00-\u9fa5_a-zA-Z0-9]+$

//原生JavaScript实现金额大写转换函数
function transform(tranvalue) {
  try {
    var i = 1;
    var dw2 = new Array("", "万", "亿"); //大单位
    var dw1 = new Array("拾", "佰", "仟"); //小单位
    var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用
    //以下是小写转换成大写显示在合计大写的文本框中     
    //分离整数与小数
    var source = splits(tranvalue);
    var num = source[0];
    var dig = source[1];
    //转换整数部分
    var k1 = 0; //计小单位
    var k2 = 0; //计大单位
    var sum = 0;
    var str = "";
    var len = source[0].length; //整数的长度
    for (i = 1; i <= len; i++) {
      var n = source[0].charAt(len - i); //取得某个位数上的数字
      var bn = 0;
      if (len - i - 1 >= 0) {
        bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
      }
      sum = sum + Number(n);
      if (sum != 0) {
        str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
        if (n == '0') sum = 0;
      }
      if (len - i - 1 >= 0) { //在数字范围内
        if (k1 != 3) { //加小单位
          if (bn != 0) {
            str = dw1[k1].concat(str);
          }
          k1++;
        } else { //不加小单位，加大单位
          k1 = 0;
          var temp = str.charAt(0);
          if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位
          str = str.substr(1, str.length - 1);
          str = dw2[k2].concat(str);
          sum = 0;
        }
      }
      if (k1 == 3) //小单位到千则大单位进一
      {
        k2++;
      }
    }
    //转换小数部分
    var strdig = "";
    if (dig != "") {
      var n = dig.charAt(0);
      if (n != 0) {
        strdig += dw[Number(n)] + "角"; //加数字
      }
      var n = dig.charAt(1);
      if (n != 0) {
        strdig += dw[Number(n)] + "分"; //加数字
      }
    }
    str += "元" + strdig;
  } catch(e) {
    return "0元";
  }
  return str;
}
//拆分整数与小数
function splits(tranvalue) {
  var value = new Array('', '');
  temp = tranvalue.split(".");
  for (var i = 0; i < temp.length; i++) {
    value[i] = temp[i];
  }
  return value;
}

//原生JavaScript动态执行VBScript脚本
function vbscript(){
    try{
        var script=document.getElementById("K1").value;
        if(script.trim()=="")return;
        window.execScript('On Error Resume Next \n'+script+'\n If Err.Number<>0 Then \n MsgBox "请输入正确的VBScript脚本!",48,"脚本错误!" \n End If',"vbscript")
    }catch(e){
        alert(e.message);
    }
}

//原生JavaScript动态执行JavaScript脚本
function javascript(){
    try{
      eval(K1.value);
    }catch(e){
        alert(e.message);
    }
}

//原生JavaScript用正则表达式清除html代码中的脚本
function clear_script(){
  K1.value=K1.value.replace(/<script.*?>[\s\S]*?<\/script>|\s+on[a-zA-Z]{3,16}\s?=\s?"[\s\S]*?"|\s+on[a-zA-Z]{3,16}\s?=\s?'[\s\S]*?'|\s+on[a-zA-Z]{3,16}\s?=[^ >]+/ig,"");
}

//原生JavaScript字符串反序
function IsReverse(text){
    return text.split('').reverse().join('');
}

//原生JavaScript用正则表达式按字母排序，对每行进行数组排序
function SetSort(){
    var text=K1.value.split(/[\r\n]/).sort().join("\r\n");//顺序
    var test=K1.value.split(/[\r\n]/).sort().reverse().join("\r\n");//反序
    K1.value=K1.value!=text?text:test;
}

//原生JavaScript用正则表达式清除相同的数组(高效率)
String.prototype.unique=function(){
    var x=this.split(/[\r\n]+/);
    var y='';
    for(var i=0;i<x.length;i++){
        if(!new RegExp("^"+x[i].replace(/([^\w])/ig,"\\$1")+"$","igm").test(y)){
            y+=x[i]+"\r\n"
        }
    }
    return y
}

//原生JavaScript用正则表达式提取页面代码中所有网址
var aa = document.documentElement.outerHTML.match(/(url\(|src=|href=)[\"\']*([^\"\'\(\)\<\>\[\] ]+)[\"\'\)]*|(http:\/\/[\w\-\.]+[^\"\'\(\)\<\>\[\] ]+)/ig).join("\r\n").replace(/^(src=|href=|url\()[\"\']*|[\"\'\>\) ]*$/igm,"");

//原生JavaScript判断字符是否空NULL
function isNULL( chars ) {
    if (chars == null)
        return true;
    if (jsTrim(chars).length==0)
        return true;
    return false;
}

//原生JavaScript判断字符串是否邮政编码
function isValidPost( chars ) {
    var re=/^\d{6}$/;
    if (chars.match(re) == null)
        return false;
    else
        return true;
}

//原生JavaScript判断字符是否为A-Za-z英文字母
function isLetters( str ){
    var re=/^[A-Za-z]+$/;
    if (str.match(re) == null)
        return false;
    else
        return true;
}

//原生JavaScript判断字符串是否为浮点数
function isFloat( str ) {
    for(i=0;i<str.length;i++)  {
       if ((str.charAt(i)<"0" || str.charAt(i)>"9")&& str.charAt(i) != '.'){
            return false;
       }
    }
    return true;
}

//原生JavaScript判断字符串是为网址不区分大小写
function isValidURL( chars ) {
    var re=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(\S+\.\S+)$/;
    if (!isNULL(chars)) {
        chars = jsTrim(chars);
        if (chars.match(re) == null)
            return false;
        else
            return true;
    }
    return false;
}

//原生JavaScript实现打开一个窗体通用方法
function openWindow(url,windowName,width,height){
    var x = parseInt(screen.width / 2.0) - (width / 2.0); 
    var y = parseInt(screen.height / 2.0) - (height / 2.0);
    var isMSIE= (navigator.appName == "Microsoft Internet Explorer");
    if (isMSIE) {
        var p = "resizable=1,location=no,scrollbars=no,width=";
        p = p+width;
        p = p+",height=";
        p = p+height;
        p = p+",left=";
        p = p+x;
        p = p+",top=";
        p = p+y;
        retval = window.open(url, windowName, p);
    } else {
        var win = window.open(url, "ZyiisPopup", "top=" + y + ",left=" + x + ",scrollbars=" + scrollbars + ",dialog=yes,modal=yes,width=" + width + ",height=" + height + ",resizable=no" );
        eval("try { win.resizeTo(width, height); } catch(e) { }");
        win.focus();
    }
}

//原生JavaScript解决offsetX兼容性问题
// 针对火狐不支持offsetX/Y
function getOffset(e){
  var target = e.target, // 当前触发的目标对象
      eventCoord,
      pageCoord,
      offsetCoord;

  // 计算当前触发元素到文档的距离
  pageCoord = getPageCoord(target);

  // 计算光标到文档的距离
  eventCoord = {
    X : window.pageXOffset + e.clientX,
    Y : window.pageYOffset + e.clientY
  };

  // 相减获取光标到第一个定位的父元素的坐标
  offsetCoord = {
    X : eventCoord.X - pageCoord.X,
    Y : eventCoord.Y - pageCoord.Y
  };
  return offsetCoord;
}

function getPageCoord(element){
  var coord = { X : 0, Y : 0 };
  // 计算从当前触发元素到根节点为止，
  // 各级 offsetParent 元素的 offsetLeft 或 offsetTop 值之和
  while (element){
    coord.X += element.offsetLeft;
    coord.Y += element.offsetTop;
    element = element.offsetParent;
  }
  return coord;
}

//原生JavaScript时间个性化输出功能
/*
1、< 60s, 显示为“刚刚”
2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
 */
function timeFormat(time){
  var date = new Date(time)
    , curDate = new Date()
    , year = date.getFullYear()
    , month = date.getMonth() + 1
    , day = date.getDate()
    , hour = date.getHours()
    , minute = date.getMinutes()
    , curYear = curDate.getFullYear()
    , curHour = curDate.getHours()
    , timeStr;

  if(year < curYear){
    timeStr = year +'年'+ month +'月'+ day +'日 '+ hour +':'+ minute;
  }else{
    var pastTime = curDate - date
      , pastH = pastTime/3600000;

    if(pastH > curHour){
      timeStr = month +'月'+ day +'日 '+ hour +':'+ minute;
    }else if(pastH >= 1){
      timeStr = '今天 ' + hour +':'+ minute +'分';
    }else{
      var pastM = curDate.getMinutes() - minute;
      if(pastM > 1){
        timeStr = pastM +'分钟前';
      }else{
        timeStr = '刚刚';
      }
    }
  }
  return timeStr;
}

//原生JavaScript获取网页被卷去的位置
function getScrollXY() {
    return document.body.scrollTop ? {
        x: document.body.scrollLeft,
        y: document.body.scrollTop
    }: {
        x: document.documentElement.scrollLeft,
        y: document.documentElement.scrollTop
    }
}

//原生JavaScript确认是否键盘有效输入值
function checkKey(iKey){
    if(iKey == 32 || iKey == 229){return true;}/*空格和异常*/
    if(iKey>47 && iKey < 58){return true;}/*数字*/
    if(iKey>64 && iKey < 91){return true;}/*字母*/
    if(iKey>95 && iKey < 108){return true;}/*数字键盘1*/
    if(iKey>108 && iKey < 112){return true;}/*数字键盘2*/
    if(iKey>185 && iKey < 193){return true;}/*符号1*/
    if(iKey>218 && iKey < 223){return true;}/*符号2*/
    return false;
}

//原生JavaScript跨浏览器添加事件
function addEvt(oTarget,sEvtType,fnHandle){
    if(!oTarget){return;}
    if(oTarget.addEventListener){
        oTarget.addEventListener(sEvtType,fnHandle,false);
    }else if(oTarget.attachEvent){
        oTarget.attachEvent("on" + sEvtType,fnHandle);
    }else{
        oTarget["on" + sEvtType] = fnHandle;
    }
}

//原生JavaScript跨浏览器删除事件
function delEvt(oTarget,sEvtType,fnHandle){
    if(!oTarget){return;}
    if(oTarget.addEventListener){
        oTarget.addEventListener(sEvtType,fnHandle,false);
    }else if(oTarget.attachEvent){
        oTarget.attachEvent("on" + sEvtType,fnHandle);
    }else{
        oTarget["on" + sEvtType] = fnHandle;
    }
}

//原生JavaScript判断是否移动设备访问
function isMobileUserAgent(){
    return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
}
//原生JavaScript转义html标签
function HtmlEncode(text) {
    return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

//原生JavaScript设置cookie值
function setCookie(name, value, Hours) {
    var d = new Date();
    var offset = 8;
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = utc + (3600000 * offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
}

//原生JavaScript获取cookie值
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}

//设为首页
function setHomepage() {
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage('http://www.jq-school.com')
    } else if (window.sidebar) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
            } catch(e) {
                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true")
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', 'http://www.jq-school.com')
    }
}

//加载样式表
function LoadStyle(url) {
    try {
        document.createStyleSheet(url)
    } catch(e) {
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(cssLink)
    }
}

//动态加载脚本
function appendscript(src, text, reload, charset) {
    var id = hash(src + text);
    if(!reload && in_array(id, evalscripts)) return;
    if(reload && $(id)) {
        $(id).parentNode.removeChild($(id));
    }
 
    evalscripts.push(id);
    var scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    scriptNode.id = id;
    scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
    try {
        if(src) {
            scriptNode.src = src;
            scriptNode.onloadDone = false;
            scriptNode.onload = function () {
                scriptNode.onloadDone = true;
                JSLOADED[src] = 1;
            };
            scriptNode.onreadystatechange = function () {
                if((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
                    scriptNode.onloadDone = true;
                    JSLOADED[src] = 1;
                }
            };
        } else if(text){
            scriptNode.text = text;
        }
        document.getElementsByTagName('head')[0].appendChild(scriptNode);
    } catch(e) {}
}


