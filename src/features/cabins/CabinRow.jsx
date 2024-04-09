import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  //The cabin is an iteration of cabins prop passed from useCabins- which is just the fetching of the cabins data, this data is destrcutured into the cabin data including name, price
  // the cabin data is injected  several table rows
  // one of teh table row is a div that  handles duplication, editing and  deletion
  // duplicating is handled by callling the createCabin(createEditCabin) functiion from useCreateCabin.js mutation  hooks, the necabin data passed, is the data at that cabin row

  // deleting and editing are handled insided a Modal

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin> {name}</Cabin>
      <div> Fits up to {maxCapacity} </div>
      <Price> {formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          {/* the menus.menu is the  three vertical dots, the Menus.Toggle passes the id of the clicked row cabin which sets the open state or switches to differnet rows when clicked, when its same with the clicked dots (its always the same) unless u click it again which sets the open state to an open string , the list is mounted and the list displays the list of button some of which recive an onclick handler. the first btton passes an onclick handler, the two others are cloned with an onclick hander from the modal which ensures that when they are clicked they open ther matching window by checking if their opens prop equal the name of that window, the window when opened has a "x" button which sets the openName state closing the state by failing the match(opens=name), clicking outside also has teh same effect enebaled by a clickOutside reusable  reusable hook  */}
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  disabled={isCreating}
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
          </Menus>

          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;

// ### Menu + Modal pattern

// see use of this pattern in CabinRow,js

// 1. the menus.menu is the three vertical dots,
// 2. the Menus.Toggle passes the id of the clicked row cabin which sets the open state or switches to differnet rows when clicked, when its same with the clicked dots (its always the same) unless u click it again which sets the open state to an open string.
// 3. The list is mounted and the list displays the list of button some of which recive an onclick handler.
// 4. The first button passes an onclick handler, the two others are cloned with an onclick hander from the modal Open Component which ensures that when they are clicked they open ther matching window by checking if their opens prop equal the name of that window, the window when opened has a "x" button which sets the openName state closing the state by failing the match(opens=name), clicking outside also has teh same effect enebaled by a clickOutside reusable reusable hook
