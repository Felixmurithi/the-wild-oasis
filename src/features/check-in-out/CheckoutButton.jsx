import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { isCheckout, checkout } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckout}
    >
      Check out
    </Button>
  );

  // what is acllback function onCLick= {checkout()} vs onCLick= {()=>checkout()}
}

export default CheckoutButton;
