import { ICartProduct } from 'interfaces';
import React, { FC, useReducer } from 'react'
import { CartContext, cartReducer } from './';

export interface CartState {
     cart: ICartProduct[];
}

const CART_INITIALSTATE: CartState = {
     cart: [],
}

export const CartProvider:FC = ({children}: any) => {

const [state,dispath] = useReducer(cartReducer, CART_INITIALSTATE);

return (
    <CartContext.Provider value={{
     ...state,
    }}>
     {children}
    </CartContext.Provider>
)
}