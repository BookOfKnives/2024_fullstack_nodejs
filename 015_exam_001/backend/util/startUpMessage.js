import { time }  from "./time.js";
const PORT = Number(process.env.PORT);

const date = "" + time.day + "/" + time.month + ", "  + time.year;
let timeP = "" + time.hours + time.minutes;
let timeDone = Number(timeP);

let newDate = new Date().toLocaleString("da-DK", {timeZone: "Europe/Copenhagen"});
export function startUpMessager(){
    // console.log("App 015 online on port:", PORT, "at", date,  "(dd/mm yyyy), time:",timeDone, time.seconds);
    console.log("App 015 online on port:", PORT, "at", newDate);
}

