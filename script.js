import { setUpStore } from './store.js'
import { setUpCart } from './cart.js'
import { loadCart } from './cart.js'
const cartContainer = document.querySelector('[data-cart-container]')
const cartItems = document.querySelector('[data-cart-items]')
const cartButton = document.querySelector('[data-cart-button]')

loadCart()
setUpCart()

setUpStore()

cartButton.addEventListener('click', (e) => {
  cartContainer.classList.toggle('invisible')
})
