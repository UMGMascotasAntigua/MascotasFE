import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
  private cart: any[] = [];
  constructor() { 
    const storedCart = localStorage.getItem('cart');
    if(storedCart){
      this.cart = JSON.parse(storedCart);
    }
  }

  addToCart(prd: any){
    this.cart.push(prd);
    this.saveCart()
  }

  getCart(): any[]{
    return this.cart;
  }

  private saveCart(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }
}
