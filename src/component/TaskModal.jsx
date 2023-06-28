import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import ElipsisMenu from "./ElipsisMenu";
const TaskModal = ({ colIndex, taskIndex, setIsTaskModalOpen }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((column, i) => colIndex === i);
  const task = col.tasks.find((col, i) => taskIndex === i);
  const subtasks = task.subtasks;

  let completed = 0;

  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });
  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [elipsisModalOpen, setElipsisModalOpen] = useState(false);

  const setOpenEditModal = () => {};

  const setOpenDeleteModal = () => {};

  return (
    <div className="fixed right-0 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 bottom-0 justify-center items-center flex bg-[#00000080]  ">
      {/* Modal Section */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl ">
        <div className="relative flex justify-between w-full items-center ">
          <h1 className="text-lg">{task.title}</h1>
          <img
            onClick={() => {
              setElipsisModalOpen((state) => !state);
            }}
            className="cursor-pointer h-6"
            src={elipsis}
          />
          {elipsisModalOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
