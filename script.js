let savedName = localStorage.getItem("name")
let emoji = document.querySelectorAll(".emoji");
let timeline = document.getElementById("timeline");

let allentries = JSON.parse(localStorage.getItem("entry")) || { date: "", emoji: "" };

let todaysDate = getDate();

if (allentries.date === todaysDate) {
    addTimeline(allentries.date, allentries.emoji);
}


if(!savedName){
    let name = prompt("Hiii, please enter your name")

    if(name.trim !== ""){
        localStorage.setItem("name" , name.trim())
        document.getElementById("name").innerHTML = name
    }
    else{
        document.getElementById("name").innerHTML = "not provided"
    }
}
else {
    document.getElementById("name").innerHTML = savedName;
}



emoji.forEach(function(emoji){
    emoji.addEventListener("click" , function(){
        let currentDate = getDate();

        let updatedEntries = JSON.parse(localStorage.getItem("entry")) || { date: "", emoji: "" };

        if (updatedEntries.date === currentDate) {
            alert("Only one entry per day is allowed");
            return;
        }
        let localStorageTimeline = {date : currentDate , emoji : emoji.innerText};
        localStorage.setItem("entry" , JSON.stringify(localStorageTimeline));

        addTimeline(currentDate , emoji.innerText);
        
    })
})

function addTimeline(currentDate, emojiText) {
    let dateEmoji = document.createElement("div");

    let currentDateElement = document.createElement("span");
    currentDateElement.innerText = currentDate;

    let timelineEmoji = document.createElement("span");
    timelineEmoji.innerText = emojiText;

    dateEmoji.appendChild(currentDateElement);
    dateEmoji.appendChild(timelineEmoji);

    timeline.appendChild(dateEmoji);

    dateEmoji.style.display = "flex";
    dateEmoji.style.gap = "5px";
}

function getDate(){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '/' + mm + '/' + yyyy + " :  ";

    return formattedToday;
}


