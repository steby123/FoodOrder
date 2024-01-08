import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "./store/CartContext";
import currencyFormatter from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import ProgressContext from "./store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    }
}

const Checkout = () => {
    const CartCtx = useContext(CartContext);

    const userProgressCtx = useContext(ProgressContext);

    const {
        data, 
        isLoading: isSetLoading, 
        error, 
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig)

    const CartTotal = CartCtx.items.reduce((totalPrice, item) => 
        totalPrice + item.quantity
    ,0)
    const formatter = currencyFormatter();

    const handleCloseCheckOut = () => {
        userProgressCtx.hideCart();
    }

    const handleFinish = () => {
        userProgressCtx.hideCart();
        CartCtx.clearCart();
        clearData();
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        console.log(customerData);

        sendRequest(JSON.stringify({
            order:{
                items: CartCtx.items,
                customer: customerData
            }
        }));

        fetch('http://localhost:3000/orders',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order:{
                    items: CartCtx.items,
                    customer: customerData
                }
            })
        });

    }

    let action = (
        <>
            <Button type="button" textOnly onClick={handleCloseCheckOut}> 
                Close 
                </Button>
            <Button> 
                Submit Order
            </Button>
        </>
    )

    if(isSetLoading){
        action = <span>Sending...</span>
    }

    if(data && !error){
        return(
            <Modal 
                open={userProgressCtx.progress === "CHECK_OUT"} 
                onClose={handleFinish}
            >
                <h2>Succes!</h2>
                <p>Your was order submitted succesfully</p>
                <p>We will get back to you with more details via email within the next few minutes.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}> Close </Button>
                </p>
            </Modal>
        )
    }

    return(
        <Modal open={userProgressCtx.progress === "CHECK_OUT"} onClose={handleCloseCheckOut} >
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {formatter.format(CartTotal)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-Mail Address" id="email" type="email" />
                <Input label="Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                {error && <Error title="Failed to submit order" message={error}/>}
                <p className="modal-actions">
                    {action}
                </p>
            </form>
        </Modal>
    )
}

export default Checkout;