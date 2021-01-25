import { BaseService } from "./BaseService.js";

export class TaskService extends BaseService {
  constructor() {
    super(); //goi lai phuonng thuc constructor cua class cha
  }

  //Dinh nghia phuong thuc getAllTask
  getAllTask = () => {
    return this.get(`http://svcy.myclass.vn/api/ToDoList/GetAllTask`);
  };

  //dinh nghia ham du lieu ve backennd
  addTask = (task) => {
    //dung dinh nghia danng backend quy dinh
    return this.post(`http://svcy.myclass.vn/api/ToDoList/AddTask`);
  };

  deleteTask = (taskName) => {
    return this.delete(
      `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      taskName
    );
  };

  putToDone = (taskName) => {
    return this.put(
      `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      taskName
    );
  };

  putToUnDone = (taskName) => {
    return this.put(
      `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      taskName
    );
  };
}
