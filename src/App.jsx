import Header from "./component/Header";
import Center from "./component/Center";
import { useState } from "react";
function App() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <div className="">
      {/* Header Section */}
      <Header
        boardModalOpen={boardModalOpen}
        setBoardModalOpen={setBoardModalOpen}
      />

      {/* Center Section */}
      <Center />
    </div>
  );
}

export default App;
