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

const [state, dispatch] = useReducer(cartReducer, CART_INITIALSTATE);

const addProductToCart = ( product: ICartProduct) => {
     // Nivel 1
     // dispath({ type: '[Cart] - Add Product', payload: product})

     // Nivel 2
     // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size);
     // dispatch({ type: '[Cart] - Update products in cart', payload: [...productsInCart, product] });

     // Nivel Final
     const productInCart = state.cart.some( p => p._id === product._id);
     if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product]})

     const productWithDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );
     if ( !productWithDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product]})

     // Acumular
     const updateProducts = state.cart.map( p => {
          if ( p._id !== product._id ) return p;
          if ( p.size !== product.size ) return p;

          // Actualizar la cantidad
          p.quantity += product.quantity;
          return p;
     });

     dispatch({ type: '[Cart] - Update products in cart', payload: updateProducts});

}

return (
    <CartContext.Provider value={{
     ...state,

     // Methods
     addProductToCart,
    }}>
     {children}
    </CartContext.Provider>
)
}