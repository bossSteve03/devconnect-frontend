import React, { useState, useEffect } from "react";
import { useProjects } from "../../context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./index.module.css";

// Task component
const Task = ({ task, index, category, setSwitcher, switcher }) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/kanban/task/${id}`, {
        method: "DELETE",
      });
      setSwitcher(!switcher);
    } catch (error) {
      console.log(error);
    }
  };
  const [inputbox, setInputBox] = useState(false);
  const handleUpdate = async (e, id, category) => {
    setInputBox(!inputbox);
    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.input.value,
        category: category,
        objective: "asd",
        complete: "false",
      }),
    };
    try {
      const resp = await fetch(
        `http://127.0.0.1:8000/kanban/task/${id}`,
        options
      );
      if (resp.ok) {
        setSwitcher(!switcher);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className={styles.task}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <form
            className={styles.taskContainer}
            onSubmit={(e) => {
              e.preventDefault();
              if (inputbox == true) {
                handleUpdate(e, task.id, category);
              }
            }}
          >
            {inputbox ? (
              <>
                {" "}
                <input
                  name="input"
                  type="text"
                  placeholder={task.title}
                  style={{ width: "70%" }}
                />
                <button type="submit" style={{ width: "20%" }}>
                  Y
                </button>
              </>
            ) : (
              <span onDoubleClick={() => setInputBox(true)}>{task.title}</span>
            )}
            <button
              className={styles.deleteBtn}
              onClick={() => {
                handleDelete(task.id);
              }}
            >
              X
            </button>
          </form>
        </div>
      )}
    </Draggable>
  );
};

