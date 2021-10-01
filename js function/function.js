//'use strict'

// set chienese nuber
Ch = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
// set spanish nuber
Sp = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
// set hindi nuber
Hn = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
// set arabic nuber
Ar = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

/*// set hindi nuber
Hn = {
    0: '०',
    1: '१',
    2: '२',
    3: '३',
    4: '४',
    5: '५',
    6: '६',
    7: '७',
    8: '८',
    9: '९'
}*/
// get 4 digit hex number
s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

// get unique hex id
uhid = () => s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4() + s4();

// get unique time id
utid = () => Date.now();

// get integer no
getNum = (min = 1, max = 100, type = 0) => Number((Math.random() * (max - min) + min).toFixed(type));

// check if array
isArray = (arr) => Array.isArray(arr);

// check if array of objects
isArrayOfObjects = (arr) => arr.length && Object.prototype.toString.call(arr[0]) == '[object Object]';

// check if object
isObject = (obj) => Object.prototype.toString.call(obj) == '[object Object]';

// check if empty
empty = (val) => val.length ? true : false;

// replacer 
replacer = (val, items = {}) => {
    //console.log(items)
    // if value
    if(val) items = mergeObject(items, {'-': '-', '/': '/', '_': '_', ':': ':', ' ': ' '}), val = val.split('').map(_v => items[_v] || _v).join('');
    return val;
}

/*function replacer1(val, items = {}) {
    let sign = {
        '-': '-',
        '/': '/',
        '_': '_'
    }
    items = mergeObject(items, sign);
    console.log(val)
    console.log(items)
    console.log(val.split(''))
    console.log(val.split('').map(_v => items[_v]))
    console.log(val.split('').map(_v => items[_v] || ' ').join(""))
    console.log(123)
}*/

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
function dateTimeFormat(d, rtnFmt, prmFmt) {
    // set default var
    let pmf = ['%d%m%y', '%y%m%d', '%m%d%y'], t, c = new Date();
    // set return format
    rtnFmt = rtnFmt || 'dd-mm-yyyy';
    // check rtn format
    if(rtnFmt.includes('%') && pmf.includes(rtnFmt.toLocaleLowerCase())) if((typeof prmFmt != 'undefined' && prmFmt.includes('%'))) { return 'Something went erong'} else { prmFmt = rtnFmt, rtnFmt = 'dd-mm-yyyy'};
    // check is valid date
    let isDate = (_d) => 0 < Number(_d) && Number(_d) < 32;
    // check is valid month
    let isMonth = (_m) => 0 < Number(_m) && Number(_m) < 13;
    // check is valid year
    let isYear = (_y) => [2,4].includes(_y.length);

    // check params
    if(typeof d == 'undefined' || (typeof d != 'undefined' && d == 'now')) d = c;
    else if(typeof d != 'undefined' && typeof prmFmt == 'undefined') {
        if(!isNaN(Number(d))) d.includes('.')?console.warn('This is timestamp'):'', d = new Date(Number(d));
        else {
            // filter date
            d = d.trim().split(/[.\-_/ ]/).filter((_d) => _d.length);
            if(d.length == 3 && d[0].length == 4 && isDate(d[2]) && isMonth(d[1])) d = new Date(d.join('-'));
            else if (d.length == 3 && isDate(d[0]) && isMonth(d[1]) && isYear(d[2])) d = new Date(d[2].length == 2 ? Math.floor(c.getFullYear()/100) + d[2] : d[2],d[1]-1,d[0]);
            else return `Invalid ${!isDate(d[d[0].length != 4 ? 0 : 2]) ? 'Date' : !isMonth(d[1]) ? 'Month' : !isYear(d[d[0].length != 4 ? 2 : 0]) ? 'Year' : 'Format'}`;
        }
    } else if(typeof d != 'undefined' && typeof prmFmt != 'undefined') {
        // update p format
        prmFmt = prmFmt.toLocaleLowerCase();
        //prmFmt = prmFmt.trim().replace(/[.\-_/ ]/g,' ').split(' ').filter((_d) => _d.length).join('-');
        let _y, _m, _d, _h=0, _i=0, _s=0;
        // filter date
        d = d.trim().split(/[.\-_/ ]/).filter((_d) => _d.length);

        // check format
        if(prmFmt.includes(pmf[0]))  _y = d[2], _m = d[1], _d = d[0];
        else if(prmFmt.includes(pmf[1])) _y = d[0], _m = d[1], _d = d[2];
        else if(prmFmt.includes(pmf[2])) _y = d[2], _m = d[0], _d = d[1];
        else return 'This input date format is not valid, We are working on it';

        if (d.length == 3 && isDate(_d) && isMonth(_m) && isYear(_y)) d = new Date(_y.length == 2 ? Math.floor(c.getFullYear()/100) + _y : _y,_m-1,_d);
        else return `Invalid ${!isDate(_d) ? 'Date' : !isMonth(_m) ? 'Month' : !isYear(_y) ? 'Year' : 'Format'}`;
    } else return 'Something went wrong';

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

    // available lang
    let lang = ['En', 'Ch', 'Sp', 'Hn', 'Ar', 'Bn', 'Pr', 'Rn', 'Jn', 'Gn', 'Ur'];

    //console.log(replacer(rtnFmt, Hn))
    return rtnFmt;
    //return replacer(rtnFmt, Hn);
}

/*dateTimeFormat.prototype.add = function(v) {
    console.log(11111)
    console.log(this.d)
}*/
//dateTimeFormat = new DateTimeFormat()
/*function personConstructor(fName, lName) {
    this.fName = fName;
    this.lName = lName;
}
personConstructor.prototype.welcome = function () {
    return "Welcome " + this.fName + " " + this.lName;
};
//const person = new dateTimeFormat();
//console.log(person)

function add(d){
    console.log(d)
}
console.log(dateTimeFormat)
console.log(personConstructor)*/

//https://codebeautify.org/minify-js
//https://minify.js.org/js/