import React, { useState } from "react";
import logo from "../assets/logo-mobile.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import ElipsisMenu from "./ElipsisMenu";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/bordersSlice";
const Header = ({ boardModalOpen, setBoardModalOpen }) => {
  const dispatch = useDispatch();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isElipsisOpen, setIsElipsisOpen] = useState(false);
  const [boadType, setBoadType] = useState("add");
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsElipsisOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisOpen(false);
  };
  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard());
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    setIsDeleteModalOpen(false);
  };

  const onDropownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisOpen(false);
    setBoadType("add");
  };
  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2d37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* Left side */}

        <div className="flex items-center space-x-2 md:space-x-4">
          <img className="h-6 w-6" src={logo} alt="logo" />
          <h3 className=" hidden md:inline-block font-bold font-sans md:test-4xl ">
            kanban
          </h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              {board.name}
            </h3>
            <img
              className="w-3 ml-2 md:hidden cursor-pointer"
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown icon"
              onClick={() => {
                onDropownClick();
              }}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex space-x-4 items-center md:space-x-6">
          <button
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
            className="hidden md:block button"
          >
            +Add New Task
          </button>
          <button
            className=" button py-1 px-3 md:hidden"
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
          >
            +
          </button>
          <img
            src={elipsis}
            onClick={() => {
              setBoadType("editq");
              setOpenDropdown(false);
              setIsElipsisOpen((state) => !state);
            }}
            alt="elipsis"
            className="cursor-pointer h-6"
          />
          {isElipsisOpen && (
            <ElipsisMenu
              setOpenDeleteModal={setOpenDeleteModal}
              setOpenEditModal={setOpenEditModal}
              type="Boards"
            />
          )}
        </div>
      </header>

      {openDropdown && (
        <HeaderDropdown
          setBoardModalOpen={setBoardModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      )}
      {boardModalOpen && (
        <AddEditBoardModal
          type={boadType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}
      {openAddEditTask && (
        <AddEditTaskModal
          setOpenAddEditTask={setOpenAddEditTask}
          device="mobile"
          type={"add"}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          type={"board"}
          title={board.name}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
};

export default Header;
