'use client'
import React from 'react';
import Table from 'react-bootstrap/Table';
import Header from '@/app/components/header';
import './adminPage/index.scss'
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';

const AdminPage: React.FC = () => {
    return (
        <>
            <Provider store={store}>
                <Header />
            </Provider>

            <div className='container-adminPage'>

                <div className='container-adminPage__tableBox'>
                    <Table className='container-adminPage__tableBox__box' striped bordered hover>
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Explanation</th>
                                <th>Price</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
