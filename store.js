import items from './items.json'
import formatCurrency from './util/formatCurrency'
import cart from './script.js'
import { addItemToCart } from './cart.js'

const storeItemTemplate = document.querySelector('#store-item-template')
const storeItemContainer = document.querySelector('#store-items-container')
const IMAGE_URL = 'https://dummyimage.com/420x260'

export function setUpStore() {
  items.forEach(renderStoreItem)
}

function renderStoreItem(item) {
  if (!storeItemTemplate) return
  const storeItem = storeItemTemplate.content.cloneNode(true)

  const container = storeItem.querySelector('[data-store-item]')
  container.dataset.itemId = item.id

  const image = storeItem.querySelector('[data-image]')
  image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

  const category = storeItem.querySelector('[data-category]')
  category.innerText = item.category

  const name = storeItem.querySelector('[data-name]')
  name.innerText = item.name

  const price = storeItem.querySelector('[data-price]')
  price.innerText = formatCurrency(item.priceCents / 100)

  const addButton = storeItem.querySelector('[data-add-to-cart-button]')
  addButton.addEventListener('click', (e) => {
    addItemToCart(item)
  })

  storeItemContainer.appendChild(storeItem)
}
