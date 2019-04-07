import React from 'react';
import './accountTable.css'

export const AccountTable = (props) => (
    <div className="account-table">
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.tabledata.map((item, i) => 
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
);