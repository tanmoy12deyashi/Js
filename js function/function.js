// get 4 digit hex number
let s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

// get unique hex id
uhid = () => s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

// get unique time id
utid = () => Date.now();

// get integer no
getNum = (min = 1, max = 100, type = 0) => Number((Math.random() * (max - min) + min).toFixed(type));

// check if array
isArray = (arr) => Array.isArray(arr);

// check if array of objects
isArrayOfObjects = (arr) => (arr.length && Object.prototype.toString.call(arr[0]) == '[object Object]') ? true : false;

// check if object
isObject = (obj) => (Object.prototype.toString.call(obj) == '[object Object]') ? true : false;

// check if empty
empty = (val) => val.length ? true : false;

// get merge object
mergeObject = (...arguments) => {
    // set target variable
    let target = {};
    // merge the object into the target object
    let merger = (obj) => {
        // for each object
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (Object.prototype.toString.call(obj[prop]) === '[object Object]') target[prop] = mergeObject(target[prop], obj[prop]);
                else  target[prop] = obj[prop];
            }
        }
    };
    // loop through each object and conduct a merge
    for (let i = 0; i < arguments.length; i++) merger(arguments[i]);
    // return object
    return target;
};

// get ordinal number
getOrdinalNum = (n) => n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');

// get date time format
dateTimeFormat = (d, rtnFmt, prmFmt) => {
    let pmf = ['dd', 'mm'], t;
    // set return format
    rtnFmt = rtnFmt || 'dd-mm-yyyy';
    // check params
    if(typeof d == 'undefined' || (typeof d != 'undefined' && d == 'now')) d = new Date();
    else if(typeof d != 'undefined' && typeof prmFmt == 'undefined') d = new Date(d);
    else {
        return 'test';
    }

    // set days
    let shtDs = ['Sun', 'Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat'];
    let lngDs = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // set months
    let shtMs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let lngMs = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // update sec
    t = d.getSeconds();
    if(rtnFmt.includes('ss')) rtnFmt = rtnFmt.replace('ss', t < 10 ? `0${t}` : t);
    else if(rtnFmt.includes('s')) rtnFmt = rtnFmt.replace('s', t);

    // update min
    t = d.getMinutes();
    if(rtnFmt.includes('ii')) rtnFmt = rtnFmt.replace('ii', t < 10 ? `0${t}` : t);
    else if(rtnFmt.includes('i')) rtnFmt = rtnFmt.replace('i', t);
    
    // update hrs
    t = d.getHours();
    if(rtnFmt.includes('A')) { rtnFmt = rtnFmt.replace('A', t >= 12 ? "PM" : "AM"); t = t > 12 ? t - 12 : t; }
    if(rtnFmt.includes('hh')) rtnFmt = rtnFmt.replace('hh', t < 10 ? `0${t}` : t);
    else if(rtnFmt.includes('h')) rtnFmt = rtnFmt.replace('h', t);

    // update dates
    t = d.getDate();
    if(rtnFmt.includes('ddd')) rtnFmt = rtnFmt.replace('ddd', getOrdinalNum(t));
    else if(rtnFmt.includes('dd')) rtnFmt = rtnFmt.replace('dd', t < 10 ? `0${t}` : t);
    else if(rtnFmt.includes('d')) rtnFmt = rtnFmt.replace('d', t);
    else if(rtnFmt.includes('DDDD')) rtnFmt = rtnFmt.replace('DDDD', lngDs[d.getDay()]);
    else if(rtnFmt.includes('DDD')) rtnFmt = rtnFmt.replace('DDD', shtDs[d.getDay()]);

    // update mnths
    t = d.getMonth();
    if(rtnFmt.includes('mm')) rtnFmt = rtnFmt.replace('mm', t < 9 ? `0${t + 1}` : t + 1);
    else if(rtnFmt.includes('m')) rtnFmt = rtnFmt.replace('m', t + 1);
    else if(rtnFmt.includes('MMMM')) rtnFmt = rtnFmt.replace('MMMM', lngMs[t]);
    else if(rtnFmt.includes('MMM')) rtnFmt = rtnFmt.replace('MMM', shtMs[t]);

    // update yrs
    t = d.getFullYear();
    if(rtnFmt.includes('yyyy')) rtnFmt = rtnFmt.replace('yyyy', t);
    else if(rtnFmt.includes('yy')) rtnFmt = rtnFmt.replace('yy', t.toString().substr(-2));

    console.log(rtnFmt)
    //date = new Date(date)
    console.log(d)
    //console.log(rtnFmt)
}