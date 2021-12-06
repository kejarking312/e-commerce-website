import React from 'react'
import Form from 'react-bootstrap/Form'



const ProductForm = ({ formInputProps }) => {
  const handleFormChange = formInputProps.handleFormChange


  return (
    <>
      <Form.Control
        name='brand'
        type='text'
        placeholder='Item Brand'
        onChange={handleFormChange}
        {...formInputProps} />
      <Form.Control
        name='Type'
        type='text'
        placeholder='Type of clothing'
        onChange={handleFormChange}
        {...formInputProps} />
      <Form.Control
        name='colour'
        type='text'
        placeholder='Item Colour'
        onChange={handleFormChange}
        {...formInputProps} />
      <Form.Control
        name='size'
        type='text'
        placeholder='Size'
        onChange={handleFormChange}
        {...formInputProps} />
      <Form.Control
        name='price'
        type='number'
        placeholder='Price'
        onChange={handleFormChange}
        {...formInputProps} />
      <Form.Select
        name='category'
        type='text'
        placeholder='Item Category'
        onChange={handleFormChange}
        {...formInputProps} >
        <option value='1'>Mens</option>
        <option value='2'>Womens</option>
        <option value='3'>Kids</option>
      </Form.Select>
      <Form.Control
        name='desciption'
        type='text'
        placeholder='Tell us about your product'
        onChange={handleFormChange}
        {...formInputProps} />
      <Form.Control
        name='image'
        type='text'
        placeholder='<Copy Image Url Here>'
        onChange={handleFormChange}
        {...formInputProps} />
    </>
  )
}

export default ProductForm