// <button className={styles.updateBtn} onClick={()=>{setInputBox(false)}}>
//   U
// </button>
//{openModal && <Modal closeModal={setOpenModal} />}
// Column component
const Column = ({ title, tasks, switcher, setSwitcher }) => {
  return (
    <div className={(styles[`${title}`], styles.column)}>
      <h3>{title}</h3>
      <Droppable droppableId={title}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div>
              {tasks &&
                tasks.map((task, index) => (
                  <Task
                    setSwitcher={setSwitcher}
                    switcher={switcher}
                    category={title}
                    key={task.id}
                    task={task}
                    index={index}
                  />
                ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

// Board component
const KanbanBoard = () => {
  const [switcher, setSwitcher] = useState(false);
  const [kanbanId, setKanbanId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Todo");
  const [columns, setColumns] = useState([]);
  const { projects } = useProjects();
  const [loading, setloading] = useState(false);
  const [have_cards, sethavecards] = useState(true);

  useEffect(() => {
    const getKanban = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/kanban/${sessionStorage.getItem("project_id")}`
        );
        const data = await response.json();
        setloading(true);
        setKanbanId(data["ID"]);
      } catch (error) {
        console.error(error);
        setloading(true);
      }
    };
    if (projects.length === 0) {
      console.log("Loading projects...");
    } else {
      console.log("Passed", projects);
      getKanban();
    }
  }, [projects]);

  async function getTasks() {
    sethavecards(true);
    const response = await fetch(
      `http://127.0.0.1:8000/kanban/task/${kanbanId}`
    );
    const data = await response.json();
    if (response.status == 404 || data.length === 0) {
      sethavecards(false);
    }
    const tasks = data;
    const columnMap = {
      Todo: { category: "Todo", tasks: [] },
      Progress: { category: "Progress", tasks: [] },
      Testing: { category: "Testing", tasks: [] },
      Done: { category: "Done", tasks: [] },
    };

    tasks.forEach((task) => {
      const category = task.category;
      if (!columnMap[category]) {
        columnMap[category] = {
          category: category,
          tasks: [],
        };
      }
      // Add the task to the column
      columnMap[category].tasks.push({
        id: task.id.toString(),
        title: task.name,
      });
    });
    // Convert the column map to an array
    const columns = Object.keys(columnMap).map((category) => {
      return columnMap[category];
    });

    // Update the columns state with the new columns
    setColumns(columns);
  }

  useEffect(() => {
    getTasks();
  }, [kanbanId]);

  const handlerTaskInput = (e) => {
    setTitle(e.target.value);
  };

  const handlerTaskCategory = (e) => {
    setCategory(e.target.value);
  };

  const handlerAdd = async (e) => {
    e.preventDefault();
    /* ADD THIS TO BACKEND below POST : (this will return missing field incase of error! :)
            info = request.json
            required_fields = ["name", "category", "objective", "complete"]
            name = info.get("name")
            category = info.get("category")
            objective = info.get("objective")
            complete = info.get("complete")
            kanban_id = id
        
            missing_fields = [field for field in required_fields if field not in info]

            if missing_fields:
               raise ValueError("Missing fields: {}".format(", ".join(missing_fields)))            
            complete_return = (lambda a,b,c :a if (c == "true") else b )(True,False,complete)
    */
    setTitle("");
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: title,
        category: category,
        objective: "obj",
        complete: "false",
      }),
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/kanban/task/${kanbanId}`,
        options
      );
      if (response.ok) {
        setTitle("");
      }
      const data = await response.json();
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [category, switcher]);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    console.log("result", result);
    console.log("source", source, destination);
    // If dropped outside of droppable area
    if (!destination) {
      return;
    }

    // If dropped in same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Find source column
    const sourceColumn = columns.find(
      (column) => column.category === source.droppableId
    );
    if (!sourceColumn) {
      console.error(
        `Could not find column with category ${source.droppableId}`
      );
      return;
    }
    // Find destination column
    const destinationColumn = columns.find(
      (column) => column.category === destination.droppableId
    );
    if (!destinationColumn) {
      console.error(
        `Could not find column with category ${destination.droppableId}`
      );
      return;
    }

    // Update columns state
    // TODO: If want to keep the order the user added the card, check the property index from 'destination'
    // And make sure to regen the 'destinationColumn' with the items in the desired order
    const newColumns = [...columns];
    const [removed] = sourceColumn.tasks.splice(source.index, 1);
    destinationColumn.tasks.push(removed);

    setColumns(newColumns);
    const last = destinationColumn.tasks[destinationColumn.tasks.length - 1];
    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: last.title,
        category: destinationColumn.category,
        objective: "none",
      }),
    };

    try {
      const resp = await fetch(
        `http://127.0.0.1:8000/kanban/task/${last.id}`,
        options
      );
      if (resp.ok) {
        console.log("UPDATED!");
        setSwitcher(!switcher);
      }
    } catch (e) {
      console.error(e);
    }
    getTasks();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles["kanban-container-page"]}>
        <h1 className={styles["kanban-title"]}>Kanban Board</h1>
        <form className={styles["kanban-form"]}>
          <input
            type="text"
            placeholder="your task"
            value={title}
            onChange={handlerTaskInput}
            className={styles["kanban-input"]}
          />
          <select
            onChange={handlerTaskCategory}
            id="categories"
            placeholder="Category"
            className={styles["kanban-select"]}
          >
            <option value="Todo">Todo</option>
            <option value="Progress">In Progress</option>
            <option value="Testing">Testing</option>
            <option value="Done">Done</option>
          </select>
          <button
            type="submit"
            onClick={handlerAdd}
            className={styles["kanban-add-btn"]}
          >
            Add
          </button>
        </form>
        <div className={styles.board}>
          {loading ? (
            have_cards && !kanbanId == "" ? (
              columns.map((column, index) => (
                <Column
                  switcher={switcher}
                  setSwitcher={setSwitcher}
                  key={column.category}
                  title={column.category}
                  tasks={column.tasks}
                  index={index}
                />
              ))
            ) : (
              <h1>No current cards</h1>
            )
          ) : (
            <h1>Loading Content . . .</h1>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
