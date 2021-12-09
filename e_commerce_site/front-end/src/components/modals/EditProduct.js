import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import ProductForm from '../ProductForm'
import { getToken } from '../../helpers/auth'

const EditProduct = ({
  initialData,
  handleError,
  show,
  handleClose,
  errorInfo,
  id,
  handleSuccesfulEdit,
}) => {
  const [data, setData] = useState({})
  console.log('initial Data', initialData)

  useEffect(() => {
    setData({ ...initialData, categorys: initialData?.categorys?.id })
  }, [initialData])

  const [isError, setIsError] = useState(false)

  const handleEditSubmit = async (event) => {
    event.preventDefault()
    const formData = { ...data, owner: null }
    const config = {
      method: 'put',
      url: `http://localhost:8000/api/products/${id}/`,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      data: formData,
    }
    try {
      const response = await axios(config).catch(handleError)

      handleSuccesfulEdit(response.data)
      setIsError(false)
      handleClose()
    } catch (err) {
      console.log(err)
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        onSubmit={handleEditSubmit}
        className="form-section"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Item</Modal.Title>
        </Modal.Header>

        <Modal.Body className="form">
          <ProductForm
            data={data}
            errorInfo={errorInfo}
            handleFormChange={handleFormChange}
          />
          {isError ? (
            <div className="error">
              <p>Error. Please try again</p>
            </div>
          ) : (
            <></>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button className="button" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="button"
            variant="primary"
            onClick={handleEditSubmit}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditProduct
