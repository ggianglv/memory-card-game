import React, {
  useReducer,
  useState,
  Suspense,
  useMemo,
  useEffect,
} from "react";
import Board from "./components/Board";
import "./App.css";
import Menu from "./components/Menu";
import Title from "./components/Title";
import Modal from "./components/Modal";
import { appReducer, initialState } from "./reducers";
import { AppContext } from "./context";
import { uuidv4 } from "./utils/data";
import { getUser } from "./services/game";
import { UPDATE_DATA } from "./reducers/actions";

let userId = localStorage.getItem("userId");
if (!userId) {
  userId = uuidv4();
  localStorage.setItem("userId", userId);
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [ModalComponent, setModalComponent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    getUser(userId)
      .then((user) => {
        if (user.complete) {
          return dispatch({
            type: UPDATE_DATA,
            payload: { id: user.id, history: user.history },
          });
        }

        dispatch({
          type: UPDATE_DATA,
          payload: user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

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
