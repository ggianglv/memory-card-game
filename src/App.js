import React, { useReducer, useState, Suspense, useMemo } from "react";
import Board from "./components/Board";
import "./App.css";
import Menu from "./components/Menu";
import Title from "./components/Title";
import Modal from "./components/Modal";
import { appReducer, initialState } from "./reducers";
import { AppContext } from "./context";

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [ModalComponent, setModalComponent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = ({ title, component }) => {
    setModalTitle(title);
    setModalComponent(component);
  };

  const closeModal = () => {
    setModalTitle("");
    setModalComponent(null);
  };

  const onCloseModal = () => {
    setModalComponent(null);
  };

  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [dispatch, state]);

  return (
    <AppContext.Provider value={contextValue}>
      <div className="app">
        <div className="container">
          <Title />
          <Board openModal={openModal} />
          <Menu openModal={openModal} />

          {ModalComponent && (
            <Modal title={modalTitle} onClickClose={onCloseModal}>
              <Suspense fallback={null}>
                <ModalComponent closeModal={closeModal} />
              </Suspense>
            </Modal>
          )}
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
