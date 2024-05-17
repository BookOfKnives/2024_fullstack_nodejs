const PORT = Number(process.env.PORT);
let newDate = new Date().toLocaleString("da-DK", {timeZone: "Europe/Copenhagen"});
export function startUpMessager(){
    console.log("App 015 online on port:", PORT, "at", newDate);
}

