import React from 'react'
import Form from 'react-bootstrap/Form'

const ProductAdd = () => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h1>Add a Cheese</h1>
      </Form>
    </div>
  )
}

export default ProductAdd
