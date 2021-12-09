import React from 'react'
import Form from 'react-bootstrap/Form'
import FormInput from './FormInput'

const ProductForm = ({ ...formInputProps }) => {
  const handleFormChange = formInputProps.handleFormChange
  console.log('forminputprops', formInputProps.data)

  return (
    <>
      <FormInput
        name="brand"
        type="text"
        placeholder="Item Brand"
        {...formInputProps}
      />
      <FormInput
        name="product_model"
        type="text"
        placeholder="Item Description"
        {...formInputProps}
      />
      <FormInput
        name="type"
        type="text"
        placeholder="Type of clothing"
        {...formInputProps}
      />
      <FormInput
        name="colour"
        type="text"
        placeholder="Item Colour"
        {...formInputProps}
      />
      <Form.Select
        name="size"
        type="text"
        placeholder="Size"
        value={formInputProps.data.size}
        onChange={handleFormChange}
        {...formInputProps}
      >
        <option value="">Choose Your Size</option>
        <option value="L">Large</option>
        <option value="M">Medium</option>
        <option value="S">Small</option>
        <option value="WL">12</option>
        <option value="WM">10</option>
        <option value="WS">8</option>
        <option value="4">Size 4</option>
        <option value="5">Size 5</option>
        <option value="6">Size 6</option>
        <option value="7">Size 7</option>
        <option value="8">Size 8</option>
        <option value="9">Size 9</option>
        <option value="10">Size 10</option>
        <option value="11">Size 11</option>
      </Form.Select>
      <FormInput
        name="price"
        type="number"
        placeholder="Price"
        {...formInputProps}
      />
      <FormInput
        name="discount_price"
        type="number"
        placeholder="Discounted Price"
        {...formInputProps}
      />
      <Form.Select
        name="label"
        type="text"
        placeholder="Label"
        value={formInputProps.data.label}
        onChange={handleFormChange}
        // defaultValue={state.templateId}
        {...formInputProps}
      >
        <option value="">Choose Your Label</option>
        <option value="N">New</option>
        <option value="BS">Best Seller</option>
        <option value="S">Sale Item</option>
      </Form.Select>
      <Form.Select
        name="categorys"
        type="text"
        placeholder="Item Category"
        value={formInputProps.data.categorys}
        onChange={handleFormChange}
        // defaultValue={state.templateId}
        {...formInputProps}
      >
        <option value="">Choose Your Category</option>
        <option value="1">Mens</option>
        <option value="2">Womens</option>
        <option value="3">Kids</option>
      </Form.Select>
      <FormInput
        name="description"
        type="text"
        placeholder="Tell us about your product"
        {...formInputProps}
      />
      <FormInput
        name="image_1"
        type="text"
        placeholder="<Copy Image Url Here>"
        {...formInputProps}
      />
      <FormInput
        name="image_2"
        type="text"
        placeholder="<Copy Image Url Here>"
        {...formInputProps}
      />
      <FormInput
        name="image_3"
        type="text"
        placeholder="<Copy Image Url Here>"
        {...formInputProps}
      />
    </>
  )
}

export default ProductForm
