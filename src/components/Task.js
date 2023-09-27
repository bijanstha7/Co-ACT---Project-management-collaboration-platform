import React from "react";
import axios from "axios";
import { deleteTask } from "../services/taskServices1";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

class Task extends React.Component {
  state = {
    assignedBy: JSON.parse(localStorage.getItem("user")).displayName,
    uid: JSON.parse(localStorage.getItem("user")).id,
    cospaceName: localStorage.getItem("recent_cospace_clicked"),
    task: "",
    taskNotes: "",
    taskStatus: "Pending",
    taskList: [],
  };

  compare = (a, b) => {
      if(a.taskStatus == b.taskStatus) return 0;
      if(a.taskStatus == "Completed") return 1;
      if(a.taskStatus == "Pending") return -1;
      if(b.taskStatus == "Completed") return -1;
      if(b.taskStatus == "Pending") return 1;
      return 0;
  }

  componentDidMountAsst = async () => {
    const uid = JSON.parse(localStorage.getItem("user")).id;
    const currentCospace = localStorage.getItem("recent_cospace_clicked");
    try {
      const { data } = await this.getTasks();
      let datas = [];
      data.forEach((task) => {
        if (task.cospaceName === currentCospace) {
          datas.push(task);
        }
      });
      datas.sort(this.compare);
      this.setState({ taskList: datas });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.componentDidMountAsst();
  }

  getTasks = () => {
    return axios.get("http://localhost:8000/task");
  };
  handleChange = (event) => {
    if (event.target.name === "taskStatus") {
      this.setState({
        taskStatus: event.target.value,
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.task === "" || this.state.taskNotes === "") {
      NotificationManager.warning(
        "Please Fill up Required Field. Please Check Task field And Task Notes field"
      );
      return false;
    }
    let data = {
      assignedBy: this.state.assignedBy,
      uid: this.state.uid,
      task: this.state.task,
      taskNotes: this.state.taskNotes,
      taskStatus: this.state.taskStatus,
      cospaceName: this.state.cospaceName,
    };

    axios
      .post("http://localhost:8000/task/add", data)
      .then(async (res) => {
        NotificationManager.success("Task added!");
        this.state.task = "";
        this.state.taskNotes = "";
        this.state.taskStatus = "Pending";
        this.componentDidMountAsst();
      })
      .catch((error) => {
        if (error.response.status && error.response.status === 400)
          NotificationManager.error("Bad Request");
        else NotificationManager.error("Something Went Wrong");
      });
  };

  handleDelete = async (currentTask) => {
    const originalTasks = this.state.taskList;
    try {
      const taskList = originalTasks.filter((task) => task._id !== currentTask);
      this.setState({ taskList });
      await deleteTask(currentTask);
      NotificationManager.info("Task deleted successfully!!");
    } catch (error) {
      this.setState({ taskList: originalTasks });
      console.log(error);
    }
  };

  handleTake = async(currentTask) => {
    const originalTasks = this.state.taskList;
    try {
      for(let task of originalTasks){
          if(task._id === currentTask){
              task.takenBy = this.state.assignedBy;
              task.taskStatus = "In Progress";
          }
      }
      this.setState({ originalTasks });

      axios
      .patch("http://localhost:8000/task/take/" + currentTask, {actor: this.state.assignedBy})
      .then(() => {
          NotificationManager.success("Task taken successfully!!");
      })
      .catch(() => {
          NotificationManager.info("Something went wrong!!");
      })
    } catch (error) {
      this.setState({ taskList: originalTasks });
      console.log(error);
    }
  }

  handleDone = async(currentTask) => {
    const originalTasks = this.state.taskList;
    try {
      for(let task of originalTasks){
          if(task._id === currentTask){
              task.takenBy = this.state.assignedBy;
              task.taskStatus = "Completed";
          }
      }
      this.setState({ originalTasks });

      axios
      .patch("http://localhost:8000/task/done/" + currentTask)
      .then(() => {
          NotificationManager.success("Task Completed successfully!!");
      })
      .catch(() => {
          NotificationManager.info("Something went wrong!!");
      })
    } catch (error) {
      this.setState({ taskList: originalTasks });
      console.log(error);
    }
  }


  render() {
    let { taskList } = this.state;
    return (
      <div className="tasksection">
        <div className="noticontainer" id="noticontainer">
          <NotificationContainer />
        </div>
        <h1>Tasks</h1>
        <h2>{localStorage.getItem("recent_cospace_clicked_description")}</h2>
        <div className="addnewtask">
          <form onSubmit={this.handleSubmit} className="taskform">
            <div className="taskname">
              <label htmlFor="taskName">
                <b>Task Name</b>
              </label>
              <input
                type="text"
                name="task"
                className="taskname"
                onChange={this.handleChange}
                value={this.state.task}
              />
            </div>
            <div className="tasknotes">
              <label htmlFor="taskName">
                <b>Task Notes</b>
              </label>
              <textarea
                rows="3"
                name="taskNotes"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.taskNotes}
              ></textarea>
            </div>
            <div id="flexrow">
              <div className="taskstatus">
                <label htmlFor="taskStatus">
                  <b>Task Status</b>
                </label>
                <select
                  name="taskStatus"
                  className="taskstatusselect"
                  onChange={this.handleChange}
                  value={this.state.taskStatus}
                >
                  <option value="pending">Pending</option>
                  <option value="In Progress">In progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Hold">Hold</option>
                </select>
              </div>
              <div className="submitnewtask">
                <input
                  type="submit"
                  name="add"
                  id="addnewtask"
                  value="Add"
                ></input>
              </div>
            </div>
          </form>
        </div>

        <div className="tasklist">
          <ul className="taskcards tasklisthead" style={{ height: "50px" }}>
            <li>
              <div className="taskcard">
                <div className="taskName">
                  <b>Task</b>
                </div>
                <div className="taskNotes">
                  <b>Task Notes</b>
                </div>
                <div className="assignedBy">
                  <b>Assigned By</b>
                </div>
                <div className="taskStatus">
                  <b>Task Status</b>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="tasklist">
          <ul className="taskcards">
            {taskList.map((task) => (
              <li>
                <div className="taskcard">
                  <div className="taskName">{task.task}</div>
                  <div className="taskNotes">{task.taskNotes}</div>
                  <div className="assignedBy">{task.assignedBy}</div>
                  <div className="taskStatus">{task.taskStatus}</div>
                </div>
                <div className="taskcontrols">
                  <div className="edittasks">
                    {   (task.taskStatus !== "Completed") ?
                        task.takenBy == this.state.assignedBy?
                        <button
                        id="donebtn"
                        onClick={() => this.handleDone(task._id)}
                        >
                        Done
                      </button>
                     : <button
                      id="editbtn"
                      onClick={() => this.handleTake(task._id)}
                      >
                      Take
                    </button>

                    
                    :" "}
                  </div>
                  <div className="deletetasks">
                    <button
                      id="edbtn"
                      onClick={() => this.handleDelete(task._id)}
                      >
                      Edit
                    </button>
                  </div>

                  <div className="deletetasks">
                    <button
                      id="deletebtn"
                      onClick={() => this.handleDelete(task._id)}
                      >
                      Delete
                    </button>
                  </div>
                </div>
                {task.takenBy && <div className="taken">Taken By: {task.takenBy}</div>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Task;
