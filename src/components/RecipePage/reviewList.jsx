import React from 'react';
import { Card } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Rating } from './rating';

export const ReviewList = (props) => (
    <div>
        <h3>Overall Rating ({props.reviews.length})</h3>
        {props.reviews.length===0 ? <Alert variant='secondary'>Be the First to Rate</Alert>:""}
        {
            props.reviews.map((a, index) =>
            <Rating value={a.rating}/>
            )
        }
    </div>
);

export default ReviewList;