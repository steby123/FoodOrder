import React,{createContext, useReducer} from "react";

const CartContext = createContext({
    items:[],
    addItem : (item) => {},
    removeItem : (id) => {},
    clearCart: () => {}
});


const cartReducer =(state, action) => {
    if(action.type === 'ADD_ITEM'){
         // Mencari indeks item yang sudah ada di dalam keranjang
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        // Membuat salinan array items dari state
        const updateItems =[...state.items]

        // Jika item sudah ada di dalam keranjang
        if(existingCartItemIndex > -1){
             // Mengambil item yang sudah ada
            const existingItem = state.items[existingCartItemIndex]
             // Membuat salinan item yang sudah ada dengan peningkatan jumlah quantity
            const updateItem = {
                ...existingItem,
                quantity:existingItem.quantity + 1
            }
            // Mengganti item yang sudah ada dengan item yang telah diperbarui
            updateItems[existingCartItemIndex] = updateItem;
        }else{
            // Jika item belum ada di dalam keranjang, menambahkan item baru dengan quantity 1
            updateItems.push({
                ...action.item, 
                quantity:1
            })
        }

        // Mengembalikan state yang baru setelah memperbarui items
        return {...state, items: updateItems}
    }

    if(action.type === 'REMOVE_ITEM'){
        // Temukan indeks item dengan id tertentu dalam array items
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        // Dapatkan item yang sudah ada dari array items
        const existingCartItem = state.items[existingCartItemIndex];

         // Buat salinan array items
        const updateItems = [...state.items];

        // Periksa apakah kuantitas item yang sudah ada adalah 1
        if(existingCartItem.quantity === 1){
            // Jika kuantitasnya 1, hapus item dari array
            updateItems.splice(existingCartItemIndex, 1);
        } else{
            // Jika kuantitasnya lebih dari 1, perbarui kuantitas item yang sudah ada
            const updateItem = {
                ...existingCartItem, 
                quantity:existingCartItem.quantity - 1
            }
            // Perbarui array items dengan item yang telah dimodifikasi
            updateItems[existingCartItemIndex] = updateItem;
        };

        // Kembalikan objek state baru dengan array items yang telah diperbarui
        return {
            ...state, 
            items: updateItems
        }
    }

    if(action.type === "CLEAR_CART"){
        return {
            ...state, 
            items:[]
        }
    }

    return state
}

export function CartConntextProvider ({children}) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {
        items:[],
    });

    const addItem = (item) => {
        dispatchCartAction({
            type:'ADD_ITEM',
            item
        })
    }

    const removeItem = (id) => {
        dispatchCartAction({
            type:'REMOVE_ITEM',
            id
        })
    }

    const clearCart = () => {
        dispatchCartAction({
            type:'CLEAR_CART'
        })
    }
    
    const cartContext = {
        items:cart.items,
        addItem,
        removeItem,
        clearCart
    }

    console.log(cartContext);

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;
