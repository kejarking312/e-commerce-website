import { useState } from 'react'
import BasketList from './BasketList'
import BasketInput from './BasketInput'


const BasketShow = () => {
  const [items, setItems] = useState([])
  const [quantities, setQuantities] = useState('')
  const addItem = (item) => {
    setItems([...items, item])
  }

  const removeItem = (item) => {
    setItems(items.filter((x) => x !== item))
  }

  const addQuantity = (quantity) => {
    setQuantities([...quantities, quantity])
  }

  return (
    <div className="shopping-list">
      <header>
        <div className="container">
          <h3 className="header-title">Shopping List Generator</h3>
        </div>
      </header>
      <div className="container main">
        <BasketInput addItem={addItem} addQuantity={addQuantity} />
        <div className="list-results">
          <BasketList
            items={items}
            removeItem={removeItem}
            quantities={quantities}
          />
        </div>
      </div>
    </div>
  )
}
export default BasketShow