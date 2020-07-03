//Import statements go here

import React, { Component } from 'react';
import {Table, Card, Button, CardTitle, Row, Col, Jumbotron, Container } from 'reactstrap';
import Timer from "./Timer.js";


//Extend the functionality of 'Component' to the class created
class Product extends Component {
    constructor () {
        super();
    
//A state can hold anything dynamically.  randomVar is any variable
    this.state = {
        products: [
            {'name': 'Beach Trip 1', 'img': '1.jpg', 'id': 1, 'price': '$ 1,000', 'package': 'all inclusive'},
            {'name': 'Beach Trip 2', 'img': '2.jpg', 'id': 2, 'price': '$ 1,500', 'package': 'all inclusive'},
            {'name': 'Beach Trip 3', 'img': '3.jpg', 'id': 3, 'price': '$ 3,000', 'package': 'all inclusive'},
            {'name': 'Beach Trip 4', 'img': '4.jpg', 'id': 4, 'price': '$ 1,000', 'package': 'none'},
            {'name': 'Beach Trip 5', 'img': '5.jpg', 'id': 5, 'price': '$ 2,500', 'package': 'all inclusive'},
        ],
        compare: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
}

//e is for event - here that is 'click'
//this variable has some information like: name, id, etc. of the component which fired it
handleClick(e){
    const { products, compare } = this.state;
    const id = parseInt(e.target.id);
    
    const selectedVacation = products.find(x => x.id === parseInt(id));
    if(!compare.find(c => c === selectedVacation)){
    this.setState({compare: [...compare, selectedVacation]});
    }
}
// TODO: Refactor to remove product from compare array based on id 
 
removeProduct(e) {
    const id = parseInt(e.target.id);
    const remove = this.state.compare.filter((x) => x.id !== id);
    this.setState({compare: remove});

}

//this function renders a component
render () {
    return(
        <>
        <Container fluid>
        <Jumbotron >
            <h1 className="display-3">Destination, Beach Vacation!</h1>
            <p className="lead">Look no further compare our five best beach vacations in one site.</p>
        </Jumbotron >
        <Row>
        {this.state.products.map((product, index) => (
            <Col key={product.id}>
                <Card  body outline engine="primary">
                    <img variant="top"  src={require("../assets/images/" + product.img)} alt={product.name} />
                    <CardTitle>{product.name}</CardTitle>
                    <Button outline color="info"type="button" id={product.id} onClick = {this.handleClick}>Compare</Button>
                    </Card>
                </Col>
        ))}
        </Row>

        <Table>
            <thead>
                <th width="33.33%">Name</th>
                <th width="33.33%">Price</th>
                <th width="33.33%">Package</th>
                <th>Action</th>
            </thead>
                {this.state.compare.length > 0 && this.state.compare.map((product)=> (
                    <tbody>
                        <tr>
                            <td width="33.33%">{product.name}</td>
                            <td width="33.33%">{product.price}</td>
                            <td width="33.33%">{product.package}</td>
                            <td><button id={product.id} onClick={this.removeProduct}>Remove</button></td>
                        </tr>
                    </tbody>
                ))}
            </Table>
            <Row>
                <Col className="Timer">
                <div><Timer /></div>
                </Col>
            </Row>
            </Container>
        </>
    )   
}}
export default Product;
