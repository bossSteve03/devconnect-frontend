import React from "react";
import styles from "./index.module.css";

function Modal({ closeModal }) {
  const handleClose = () => {
    closeModal(false);
  };
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <form>
          <input type="text" placeholder="your task" />
          <select id="categories">
            <option value="Category">Category</option>
            <option value="Todo">Todo</option>
            <option value="In Progess">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button type="submit">Update</button>
          <button type="submit" onClick={handleClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
