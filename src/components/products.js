//Import statements go here

import React, { Component } from 'react';
import {Table, Card, Button, CardTitle, CardText, Row, Col, CardImg, Jumbotron, Container } from 'reactstrap';
import Countdown from "./Countdown";

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
        compare: {
            //the arr variable stores the id of the selected components
            arr: []
        }
    }
    this.handleClick = this.handleClick.bind(this);
}

//e is for event - here that is 'click'
//this variable has some information like: name, id, etc. of the component which fired it
handleClick(e){
    let arrnew = this.state.compare.arr;
    let temp = arrnew.indexOf(e.target.id)
    
    if (temp !== -1){
        //if present then remove it
        arrnew.splice(temp, 1)
    }
    else {
        arrnew.push(e.target.id)
    }
    //setState function helps in changing the state.
    this.setState({ compare: {arr: arrnew} });
}

//this function renders a component
render () {
    let temparr = this.state.compare.arr
    let temp = []
    let Compare;
    for (var i=0; i<temparr.length; i++){
        let x = this.state.products.find(prod => prod.id === temparr[i]);
        temp.push(x)
    }
    
    //whatever is returned is what is rendered
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
                    <Button outline color="info"type="button" id={product.id} onClick = {this.handleClick}>{(this.state.compare.arr.indexOf(product.id) < 0) ? "Compare" : "Remove"}</Button>
                    </Card>
                </Col>
        ))}
        </Row>

        <Table>
            <thead>
                <th width="33.33%">Name</th>
                <th width="33.33%">Price</th>
                <th width="33.33%">Package</th>
            </thead>
                {temp.map((product)=> (
                    <tbody>
                        <tr>
                            <td width="33.33%">{product.name}</td>
                            <td width="33.33%">{product.price}</td>
                            <td width="33.33%">{product.package}</td>
                        </tr>
                    </tbody>
                ))}
            </Table>
            <Row>
                <Col className="countDown">
                <div><Countdown /></div>
                </Col>
            </Row>
            </Container>
        </>
    )   
}}
export default Product;
