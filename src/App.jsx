import Header from "./component/Header";
import Center from "./component/Center";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import boardsSlice from "./redux/bordersSlice";
import EmptyBoard from "./component/EmptyBoard";
function App() {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  if (!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  }

  const [boardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <div className="overflow-hidden overflow-x-scroll ">
      <>
        {boards.length > 0 ? (
          <>
            <Header
              boardModalOpen={boardModalOpen}
              setBoardModalOpen={setBoardModalOpen}
            />
            <Center />
          </>
        ) : (
          <>
            <EmptyBoard type="add" />
          </>
        )}
      </>
    </div>
  );
}

export default App;
