'use client'
import React, { useEffect, useState } from "react";

import Header from "@/app/components/header";
import './orderPage/index.scss'
import { Provider } from "react-redux";
import { store } from "@/app/store/store";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { useRouter } from "next/navigation";
import api from "../../intercepter";
import { Button } from "react-bootstrap";

interface Order {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

const OrderPage: React.FC = () => {
    const [getOrders, setGetOrders] = useState<Order[]>([]);

    const router = useRouter();

    const userIDString = typeof window !== 'undefined' ? sessionStorage.getItem('userId') : null;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/orders ${userIDString} `);

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.data;
                console.log('data', data);
                setGetOrders(data);
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };

        fetchData();
    }, []);

    const calculateTotalPrice = (price: number, quantity: number) => {
        return price * quantity;
    };


    const handleOnKeepShopping = () => {
        router.push('/main');
    };

    return (
        <>
            <Provider store={store}>
                <Header />
            </Provider>
            <div className="container-orderPage" >

                <div className='container-orderPage__tableBox'>
                    <h1>Orders</h1>
                    <TableContainer className='container-orderPage__tableBox__box' component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Photo</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Total Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getOrders.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>Resim eklenecek</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{calculateTotalPrice(item.price, item.quantity)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="container-orderPage-button-area" >
                        <Button onClick={handleOnKeepShopping} className='orderPage-keepShopping-button'>
                            Alışverişe Devam Et
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );

};

export default OrderPage;