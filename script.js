/*=========================================================
  INTERACTIVE PORTFOLIO WEBSITE
  WEEK 3 - JAVASCRIPT
  Student: Satvik Gundrathi
=========================================================*/


/*=========================================================
                VARIABLES
=========================================================*/

const body = document.body;
const toggleBtn = document.getElementById("themeToggle");

const greeting = document.getElementById("greeting");

const aboutSection = document.getElementById("about");

const showBtn = document.getElementById("showHideBtn");


/*=========================================================
                DATA TYPES
=========================================================*/

// String
let studentName = "Satvik Gundrathi";

// Number
let currentYear = 2026;

// Boolean
let isDarkMode = false;

// Array
let skills = [
    "Blockchain",
    "Solidity",
    "HTML",
    "CSS",
    "JavaScript"
];

// Object
let student = {
    name: "Satvik",
    college: "Jain University",
    course: "Blockchain Technology"
};


/*=========================================================
            DYNAMIC GREETING FUNCTION
=========================================================*/

function displayGreeting() {

    let hour = new Date().getHours();

    let message = "";

    if(hour < 12){

        message = "Good Morning 👋 Welcome to My Portfolio";

    }

    else if(hour < 17){

        message = "Good Afternoon 👋 Welcome to My Portfolio";

    }

    else{

        message = "Good Evening 👋 Welcome to My Portfolio";

    }

    greeting.textContent = message;

}

displayGreeting();


/*=========================================================
                DARK MODE
=========================================================*/

function enableDarkMode(){

    body.classList.add("dark-mode");

    localStorage.setItem("theme","dark");

}

function enableLightMode(){

    body.classList.remove("dark-mode");

    localStorage.setItem("theme","light");

}


function toggleTheme(){

    if(body.classList.contains("dark-mode")){

        enableLightMode();

        toggleBtn.innerHTML="🌙 Dark Mode";

    }

    else{

        enableDarkMode();

        toggleBtn.innerHTML="☀ Light Mode";

    }

}


/*=========================================================
            LOAD SAVED THEME
=========================================================*/

window.onload = function(){

    let savedTheme = localStorage.getItem("theme");

    if(savedTheme==="dark"){

        enableDarkMode();

        toggleBtn.innerHTML="☀ Light Mode";

    }

    else{

        enableLightMode();

        toggleBtn.innerHTML="🌙 Dark Mode";

    }

}


toggleBtn.addEventListener("click",toggleTheme);



/*=========================================================
        SHOW / HIDE ABOUT SECTION
=========================================================*/

function toggleAbout(){

    const paragraphs = aboutSection.querySelectorAll("p");

    if(paragraphs[0].style.display === "none"){

        paragraphs.forEach(function(p){
            p.style.display = "block";
        });

        showBtn.innerHTML = "Hide About";

    }
    else{

        paragraphs.forEach(function(p){
            p.style.display = "none";
        });

        showBtn.innerHTML = "Show About";

    }

}

showBtn.addEventListener("click", toggleAbout);


/*=========================================================
            SIMPLE OPERATOR EXAMPLE
=========================================================*/

let completedProjects = 4;

let upcomingProjects = 2;

let totalProjects = completedProjects + upcomingProjects;

console.log("Total Projects : " + totalProjects);



/*=========================================================
        DISPLAY STUDENT DETAILS
=========================================================*/

console.log(student);

console.log(skills);

console.log(studentName);

console.log(currentYear);


/*=========================================================
          CONTACT FORM VALIDATION
=========================================================*/


/*=========================================================
        SELECT FORM ELEMENTS
=========================================================*/

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const messageInput = document.getElementById("message");

const successMessage = document.getElementById("successMessage");


/*=========================================================
        CREATE ERROR MESSAGE FUNCTION
=========================================================*/

function showError(input, message){

    removeError(input);

    const error = document.createElement("small");

    error.className = "error-message";

    error.style.color = "red";

    error.style.fontSize = "14px";

    error.innerText = message;

    input.parentElement.appendChild(error);

}


function removeError(input){

    const error = input.parentElement.querySelector(".error-message");

    if(error){

        error.remove();

    }

}


/*=========================================================
        VALIDATE NAME
=========================================================*/

function validateName(){

    let name = nameInput.value.trim();

    removeError(nameInput);

    if(name===""){

        showError(nameInput,"Name cannot be empty");

        return false;

    }

    if(name.length<3){

        showError(nameInput,"Minimum 3 characters required");

        return false;

    }

    return true;

}


/*=========================================================
        VALIDATE EMAIL
=========================================================*/

function validateEmail(){

    let email = emailInput.value.trim();

    removeError(emailInput);

    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email===""){

        showError(emailInput,"Email cannot be empty");

        return false;

    }

    if(!emailPattern.test(email)){

        showError(emailInput,"Enter a valid email");

        return false;

    }

    return true;

}


/*=========================================================
        VALIDATE MESSAGE
=========================================================*/

function validateMessage(){

    let message = messageInput.value.trim();

    removeError(messageInput);

    if(message===""){

        showError(messageInput,"Message cannot be empty");

        return false;

    }

    if(message.length<10){

        showError(messageInput,"Message should contain at least 10 characters");

        return false;

    }

    return true;

}


/*=========================================================
        FORM SUBMISSION
=========================================================*/

