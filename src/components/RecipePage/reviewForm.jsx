import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Recipe } from './recipe';
import { Rating } from './rating';

export class ReviewForm extends React.Component{
    state={
        rating:0
    }
    onRatingAdded(){

        if(this.state.rating !== 0){
            let {rating}=this.state;
            this.props.onNewRating(rating);
            this.setState({
                rating:0
            });
        }
    }
    render(){
        return(
            <Form onReviewAdded={()=>this.onReviewAdded()}>
                <Card>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="StarSelect">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control as="select" value={this.state.rating} onChange={e=>this.setState({rating: e.target.value})}>
                                    {
                                        [0,1,2,3,4,5].map((a,index)=><option key={index} value={a}>{a}</option>)
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="StarSelect" style={{margin:'2em 0em 0em 0em'}}>
                                <Rating value={this.state.rating}/>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="button" onClick={e=>this.onRatingAdded()}>
                            Submit
                        </Button>
                    </Card.Body>
                </Card>
            </Form>
        )
    }
}

export default ReviewForm;