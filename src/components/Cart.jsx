import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "./store/CartContext";
import currencyFormatter from "../util/formatting";
import Button from "./UI/Button";
import ProgressContext from "./store/UserProgressContext"; 
import CartItem from "./CartItem";

const Cart = () => {
    const formatter = currencyFormatter();
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(ProgressContext);

    const cartTotal = cartCtx.items.reduce((totaPrice, item) => {
        return totaPrice + item.quantity * item.price
    },0)
    
    const handleCloseCart = () => {
        userProgressCtx.hideCart()
    }

    const handleCheckOut = () => {
        userProgressCtx.showCheckOut();
    }

    return(
        <Modal className="cart" 
            open={userProgressCtx.progress === "CART"} 
            onClose={userProgressCtx.progress === "CART" ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem 
                        key={item.id} 
                        quantity={item.quantity} 
                        name={item.name} 
                        price={item.price}
                        onIncrease={ () => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{formatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}> Close </Button>
                {cartCtx.items.length > 0 && (
                    <Button onClick={handleCheckOut}>Go to Checkout</Button>
                )}
            </p>
        </Modal>
    )
}

export default Cart;