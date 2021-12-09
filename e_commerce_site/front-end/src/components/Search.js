import React from 'react'
import { useNavigate } from 'react-router-dom'


const Search = ({ productsData, setProducts }) => {
  console.log('productsData', productsData)

  let search = ''
  const navigate = useNavigate()

  const filterProducts = () => {
    const regExSearch = new RegExp(search, 'i')
    console.log('regex', regExSearch)
    setProducts(productsData.filter(product => {
      return regExSearch.test(product.brand)
    }))
  }

  const handleTextInput = (event) => {
    search = event.target.value
    filterProducts()
    navigate('/products/')
  }




  return (
    <div className="search-component">
      {/* <label htmlFor="search" id="search-label">Search:</label> */}
      <input type="text" id="search" placeholder="Search" autoComplete="off" onChange={handleTextInput} />
    </div>
  )
}

export default Search