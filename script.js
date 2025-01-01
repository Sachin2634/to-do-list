var input = document.getElementById("input-box")
var add = document.getElementById("addbtn")
var list = document.getElementById("task-items")

add.addEventListener("click", function(){
    if(input.value != ""){
    var task = document.createElement("li")
    task.innerHTML = input.value
    list.appendChild(task)
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    task.appendChild(span);
    input.value = "";
    saveData();
    }
    else{
        alert("You must write something!")
    }
})

list.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
    saveData();
})

var scanimg = document.getElementById("scan")

scanimg.addEventListener("click", () => {
    const fileInput = document.getElementById("list-img");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        // Read the file and process it with Tesseract.js
        reader.onload = function () {
            const image = reader.result;
            Tesseract.recognize(
                image,                // Image data
                'eng',                // Language code
                {
                    logger: info => console.log(info), // Optional: Log progress
                }
            ).then(({ data: { text } }) => {
                console.log(text);  // Extracted text from the image
                addTasksToTodoList(text);
                fileInput.value = ""
            }).catch(err => console.error(err));
        };

        reader.readAsDataURL(file); // Convert file to a Data URL for processing
        
    } else {
        alert("Please upload an image first.");
    }
});

function addTasksToTodoList(text) {
    const tasks = text.split('\n').filter(task => task.trim() !== "");
    // const todoList = document.getElementById("todoList");
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task;
        list.appendChild(li);
        let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    });
    saveData();
}


function saveData(){
    localStorage.setItem("data", list.innerHTML);
}

function showData(){
    list.innerHTML = localStorage.getItem("data");
}
showData();




