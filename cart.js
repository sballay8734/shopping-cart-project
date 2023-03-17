import { formatCurrency } from './util/formatCurrency'

const cartContainer = document.querySelector('#cart-container')
const cartButtonToggle = document.querySelector('#cart-button-toggle')
const cartItemsContainer = document.querySelector('#cart-items-container')
const cartItemTemplate = document.querySelector('#cart-item-template')
const cartTotalPrice = document.querySelector('[data-cart-total-price]')
const cartItemsTotalPrice = document.querySelector('#cart-items-total-price')
const cartCounter = document.querySelector('#cart-counter')
const IMG_BASE_URL = 'https://dummyimage.com/210x130'
const SS_KEY = 'SHOPPING_CART_PROJECT_2'

let cart = []

export function addToCart(item) {
  if (!item.quantity || item.quantity === 0) {
    item.quantity = 1
    cart.push(item)
  } else {
    item.quantity++
  }

  saveCart()
  renderCart()
}

function removeFromCart(item) {
  item.quantity--
  if (item.quantity === 0) {
    const newCart = cart.filter((i) => item.id !== i.id)
    cart = newCart
    cartTotalPrice.innerText = calcCartTotalPrice()
  }

  saveCart()
  renderCart()
}

export function renderCart() {
  cart = loadCart()

  if (cart.length > 0) {
    cartButtonToggle.classList.remove('invisible')
    cartItemsTotalPrice.classList.remove('invisible')
  } else {
    cartButtonToggle.classList.add('invisible')
    cartItemsTotalPrice.classList.add('invisible')
  }

  cartItemsContainer.innerHTML = ''
  cartCounter.innerText = ''

  cart.forEach((item) => {
    const cartItem = cartItemTemplate.content.cloneNode(true)

    const cartItemId = cartItem.querySelector('#cart-item-id')
    cartItemId.dataset.itemId = item.id

    const image = cartItem.querySelector('[data-image')
    image.src = `${IMG_BASE_URL}/${item.imageColor}/${item.imageColor}`

    const name = cartItem.querySelector('[data-name]')
    name.innerText = item.name

    const quantity = cartItem.querySelector('[data-quantity]')
    quantity.innerText = `x${parseInt(item.quantity)}`

    const price = cartItem.querySelector('[data-price]')
    price.innerText = formatCurrency((item.priceCents * item.quantity) / 100)

    const removeFromCartButton = cartItem.querySelector(
      '[data-remove-from-cart-button]'
    )
    removeFromCartButton.addEventListener('click', (e) => {
      removeFromCart(item)
    })

    cartTotalPrice.innerText = calcCartTotalPrice()

    cartCounter.innerText = cart.length

    cartItemsContainer.appendChild(cartItem)
  })

  saveCart()
}

function saveCart() {
  sessionStorage.setItem(SS_KEY, JSON.stringify(cart))
}

export function loadCart() {
  const cartItems = sessionStorage.getItem(SS_KEY)
  return JSON.parse(cartItems) || []
}

function calcCartTotalPrice() {
  let totalPrice = 0
  cart.forEach((item) => {
    totalPrice += (item.priceCents * item.quantity) / 100
  })

  return formatCurrency(totalPrice)
}

cartButtonToggle.addEventListener('click', (e) => {
  cartContainer.classList.toggle('invisible')
})
