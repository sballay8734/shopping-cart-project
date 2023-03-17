const cartContainer = document.querySelector('[data-cart-container]')
const cartItemsContainer = document.querySelector('[data-cart-items]')
const cartItemTemplate = document.querySelector('#cart-item-template')
const cartTotal = document.querySelector('[data-cart-total]')
const cartItemsCounter = document.querySelector('[data-cart-items-counter]')
const cartButton = document.querySelector('[data-cart-button]')

const IMAGE_URL = 'https://dummyimage.com/210x130'
const LS_PREFIX = 'SHOPPING_CART_PROJECT'
import items from './items.json'
import formatCurrency from './util/formatCurrency'

let cart = []

export function setUpCart() {
  cart = loadCart()
  cartItemsContainer.innerHTML = ''
  cartTotal.innerText = ''
  cartItemsCounter.innerText = ''

  if (cart.length === 0) {
    cartButton.classList.add('invisible')
    cartContainer.classList.add('invisible')
  } else {
    cartButton.classList.remove('invisible')
  }

  cart.forEach((item) => {
    const cartItem = cartItemTemplate.content.cloneNode(true)
    const workingItem = items.find((i) => item.itemId === i.id)

    const image = cartItem.querySelector('[data-image]')
    image.src = `${IMAGE_URL}/${workingItem.imageColor}/${workingItem.imageColor}`

    const name = cartItem.querySelector('[data-name]')
    name.innerText = workingItem.name

    const quantity = cartItem.querySelector('[data-quantity]')
    if (item.quantity > 1) {
      quantity.innerText = `x${item.quantity}`
    }

    const price = cartItem.querySelector('[data-price]')
    price.innerText = formatCurrency(
      (workingItem.priceCents * item.quantity) / 100
    )

    const removeButton = cartItem.querySelector(
      '[data-remove-from-cart-button]'
    )
    removeButton.addEventListener('click', (e) => {
      removeItemFromCart(item)
    })

    cartTotal.innerText = calcCartTotal()

    cartItemsCounter.innerText = cart.length

    cartItemsContainer.appendChild(cartItem)
  })
}

function calcCartTotal() {
  let totalValue = 0
  cart.forEach((item) => {
    const workingItem = items.find((i) => item.itemId === i.id)
    totalValue += (workingItem.priceCents * item.quantity) / 100
  })
  return formatCurrency(totalValue)
}

export function addItemToCart(item) {
  const itemExists = cart.find((i) => item.id === i.itemId)
  if (itemExists) {
    itemExists.quantity++
  } else {
    cart.push({ itemId: item.id, quantity: 1 })
  }
  saveCart()
  cart = loadCart()
  setUpCart()
}

export function removeItemFromCart(item) {
  const itemExists = cart.find((i) => item.itemId === i.itemId)
  if (itemExists.quantity > 1) {
    itemExists.quantity--
  } else {
    const newCart = cart.filter((i) => item.itemId !== i.itemId)
    cart = newCart
  }
  saveCart()
  setUpCart()
}

function saveCart() {
  localStorage.setItem(LS_PREFIX, JSON.stringify(cart))
}

export function loadCart() {
  const item = localStorage.getItem(LS_PREFIX)
  return JSON.parse(item) || []
}
