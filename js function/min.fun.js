// get ordinal number
let getOrdinalNum = (n) => n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
function dateTimeFormat(e, l, n) {
    let r, t = ["%d%m%y", "%y%m%d", "%m%d%y"],
        i = new Date;
    l = l || "dd-mm-yyyy";
    let a = e => 0 < Number(e) && Number(e) < 32,
        d = e => 0 < Number(e) && Number(e) < 13,
        u = e => [2, 4].includes(e.length);
    if (void 0 === e || void 0 !== e && "now" == e) e = i;
    else if (void 0 !== e && void 0 === n)
        if (isNaN(Number(e)))
            if (3 == (e = e.trim().split(/[.\-_/ ]/).filter((e => e.length))).length && 4 == e[0].length && a(e[2]) && d(e[1])) e = new Date(e.join("-"));
            else {
                if (!(3 == e.length && a(e[0]) && d(e[1]) && u(e[2]))) return "Invalid " + (a(e[4 != e[0].length ? 0 : 2]) ? d(e[1]) ? u(e[4 != e[0].length ? 2 : 0]) ? "Format" : "Year" : "Month" : "Date");
                e = new Date(2 == e[2].length ? Math.floor(i.getFullYear() / 100) + e[2] : e[2], e[1] - 1, e[0])
            }
    else e = new Date(Number(e));
    else {
        if (void 0 === e || void 0 === n) return "Something went wrong"; {
            n = n.toLocaleLowerCase();
            let l, r, s;
            if (e = e.trim().split(/[.\-_/ ]/).filter((e => e.length)), n.includes(t[0])) l = e[2], r = e[1], s = e[0];
            else if (n.includes(t[1])) l = e[0], r = e[1], s = e[2];
            else {
                if (!n.includes(t[2])) return "This input date format is not valid, We are working on it";
                l = e[2], r = e[0], s = e[1]
            }
            if (!(3 == e.length && a(s) && d(r) && u(l))) return "Invalid " + (a(s) ? d(r) ? u(l) ? "Format" : "Year" : "Month" : "Date");
            e = new Date(2 == l.length ? Math.floor(i.getFullYear() / 100) + l : l, r - 1, s)
        }
    }
    return r = e.getSeconds(), l.includes("ss") ? l = l.replace("ss", r < 10 ? `0${r}` : r) : l.includes("s") && (l = l.replace("s", r)), r = e.getMinutes(), l.includes("ii") ? l = l.replace("ii", r < 10 ? `0${r}` : r) : l.includes("i") && (l = l.replace("i", r)), r = e.getHours(), l.includes("A") && (l = l.replace("A", r >= 12 ? "PM" : "AM"), r = r > 12 ? r - 12 : r), l.includes("hh") ? l = l.replace("hh", r < 10 ? `0${r}` : r) : l.includes("h") && (l = l.replace("h", r)), r = e.getDate(), l.includes("ddd") ? l = l.replace("ddd", getOrdinalNum(r)) : l.includes("dd") ? l = l.replace("dd", r < 10 ? `0${r}` : r) : l.includes("d") ? l = l.replace("d", r) : l.includes("DDDD") ? l = l.replace("DDDD", ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][e.getDay()]) : l.includes("DDD") && (l = l.replace("DDD", ["Sun", "Mon", "Tue", "Web", "Thu", "Fri", "Sat"][e.getDay()])), r = e.getMonth(), l.includes("mm") ? l = l.replace("mm", r < 9 ? `0${r+1}` : r + 1) : l.includes("m") ? l = l.replace("m", r + 1) : l.includes("MMMM") ? l = l.replace("MMMM", ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][r]) : l.includes("MMM") && (l = l.replace("MMM", ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"][r])), r = e.getFullYear(), l.includes("yyyy") ? l = l.replace("yyyy", r) : l.includes("yy") && (l = l.replace("yy", r.toString().substr(-2))), l
}