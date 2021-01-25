import { Task } from "../models/Task.js";
import { TaskService } from "../services/TaskService.js";

//Khai bao doi tuong service
const taskSV = new TaskService();

const getAllTask = async (cb) => {
  //dung service de goi api tu backend lay du lieu ve
  try {
    const result = await taskSV.getAllTask();
    console.log("result", result.data);

    let taskToDo = result.data.filter((task) => task.status === false);
    console.log("task chua lam ", taskToDo);

    let taskCompleted = result.data.filter((task) => task.status === true);
    console.log("task da lam ", taskCompleted);

    cb(taskToDo, taskCompleted);
  } catch (err) {
    //Loi trong ham try se tra ve bien err cua catch
  }
};

let render = (arrayTodo, arrayCompleted) => {
  console.log(arrayTodo);
  // console.log(arrayCompleted);
  let content = ``;
  for (let todo of arrayTodo) {
    content += `<li class = "flex-todo" > 
        <span style = "cursor : pointer "> ${todo.taskName} </span> 
        <div>
        <span> <i class = "fa fa-trash" onClick = delTask('${todo.taskName}')></i>
        </span>
        <span> <i class = "fa fa-check" onClick = "doneTask('${todo.taskName}')"></i>
        </span>
        </div>
        </li>`;
  }

  document.getElementById("todo").innerHTML = content;

  let contentCompleted = ``;
  for (let todo of arrayCompleted) {
    contentCompleted += `<li class = "flex-todo" > 
        <span style = "cursor : pointer "> ${todo.taskName} </span> 
        <div>
        <span> <i class = "fa fa-trash" onClick = delTask('${todo.taskName}')></i>
        </span>
        <span> <i class = "fa fa-check" onClick = "doneTask('${todo.taskName}')"></i>
        </span>
        </div>
        </li>`;
  }

  document.getElementById("completed").innerHTML = contentCompleted;
};

// let renderTaskToDo = (taskToDo) => {
//   const contentTaskToDo = taskToDo.reduce((content, item, inndex) => {
//     content += `<li>
//         <span style = "cursor : pointer "> ${item.taskName} </span>
//         <span> <i class = "fa fa-check"></i>
//         </span>
//         </li>`;
//     return content;
//   });

//   document.getElementById("todo").innerHTML = contentTaskToDo;
// };

getAllTask();

//Nghiep vu them task
//B1 : dinh nghia su kien click cho button
document.getElementById("addItem").onclick = async (event) => {
  event.preventDefault(); //Chan su kien hien tai cua the submit hay the href the a

  // event.target <= dai dien cho the button danng duoc onclick

  //Lay tthong tin nguoi dung nhap tu giao dien
  let taskName = document.getElementById("newTask").value;

  //Tao ra object backend yeu cau
  const taskModel = new Task();
  taskModel.taskName = taskName;

  //goi api dua du lieu ve server
  try {
    let result = await taskSV.addTask(taskModel);
    console.log("ket qua them task", result.data);
    getAllTask(render);
  } catch (err) {
    console.log(err);
  }
};

getAllTask(render);

window.delTask = async (taskName) => {
  let cfm = confirm("ban co muon xoa task?");
  if (cfm) {
    try {
      let result = await taskSV.deleteTask(taskName);
      getAllTask(render);
    } catch (err) {
      console.log(err);
    }
  }
};

window.doneTask = async (taskName) => {
  try {
    let result = await taskSV.putToDone(taskName);
    getAllTask(render);
  } catch (err) {
    console.log(err);
  }
};

window.rejectTask = async (taskName) => {
  try {
    let result = await taskSV.putToUnDone(taskName);
    getAllTask(render);
  } catch (err) {
    console.log(err);
  }
};
