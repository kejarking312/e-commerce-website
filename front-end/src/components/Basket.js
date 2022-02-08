import React from 'react'

const Basket = ({ items, removeItem, quantities }) => {
  return (
    <ul className='list'>
      {items.map((item, index) => (
        <li className='list-item' key="item_id">
          {console.log(quantities)}
          <span>{quantities[index]}x</span>
          <span> {item}</span>
          <button className='list-delete' onClick={() => removeItem(item)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Basket