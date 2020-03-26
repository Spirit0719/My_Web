let SIGN_REGEXP = /([yMdhsm])(\1*)/g;
let DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
    len = len - (s + '').length;
    for (let i = 0; i < len; i++) {
        s = '0' + s;
    }
    return s;
};

//获取随机字符串
export function GetRandomString(len) {
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

//获取随机数
export function GetRandomNum(Min, Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}


const formatDate = {
    //格式化日期
//formatDate.format(new Date(),'yyyy-MM-dd hh:mm')


    format: function (date, pattern) {
        if(date.getFullYear() == 1970 && date.getMonth() == 0 && date.getDate() == 1){
            return '';
        }
        pattern = pattern || DEFAULT_PATTERN;
        return pattern.replace(SIGN_REGEXP, function ($0) {
            switch ($0.charAt(0)) {
                case 'y':
                    return padding(date.getFullYear(), $0.length);
                case 'M':
                    return padding(date.getMonth() + 1, $0.length);
                case 'd':
                    return padding(date.getDate(), $0.length);
                case 'w':
                    return date.getDay() + 1;
                case 'h':
                    return padding(date.getHours(), $0.length);
                case 'm':
                    return padding(date.getMinutes(), $0.length);
                case 's':
                    return padding(date.getSeconds(), $0.length);
            }
        });
    },
    parse: function (dateString, pattern) {
        let matchs1 = pattern.match(SIGN_REGEXP);
        let matchs2 = dateString.match(/(\d)+/g);
        if (matchs1.length == matchs2.length) {
            let _date = new Date(1970, 0, 1);
            for (let i = 0; i < matchs1.length; i++) {
                let _int = parseInt(matchs2[i]);
                let sign = matchs1[i];
                switch (sign.charAt(0)) {
                    case 'y':
                        _date.setFullYear(_int);
                        break;
                    case 'M':
                        _date.setMonth(_int - 1);
                        break;
                    case 'd':
                        _date.setDate(_int);
                        break;
                    case 'h':
                        _date.setHours(_int);
                        break;
                    case 'm':
                        _date.setMinutes(_int);
                        break;
                    case 's':
                        _date.setSeconds(_int);
                        break;
                }
            }
            return _date;
        }
        return null;
    }

}

export {formatDate};


let ShakecallBackFun = function () {
};

//获取加速度信息
//通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
//而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
let SHAKE_THRESHOLD = 4000;
let last_update = 0;
let x, y, z, last_x = 0, last_y = 0, last_z = 0;
let last_Shake = 0;

function deviceMotionHandler(eventData) {
    let acceleration = eventData.accelerationIncludingGravity;
    let curTime = new Date().getTime();
    if ((curTime - last_update) > 10) {
        let diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        let speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) {
            if ((curTime - last_Shake) > 500) {
                last_Shake = curTime;
                ShakecallBackFun();
            }
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}


export function Shake(callBackFun) {
    ShakecallBackFun = callBackFun;
//运动事件监听
//     if (window.DeviceMotionEvent) {
//         window.addEventListener('devicemotion', deviceMotionHandler, false);
//     }
}

export function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

export function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.className += " " + cls;
}

export function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

export function toggleClass(obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls);
    } else {
        addClass(obj, cls);
    }
}

//获取字符串长度
export function GetStrLength(str) {
    return str.replace(/[\u0391-\uFFE5]/g, "aa").length;  //先把中文替换成两个字节的英文，在计算长度
}

//数组随机排列
export function shuffle(arr) {
    let i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};

//加载js文件
export function injectScript(url, onload, onerror) {
    let script = document.createElement('script');
    // onload fires even when script fails loads with an error.
    script.onload = onload;
    // onerror fires for malformed URLs.
    script.onerror = onerror;
    script.src = url;
    document.head.appendChild(script);
}

//加载css文件
export function injectStyle(url, onload, onerror) {
    let script = document.createElement('style');
    // onload fires even when script fails loads with an error.
    script.onload = onload;
    // onerror fires for malformed URLs.
    script.onerror = onerror;
    script.src = url;
    document.head.appendChild(script);
}

//进入全屏
export function requestFullScreen() {
    let docElm = document.documentElement;
//W3C
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
//FireFox
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
//Chrome等
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
//IE11
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

//退出全屏
export function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

//监听是否全屏
// fullScreenChange((isFullScreed)=>{
//     console.log(isFullScreed);
// })
export function fullScreenChange(callBackFun) {
    document.addEventListener("fullscreenchange",function () {
        callBackFun((document.fullscreen)? true : false)
        }, false);
    document.addEventListener("mozfullscreenchange",function () {
        callBackFun((document.mozFullScreen)? true : false)
    }, false);
    document.addEventListener("webkitfullscreenchange",function () {
        callBackFun((document.webkitIsFullScreen)? true : false)
    }, false);
    document.addEventListener("msfullscreenchange", function () {
        callBackFun((document.msFullscreenElement)? true : false)
    }, false);
}


//经纬度转地图坐标
export function latLng2WebMercator(lng, lat) {//[114.32894, 30.585748]  
    let earthRad = 6378137.0;
    let x = lng * Math.PI / 180 * earthRad;
    let a = lat * Math.PI / 180;
    let y = earthRad / 2 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
    return [x, y]; //[12727039.383734727, 3579066.6894065146]  
}

//数据对象排序
//let arr = [Object { name="wlz", age="5"}, Object { name="zlw", age="24"}]
//arr.sort(compare("age",true))
export function Compare(prop, desc) {
    return function (obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return desc ? 1 : -1;
        } else if (val1 > val2) {
            return desc ? -1 : 1;
        } else {
            return 0;
        }
    }
}


export function newGuid() {
    let guid = "";
    for (let i = 1; i <= 32; i++) {
        let n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}



//定义一些常量
let x_PI = 3.14159265358979324 * 3000.0 / 180.0;
let PI = 3.1415926535897932384626;
let a = 6378245.0;
let ee = 0.00669342162296594323;

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bd_lon
 * @param bd_lat
 * @returns {*[]}
 */
function bd09togcj02(bd_lon, bd_lat) {
    let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let x = bd_lon - 0.0065;
    let y = bd_lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    let gg_lng = z * Math.cos(theta);
    let gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function gcj02tobd09(lng, lat) {
    let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    let bd_lng = z * Math.cos(theta) + 0.0065;
    let bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat]
}

/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function wgs84togcj02(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    }
    else {
        let dlat = transformlat(lng - 105.0, lat - 35.0);
        let dlng = transformlng(lng - 105.0, lat - 35.0);
        let radlat = lat / 180.0 * PI;
        let magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        let sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        let mglat = lat + dlat;
        let mglng = lng + dlng;
        return [mglng, mglat]
    }
}

/**
 * GCJ02 转换为 WGS84
 * @param lng
 * @param lat
 * @returns {*[]}
 */
export function gcj02towgs84(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    }
    else {
        let dlat = transformlat(lng - 105.0, lat - 35.0);
        let dlng = transformlng(lng - 105.0, lat - 35.0);
        let radlat = lat / 180.0 * PI;
        let magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        let sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        let mglat = lat + dlat;
        let mglng = lng + dlng;
        return [lng * 2 - mglng, lat * 2 - mglat]
    }
}

function transformlat(lng, lat) {
    let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
}

function transformlng(lng, lat) {
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
}

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function out_of_china(lng, lat) {
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
}