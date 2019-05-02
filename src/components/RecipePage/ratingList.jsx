import React from 'react';
import { Card } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Rating } from './rating';

export const RatingList = (props) => (
    <div className="mt-5">
        <h3>Overall Rating ({props.ratings.length})</h3>
        {props.ratings.length===0 ? <Alert variant='secondary'>Be the First to Rate</Alert>:""}
        {
            props.ratings.map((a, index) =>
            <Card className="m-2" style={{backgroundColor:"#C0C0C0"}}>
                <Rating value={a.rating}/>
            </Card>
            )
        }
    </div>
);

export default RatingList;