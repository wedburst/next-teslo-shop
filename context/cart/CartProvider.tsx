import React, { FC, useEffect, useReducer } from "react";
import Cookie from "js-cookie";

import { ICartProduct } from "interfaces";
import { CartContext, cartReducer } from "./";

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
  firstName: string;
  lastName : string;
  address  : string;
  address2?: string;
  zip      : string;
  city     : string;
  country  : string;
  phone    : string;
};

const CART_INITIALSTATE: CartState = {
  //   cart: [],
  isLoaded: false,
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

export const CartProvider: FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIALSTATE);

  // Efecto
  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {

    if (Cookie.get("firstName")) {
      const cookiesAddress = {
        firstName: Cookie.get("firstName") || "",
        lastName: Cookie.get("lastName") || "",
        address: Cookie.get("address") || "",
        address2: Cookie.get("address2") || "",
        zip: Cookie.get("zip") || "",
        city: Cookie.get("city") || "",
        country: Cookie.get("country") || "",
        phone: Cookie.get("phone") || "",
      }
  
      dispatch({
        type: "[Cart] - LoadAdrees from cookies",
        payload: cookiesAddress,
      });
    }
 
  }, [])
  

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const OrderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    // console.log({ OrderSummary });
    dispatch({type: '[Cart] - Update order sumary', payload: OrderSummary})
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    // Nivel 1
    // dispath({ type: '[Cart] - Add Product', payload: product})

    // Nivel 2
    // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size);
    // dispatch({ type: '[Cart] - Update products in cart', payload: [...productsInCart, product] });

    // Nivel Final
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    const productWithDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productWithDifferentSize)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    // Acumular
    const updateProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // Actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: "[Cart] - Update products in cart",
      payload: updateProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Change cart quantity", payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Remove product in cart", payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        addProductToCart,
        removeCartProduct,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
