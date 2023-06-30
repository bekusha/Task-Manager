import React from "react";
import { useDispatch } from "react-redux";
import useDarkMode from "../Hooks/useDarkMode";
import { useState } from "react";
import { useSelector } from "react-redux";
import boardsSlice from "../redux/bordersSlice";
import boardIcon from "../assets/icon-board.svg";

const SideBar = ({ setSideBarOpen, isSideBarOpen }) => {
  const dispatch = useDispatch();
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  const boards = useSelector((state) => state.boards);
  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? "min-w-[261px] bg-white dark:bg-[#2b2c37] fixed top-[72px] h-screen items-center left-0 z-20"
            : "bg-[#635fc7] dark:bg-[#2b2cc37] dark:hover:bg-[#635fc7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed w-[56px] h-[48px] rounded-r-full "
        }
      >
        <div>
          {/* Rewrite Modal */}
          {isSideBarOpen && (
            <div className="bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl ">
              <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                All Boards ({boards?.length})
              </h3>
              <div className="flex flex-col h-[70vh] justify-between ">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white ${
                        board.isActive &&
                        "bg-[#635fc7] rounded-r-full text-white mr-8 "
                      }`}
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                    >
                      <img src={boardIcon} alt="s" className="h-4" />
                      <p className="text-lg font-bold">{board.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
