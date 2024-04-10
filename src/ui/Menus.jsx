import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside.js";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  // the purpose of this menu is provide state that stores the state of the clicked row and position of the Toggle styled Button clicked which are passed to the list to determine their position

  //. two states of openid(id of cabin id at theta at that cabinRow, and the positio  of the clicked butto  see below
  // alsop provides values via a context provider of the openId, close- setopenId(""), open-setopenId(cabinIdat tehta row), position, setPosition
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  //Toggle- the purpose of this the theree vertical buttons is to set a position depending on the closet parent when clicked, set id of the row of the cabin at the clicked position and , closing it if clicked again, and also closing it if its clicked in another position, initially when its closed the open Id is a "", when clicked the open Id is set on click if the current passed id, if its clikcked again , it calls the close setter which sets openId to an empty button- this causes the list to umount, if its clicked in anotehr place, the lists unmounts in the row where its was also not clicked because openId!== id but mounts in another row as openId is set to  that value
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button")?.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    //set open id (cabin) if ists empty or its n]different to the one currents set at openId open(id), if its not empty close it eitehr way, this will allow it to close when clicked twice,- can have differnet states "" or "id"
    openId === "" || openId !== id ? open(id) : close();
  }

  // the threee vertical dots which is alwayss visisble
  return (
    <StyledToggle onClick={handleClick}>
      {" "}
      <HiEllipsisVertical />{" "}
    </StyledToggle>
  );
}
function List({ id, children }) {
  // mounts a list of buttons if the id passed is equal to the openId state- it is a child of toogle which will close the menu if its the same to ensure that the clicked row is the same and

  const { openId, position, close } = useContext(MenusContext);

  const ref = useClickOutside(close, false);

  // what this does is once u click to another row it closes the current one- that only
  if (openId !== id) return null;
  // the list also  set the position based on the clicked button, and
  return createPortal(
    <StyledList position={position} ref={ref}>
      {" "}
      {children}{" "}
    </StyledList>,
    document.body
  );
}
function Button({ children, icon, onClick }) {
  // recieves a buttton that tells it what to do wwhen clicked claleld on if it exists and closes the menu after wards

  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

//the menus.menu is the  three vertical dots, the Menus.Toggle passes the id of the clicked row cabin which sets the open state or switches to differnet rows when clicked, when its same with the clicked dots-(its always the same) unless u click it again which sets the open state to an open string , the list is mounted and the list displays the list of button which  can recive an onclick handler as prop

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
