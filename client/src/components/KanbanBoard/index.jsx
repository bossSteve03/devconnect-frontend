import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./index.module.css";

// Task component
const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className={styles.task}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.title}
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
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

// Board component
const KanbanBoard = () => {
  const [columns, setColumns] = useState([
    {
      title: "Todo",
      tasks: [
        { id: "task-1", title: "Task 1" },
        { id: "task-2", title: "Task 2" },
        { id: "task-3", title: "Task 3" },
      ],
    },
    {
      title: "In Progress",
      tasks: [
        { id: "task-4", title: "Task 4" },
        { id: "task-5", title: "Task 5" },
      ],
    },
    {
      title: "Done",
      tasks: [
        { id: "task-6", title: "Task 6" },
        { id: "task-7", title: "Task 7" },
        { id: "task-8", title: "Task 8" },
      ],
    },
  ]);

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

    // Update columns state
    const newColumns = [...columns];
    const sourceColumn = newColumns.find(
      (column) => column.title === source.droppableId
    );
    const destinationColumn = newColumns.find(
      (column) => column.title === destination.droppableId
    );
    const [removed] = sourceColumn.tasks.splice(source.index, 1);
    destinationColumn.tasks.splice(destination.index, 0, removed);
    setColumns(newColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        {columns.map((column, index) => (
          <Column
            key={column.title}
            title={column.title}
            tasks={column.tasks}
            index={index}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
