import React from "react";
import Tasks from "./Tasks";
import { Paper, TextField } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";
class TodoSection extends Tasks {
  state = { tasks: [], currentTask: "" };
  render() {
    const { tasks } = this.state;
    return (
      <div className="App flex">
        <Paper elevation={3} className="container">
          <div className="heading">TO-DO</div>
          
          <div>
            {tasks.map((task) => (
              <Paper key={task._id} className="flex task_container">
                <Checkbox
                  checked={task.completed}
                  onClick={() => this.handleUpdate(task._id)}
                  color="primary"
                />
                <div className={task.completed ? "task line_through" : "task"}>
                  {task.task}
                </div>
                <Button
                  onClick={() => this.handleDelete(task._id)}
                  color="secondary"
                >
                  delete
                </Button>
              </Paper>
            ))}
          </div>
          <form
            onSubmit={this.handleSubmit}
            className="flex"
            style={{ margin: "15px 0" }}
          >
            <TextField
              variant="outlined"
              size="small"
              style={{ width: "80%" }}
              value={this.state.currentTask}
              required={true}
              onChange={this.handleChange}
              placeholder="Add New TO-DO"
            />
            <Button
              style={{ height: "40px", fontSize:"12px"}}
              variant="contained" 
              size="medium"
              color="secondary"
              type="submit"
            >
              Add task
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}
export default TodoSection;
