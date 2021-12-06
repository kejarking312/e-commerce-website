import React from 'react'
import { useNavigate } from 'react-router-dom'


const Search = ({ productData, setProducts }) => {

  let search = ''
  const navigate = useNavigate()

  const filterProducts = () => {
    const regExSearch = new RegExp(search, 'i')
    console.log('regex', regExSearch)
    setProducts(productData.filter(product => {
      return regExSearch.test(product.type[0].value)
    }))
  }

  const handleTextInput = (event) => {
    search = event.target.value
    filterProducts()
    navigate('/')
  }




  return (
    <div className="search-component">
      <label htmlFor="search" id="search-label">Search:</label>
      <input type="text" id="search" placeholder="Search" autoComplete="off" onChange={handleTextInput} />
    </div>
  )
}

export default Search