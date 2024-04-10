import { cloneElement, createContext, useContext, useState } from "react";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import useClickOutside from "../hooks/useClickOutside.js";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  // recieves children, has teh opene Name state with "" has initila state, manipulates this by close -setting it to "" and open =setOpenName where the name of the open state is passed

  // provides the open, close and openName(presumaly used when its set) thorugh a context provider

  // diplays the children
  const [openName, setOPenName] = useState("");

  const close = () => setOPenName("");
  const open = setOPenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {" "}
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: openWindowsName }) {
  // receives children, and opens prop, adds onClick => open(recived opens) to the children using the cloneElement- displays children
  // the onclick allows them to set openName through open when clicked
  const { open } = useContext(ModalContext);
  return <div onClick={() => open(openWindowsName)}>{children}</div>;

  // error below ?? when the Modal.Open> {check && component is used} ??
  // return cloneElement(children, { onClick: () => open(openWindowsName) }); // does this have to be an html attribute of event handler
}

function Window({ children, name }) {
  // receives children, and opens prop, adds onClick => open(recived opens) to the children using the cloneElement- displays children
  const { openName, close } = useContext(ModalContext);

  const ref = useClickOutside(close);
  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body // used to avoid the conflict with overflow set to hidden??
  );
}
// how the modal works- the modal working parts are the Open and Window commponent, the two explicityly receive props of opens and name  which are matched to open the right window, the Open componen is where the matching happens because the open state is set here, for a child to do this the cloneElement is used to attach to the children passed to Open a onClick handler, this handler ensures that when the child is clicked, its add the opens string to open State. The Window is opened if its name and the open state match, its also opened in a portal w which allows them to be direct children of the body element (overlaying evrything else) and therefore apply all the styled position position, the window has a button represnted by x which calls close-closing it. The Open components children are  always displayed when the Modal is mounted.the Window can also be mounted on clicking outside- see how ClickOutside works and the cpaturing phase solution  the window also adds the close function as state to the children by cloning, for CreateCabinForm it used to close the cabin once the data is posted(edit sucssefully)

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
