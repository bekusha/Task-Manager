import React, { useState } from "react";
import logo from "../assets/logo-mobile.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
const Header = ({ boardModalOpen, setBoardModalOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [boadType, setBoadType] = useState("add");
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
              board Name
            </h3>
            <img
              className="w-3 ml-2 md:hidden cursor-pointer"
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown icon"
              onClick={() => {
                setOpenDropdown((state) => !state);
              }}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex space-x-4 items-center md:space-x-6">
          <button className="hidden md:block button">+Add New Task</button>
          <button className=" button py-1 px-3 md:hidden">+</button>
          <img src={elipsis} alt="elipsis" className="cursor-pointer h-6" />
        </div>
      </header>

      {openDropdown && (
        <HeaderDropdown
          setBoardModalOpen={setBoardModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      )}
      {boardModalOpen && (
        <AddEditBoardModal type="add" setBoardModalOpen={setBoardModalOpen} />
      )}
    </div>
  );
};

export default Header;
