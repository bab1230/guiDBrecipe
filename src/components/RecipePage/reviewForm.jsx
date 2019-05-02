import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Rating } from './rating';

export class ReviewForm extends React.Component{
    state={
        diff_rating:0,
        taste_rating: 0
    }
    onRatingAdded(){

        if(this.state.diff_rating !== 0 && this.state.taste_rating !== 0){
            this.props.onNewRating(this.state.diff_rating, this.state.taste_rating);
            this.setState({
                diff_rating: 0,
                taste_rating: 0
            });
        }
    }
    render(){
        return(
            <Form>
                <Card>
                    <Card.Body>
                        <Form.Row>

                            <Form.Group as={Col} controlId="StarSelect">
                                <Form.Label>Difficulty Rating</Form.Label>
                                <Form.Control as="select" value={this.state.diff_rating} onChange={e=>this.setState({diff_rating: e.target.value})}>
                                    {
                                        [0,1,2,3,4,5].map((a,index)=><option key={index} value={a}>{a}</option>)
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="StarSelect" style={{margin:'2em 0em 0em 0em'}}>
                                <Rating value={this.state.diff_rating}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="StartSelect">
                                <Form.Label>Taste Rating</Form.Label>
                                <Form.Control as="select" value={this.state.taste_rating} onChange={e=>this.setState({taste_rating: e.target.value})}>
                                        {
                                            [0,1,2,3,4,5].map((a,index)=><option key={index} value={a}>{a}</option>)
                                        }
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="StarSelect" style={{margin:'2em 0em 0em 0em'}}>
                                <Rating value={this.state.taste_rating}/>
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