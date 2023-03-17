import items from './items.json'
import { setUpStore } from './store'
import { loadCart } from './cart'
import { renderCart } from './cart'

loadCart()
setUpStore()
renderCart()
