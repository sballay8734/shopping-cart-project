// List out things you need to do
// show/hide cart with click AND if cart has no items

// cart functionality
// add items to cart
// remove items from cart
// handle multiple of the same item
// update prices
import items from './items.json'
import { formatCurrency } from './util/formatCurrency'
import { addToCart } from './cart'

const storeItemContainer = document.querySelector('#store-item-container')
const storeItemTemplate = document.querySelector('#store-item-template')
const IMG_BASE_URL = 'https://dummyimage.com/420x260'

export function setUpStore() {
  items.forEach(renderStoreItem)
}

function renderStoreItem(item) {
  if (!storeItemContainer) return
  const storeItem = storeItemTemplate.content.cloneNode(true)
  const storeItemId = storeItem.querySelector('#store-item-id')

  storeItemId.dataset.itemId = item.id

  const image = storeItem.querySelector('[data-image]')
  image.src = `${IMG_BASE_URL}/${item.imageColor}/${item.imageColor}`

  const name = storeItem.querySelector('[data-name]')
  name.innerText = item.name

  const category = storeItem.querySelector('[data-category]')
  category.innerText = item.category

  const price = storeItem.querySelector('[data-price]')
  price.innerText = formatCurrency(item.priceCents / 100)

  const addButton = storeItem.querySelector('[data-add-to-cart-button]')
  addButton.addEventListener('click', (e) => {
    addToCart(item)
  })

  storeItemContainer.appendChild(storeItem)
}
