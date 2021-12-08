import React from 'react'
import Form from 'react-bootstrap/Form'



const ProductForm = ({ formInputProps }) => {
  const handleFormChange = formInputProps.handleFormChange

  // const state = { 
  //   templateId: '1',
  // }

  return (
    <>
      <Form.Control
        name='brand'
        type='text'
        placeholder='Item Brand'
        onChange={handleFormChange}
        {...formInputProps} />
      <Form.Control
        name='product_model'
        type='text'
        placeholder='Item Description'
        onChange={handleFormChange}
        {...formInputProps} />
      <Form.Control
        name='type'
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
      <Form.Select
        name='size'
        type='text'
        placeholder='Size'
        onChange={handleFormChange}
        {...formInputProps} >
        <option value="">Choose Your Size</option>
        <option value="L">Large</option>
        <option value="Medium">Medium</option>
        <option value="Small">Small</option>
        <option value="12">12</option>
        <option value="10">10</option>
        <option value="8">8</option>
        <option value="Size 4">Size 4</option>
        <option value="Size 5">Size 5</option>
        <option value="Size 6">Size 6</option>
        <option value="Size 7">Size 7</option>
        <option value="Size 8">Size 8</option>
        <option value="size 9">Size 9</option>
        <option value="Size 10">Size 10</option>
        <option value="size 11">Size 11</option>
      </Form.Select>
      <Form.Control
        name='price'
        type='number'
        placeholder='Price'
        onChange={handleFormChange}
        {...formInputProps} />
      <Form.Control
        name='discount_price'
        type='number'
        placeholder='Discounted Price'
        onChange={handleFormChange}
        {...formInputProps} />
      <Form.Select
        name='label'
        type='text'
        placeholder='Label'
        onChange={handleFormChange}
        // defaultValue={state.templateId}
        {...formInputProps} >
        <option value="">Choose Your Label</option>
        <option value="N">New</option>
        <option value="Best Seller">Best Seller</option>
        <option value="Sale Item">Sale Item</option>
      </Form.Select>
      <Form.Select
        name='categorys'
        type='text'
        placeholder='Item Category'
        onChange={handleFormChange}
        // defaultValue={state.templateId}
        {...formInputProps} >
        <option value="">Choose Your Category</option>
        <option value="1">Mens</option>
        <option value="2">Womens</option>
        <option value="3">Kids</option>
      </Form.Select>
      <Form.Control
        name='description'
        type='text'
        placeholder='Tell us about your product'
        onChange={handleFormChange}
        {...formInputProps} />
      <Form.Control
        name='image_1'
        type='text'
        placeholder='<Copy Image Url Here>'
        onChange={handleFormChange}
        {...formInputProps} />
      <Form.Control
        name='image_2'
        type='text'
        placeholder='<Copy Image Url Here>'
        onChange={handleFormChange}
        {...formInputProps} />
      <Form.Control
        name='image_3'
        type='text'
        placeholder='<Copy Image Url Here>'
        onChange={handleFormChange}
        {...formInputProps} />
    </>
  )
}

export default ProductForm