contactForm.addEventListener("submit",function(event){

    event.preventDefault();

    let isNameValid = validateName();

    let isEmailValid = validateEmail();

    let isMessageValid = validateMessage();

    if(isNameValid && isEmailValid && isMessageValid){

        successMessage.innerHTML =
        "✅ Message Sent Successfully!";

        successMessage.style.color="limegreen";

        successMessage.style.fontWeight="bold";

        contactForm.reset();

    }

    else{

        successMessage.innerHTML="";

    }

});


/*=========================================================
        REAL-TIME VALIDATION
=========================================================*/

nameInput.addEventListener("keyup",validateName);

emailInput.addEventListener("keyup",validateEmail);

messageInput.addEventListener("keyup",validateMessage);


/*=========================================================
              TO-DO LIST
=========================================================*/


/*=========================================================
        SELECT TODO ELEMENTS
=========================================================*/

const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");


/*=========================================================
            LOAD TASKS
=========================================================*/

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


/*=========================================================
        DISPLAY ALL TASKS
=========================================================*/

function displayTasks(){

    taskList.innerHTML = "";

    tasks.forEach(function(task,index){

        const li = document.createElement("li");

        li.className = "task-item";


        /* Task Text */

        const span = document.createElement("span");

        span.innerText = task.text;

        if(task.completed){

            span.style.textDecoration = "line-through";

            span.style.color = "#999";

        }


        /* Complete Button */

        const completeBtn = document.createElement("button");

        completeBtn.innerHTML = "✔";

        completeBtn.className = "complete-btn";

        completeBtn.onclick = function(){

            completeTask(index);

        };


        /* Delete Button */

        const deleteBtn = document.createElement("button");

        deleteBtn.innerHTML = "🗑";

        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = function(){

            deleteTask(index);

        };


        li.appendChild(span);

        li.appendChild(completeBtn);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

}


/*=========================================================
            SAVE TASKS
=========================================================*/

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

}


/*=========================================================
            ADD TASK
=========================================================*/

function addTask(){

    let task = taskInput.value.trim();

    if(task===""){

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text:task,

        completed:false

    });

    saveTasks();

    displayTasks();

    taskInput.value="";

}


addTaskBtn.addEventListener("click",addTask);


/*=========================================================
            DELETE TASK
=========================================================*/

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    displayTasks();

}


/*=========================================================
        COMPLETE TASK
=========================================================*/

function completeTask(index){

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

}


/*=========================================================
        ENTER KEY SUPPORT
=========================================================*/

taskInput.addEventListener("keypress",function(event){

    if(event.key==="Enter"){

        addTask();

    }

});


/*=========================================================
        LOAD TASKS ON PAGE LOAD
=========================================================*/

displayTasks();


/*====================================
        PROJECT GALLERY
=====================================*/

const images=[

"slide1.jpg.png",

"slide2.jpg.png",

"slide3.jpg.png"

];

let currentImage=0;

const sliderImage=document.getElementById("sliderImage");

const nextSlide=document.getElementById("nextSlide");

const prevSlide=document.getElementById("prevSlide");

function showImage(){

    sliderImage.src=images[currentImage];

}

nextSlide.addEventListener("click",function(){

    currentImage++;

    if(currentImage>=images.length){

        currentImage=0;

    }

    showImage();

});

prevSlide.addEventListener("click",function(){

    currentImage--;

    if(currentImage<0){

        currentImage=images.length-1;

    }

    showImage();

});

/* AUTO SLIDE */

setInterval(function(){

    currentImage++;

    if(currentImage>=images.length){

        currentImage=0;

    }

    showImage();

},3500);

/* IMAGE POPUP */

const popup=document.getElementById("imagePopup");

const popupImage=document.getElementById("popupImage");

const closePopup=document.getElementById("closePopup");

sliderImage.onclick=function(){

    popup.style.display="flex";

    popupImage.src=sliderImage.src;

}

closePopup.onclick=function(){

    popup.style.display="none";

}

popup.onclick=function(e){

    if(e.target==popup){

        popup.style.display="none";

    }

}


/*=========================================================
      EXTRA INTERACTIVE FEATURES
=========================================================*/


/*=========================================================
        ACTIVE NAVIGATION
=========================================================*/

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", function(){

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.clientHeight;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});


/*=========================================================
        BACK TO TOP BUTTON
=========================================================*/

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function(){

    if(window.scrollY > 300){

        topBtn.style.display = "block";

    }

    else{

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*=========================================================
        SCROLL PROGRESS BAR
=========================================================*/

window.addEventListener("scroll", function(){

    let scrollTop = document.documentElement.scrollTop;

    let scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

    let progress = (scrollTop / scrollHeight) * 100;

    document.getElementById("progressBar").style.width =
    progress + "%";

});


/*=========================================================
        WELCOME POPUP
=========================================================*/

window.addEventListener("load", function(){

    setTimeout(function(){

        alert(
        "👋 Welcome to Satvik Gundrathi's Interactive Portfolio!"
        );

    },800);

});


/*=========================================================
        VISITOR COUNTER
=========================================================*/

let visits = Number(localStorage.getItem("visits")) || 0;

visits++;

localStorage.setItem("visits", visits);

const visitorText = document.getElementById("visitorCount");

if(visitorText){

    visitorText.innerHTML =
    "Visitor Count : " + visits;

}


/*=========================================================
        FINAL CONSOLE MESSAGE
=========================================================*/

console.log("Interactive Portfolio Loaded Successfully");

console.log("All JavaScript Features Working Correctly");


/*=========================================================
        END OF SCRIPT
=========================================================*/
