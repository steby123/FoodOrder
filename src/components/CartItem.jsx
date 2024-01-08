import React from "react";
import currencyFormatter from "../util/formatting";

const CartItem = ({name, quantity, price, onIncrease, onDecrease}) => {
    const formatter = currencyFormatter();

    return(
        <li className="cart-item">
            <p>
                {name} - {quantity} x {formatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    )
}

export default CartItem;