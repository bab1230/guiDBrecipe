import React from 'react';
import { Table, Popover, Card, OverlayTrigger, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const popover=(
    <Popover id="popover-basic">
        <Card>
            <Card.Img className="rounded" variant="top" src='http://johnlawrimore.com/smu/101.png' />
            <Card.Body>
                <Card.Title>Card title</Card.Title>
            </Card.Body>
        </Card>
    </Popover>
);
export const FavoriteList = (props) => (
    <Container>
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                props.favorites.map((a, i) =>
                    <tr key={i}>
                        <td>
                            <Link to={`/edit/${a.id}`}/*>
                                <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                    {a.name}
                                </OverlayTrigger>*/>
                                {a.name}
                            </Link>
                        </td>
                        <td>{ a.type }</td>
                        <td>
                            <button className="btn btn-sm btn-danger"
                                    onClick={e => this.onDelete(a.name)}>
                            <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                )
            }
        </tbody>
    </Table>
    </Container>
);
export default FavoriteList;