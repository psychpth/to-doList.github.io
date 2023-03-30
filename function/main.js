// DOM Elements
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const input = document.querySelector('.name');
const popDiv = document.querySelector('.pop-up');
const container = document.querySelector('.container');

// Store entered input value
let myName = [];

// If 'Enter' is pressed gathers input value and stores it myName array
input.addEventListener("keydown", function getName(e){
    if(e.keyCode == 13){
        myName.pop();
        myName.push(input.value);
        localStorage.setItem("textvalue",myName[0]);
    }
})

// AM or PM
const showAmPm = true;

// Keypress listener to run windowsAnimation function
window.addEventListener('keydown', windowsAnimation);

// Function for Date and Time
function showDateTime() {
    let today = new Date();

    // Declaring time as variables
    let hrs = today.getHours();
    let mins = today.getMinutes();
    let secs = today.getSeconds();

    // Declaring date as variables
    let dayname = today.getDay();
    let day = today.getDate();
    let months = today.getMonth();
    let years = today.getFullYear();

    // Determine months name
    const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Determine day name
    const dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Set AM or PM
    const amPM = hrs >= 12 ? 'PM' : 'AM';

    // 12 hours format
    hrs = hrs % 12 || 12;

    // Output time
    time.innerHTML = `${hrs}:${addZero(mins)}:${addZero(secs)} ${showAmPm ? amPM : ''}`;
    date.innerHTML = `${dayArr[dayname]}, ${monthsArr[months]} ${day}, ${years}`;
    setTimeout(showDateTime, 1000);
}

// Add zeros
function addZero(n){
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Run Date and Time
showDateTime();

// Combination of Animations
function windowsAnimation(){
    slideUp();
    setTimeout(hideTime, 700);  
    setTimeout(popUp, 700);
}

// Adding animation for Date and Time 
function slideUp(){
    container.classList.add('animation');
}

// Hiding Date and Time
function hideTime(){
    container.classList.add('hide');
}

// Show pop-up
function popUp(){
    popDiv.classList.add('show');
}

