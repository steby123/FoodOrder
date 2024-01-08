import React,{useContext} from "react";
import logoImg from "../assets/logo.jpg"
import Button from "./UI/Button";
import CartContext from "./store/CartContext";
import ProgressContext from "./store/UserProgressContext";

const Header = () => {
    const cartCtx = useContext(CartContext);

    const userProgressCtx =  useContext(ProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumber, item) =>{
        return totalNumber + item.quantity
    },0);

    const handleShowCart = () => {
        userProgressCtx.showCart();
    }

    return(
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A Restoraunt"/>
                <h1>Food Order</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    Cart ({totalCartItems})
                </Button>
            </nav>
        </header>
    )
}

export default Header;