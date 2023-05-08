import React, { useState, useEffect } from "react";
import { useProjects } from "../../context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "../Modal";
import styles from "./index.module.css";

// Task component
const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/kanban/task/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const Task = ({ task, index }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleUpdate = () => {
    setOpenModal(true);
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
          <div className={styles.taskContainer}>
            <button className={styles.deleteBtn}>X</button>
            {task.title}
            <button className={styles.updateBtn} onClick={handleUpdate}>
              U
            </button>
            {openModal && <Modal closeModal={setOpenModal} />}
          </div>
        </div>
      )}
    </Draggable>
  );
};

// Column component
const Column = ({ title, tasks, index }) => {
  return (
    <div className={styles.column}>
      <h3>{title}</h3>
      <Droppable droppableId={title}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div>
              {tasks &&
                tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
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
  const [kanbanId, setKanbanId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [columns, setColumns] = useState([]);

  const { projects } = useProjects();
  console.log(projects);

  useEffect(() => {
    const getKanban = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/kanban/1");
        const data = await response.json();
        setKanbanId(data["ID"]);
      } catch (error) {
        console.log(error);
      }
    };
    getKanban();
  });

  const handlerTaskInput = (e) => {
    setTitle(e.target.value);
  };

  const handlerTaskCategory = (e) => {
    setCategory(e.target.value);
  };

  const handlerAdd = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: title,
        category: category,
        objective: "obj",
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
      console.log(response);
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/kanban/task/${kanbanId}`
      );
      const data = await response.json();
      const tasks = data;
      // Create a map to store the columns
      const columnMap = {};
      tasks.forEach((task) => {
        const category = task.category;
        // If the column for the category doesn't exist, create a new column
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
    };
    getTasks();
  }, [kanbanId, title, category]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

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
    const newColumns = [...columns];
    const [removed] = sourceColumn.tasks.splice(source.index, 1);
    destinationColumn.tasks.splice(destination.index, 0, removed);
    setColumns(newColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1>Kanban Board</h1>
      <div className={styles.board}>
        {columns.map((column, index) => (
          <Column
            key={column.category}
            title={column.category}
            tasks={column.tasks}
            index={index}
          />
        ))}
      </div>
      <form>
        <input
          type="text"
          placeholder="your task"
          onChange={handlerTaskInput}
        />
        <select onChange={handlerTaskCategory} id="categories">
          <option value="Category">Category</option>
          <option value="Todo">Todo</option>
          <option value="In Progess">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit" onClick={handlerAdd}>
          Add
        </button>
      </form>
    </DragDropContext>
  );
};

export default KanbanBoard;
