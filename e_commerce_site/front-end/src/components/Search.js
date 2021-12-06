import React from 'react'
import { useNavigate } from 'react-router-dom'


const Search = ({ productData, setProducts }) => {

  let search = ''
  const navigate = useNavigate()

  const filterCharities = () => {
    const regExSearch = new RegExp(search, 'i')
    console.log('regex', regExSearch)
    setProducts(productData.filter(charity => {
      return regExSearch.test(charity.names[0].value)
    }))
  }

  const handleTextInput = (event) => {
    search = event.target.value
    filterCharities()
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