import Cart from "./components/Cart";
import Checkout from "./components/CheckOut";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartConntextProvider } from "./components/store/CartContext";
import { UserProgressContextProvider } from "./components/store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartConntextProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
      </CartConntextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
