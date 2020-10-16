import React from "react";
import { Navbar } from "./components/Navbar";
import { MainContainer } from "./components/MainContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LoadMore } from "./components/LoadMore";
import { StateProvider } from "./store.js";

function App() {
  return (
    <StateProvider>
      <DndProvider backend={HTML5Backend}>
        <Navbar />
        <MainContainer />
        <LoadMore />
      </DndProvider>
    </StateProvider>
  );
}

export default App;
