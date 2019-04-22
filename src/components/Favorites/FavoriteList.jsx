import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-bootstrap';

export const FavoriteList = (props) => (
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            {
                props.favorites.map((a, i) =>
                    <tr key={i}>
                        <td>
                            <Link to={`/edit/${a.id}`}>{a.name}</Link>
                        </td>
                        <td>{ a.type }</td>
                    </tr>
                )
            }
        </tbody>
    </Table>
);
export default FavoriteList;