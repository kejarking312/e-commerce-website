import React from 'react'
import Card from 'react-bootstrap/Card'
// import Button from '@restart/ui/esm/Button'
// import { Link } from 'react-router-dom'
// import addtocart from '../styles/images/icons/shopping-cart-add-black.png'
// import favourite from '../styles/images/icons/heart-black.png'
// import { useParams } from 'react-router-dom'
/*eslint camelcase: ["error", {allow: ["start_date", "ordered_date"]}]*/
const ProductCard = ({ ordered_date, ordered, items }) => {
  

  // const { id } = useParams()

  return (
    <Card style={{ width: '18rem' }} className="product-card">
      <Card.Body className="card-body">
        <Card.Title>{items} items in orders</Card.Title>
        {/* <Card.Text className="card-text">
          {start_date}
        </Card.Text> */}
        <Card.Text className="card-text">
          Ordered on {ordered_date}
        </Card.Text>
        <Card.Text className="card-text">
          {ordered}
        </Card.Text>
        {/* <Button className="button">
          <Link className="link" to={`/products/${id}/`} >More Info</Link>
        </Button>
        <Button className="button"><Link className="link" to={`/products/${id}/`}><img src={favourite} alt="Save to Favourites" /></Link></Button>
        <Button className="button"><Link className="link" to={'/basket'}><img src={addtocart} alt="Add to Basket" /></Link></Button> */}
      </Card.Body>
    </Card>
  )
}

export default ProductCard
