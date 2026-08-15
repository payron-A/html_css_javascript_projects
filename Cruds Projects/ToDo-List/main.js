const input = document.getElementById("headerinput");
const button = document.getElementById("headerButton");
const taskMain = document.querySelector(".task-main");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isEditMode = false;
let editId ;
button.addEventListener("click",manageTask);

function manageTask(){
    const value = input.value.trim();
    if(isEditMode){
        tasks[editId] = value;
    }else if(!isEditMode){
        if(value){
            tasks.push(value);
        }
    }
    localStorage.setItem("tasks",JSON.stringify(tasks));
    viewTasks();
    isEditMode = false;
    toggleButtonStyle();
    input.value = "";
}
function editTask(id){
    window.scrollTo({
        behavior:"smooth",
        top:50
    })
    input.value = tasks[id];
    isEditMode = true;
    toggleButtonStyle();
    editId = id;
}
function toggleButtonStyle(){
    if(isEditMode){
        button.textContent = "Edit";
        button.style.background = "var(--green-cl)"; 
    }else{
        button.textContent = "Add";
        button.style.background = "var(--ice-color)"; 
    }
    
}
function removeTask(id){
    if(confirm("Do you need to Delete this task ?")){
        tasks.splice(id,1);
    }
    localStorage.setItem("tasks",JSON.stringify(tasks));
    viewTasks();
}
function moveTask(id){
    if(id == 0) return;
    let temp = tasks[id]
    tasks[id] = tasks[id - 1];
    tasks[id - 1] = temp;
    viewTasks()
}
function viewTasks(){
    taskMain.innerHTML = tasks.map((task,id) => `
        <div class="task-card">
            <div class="task-head">
                <button class="task-move"
                        onclick = (moveTask(${id}))>^</button>
                <div class="task-data">ID : ${id}</div>
            </div>
            <div class="task-content">
                ${task}
            </div>
            <div class="action-btn">
                <button class="edit-btn"
                        onclick = (editTask(${id}))>
                    Edit
                </button>
                <button class="delete-btn"
                        onclick = (removeTask(${id}))>
                    Delete
                </button>
            </div>
        </div>

    `).join("");
}
viewTasks();