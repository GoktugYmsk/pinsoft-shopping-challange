import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    explanation: string;
}

interface ProductPopupProps {
    product: Product;
    onClose: () => void;
}

const ProductPopup: React.FC<ProductPopupProps> = ({ product, onClose }) => {
    return (
        <Modal show={true} onHide={onClose} >
            <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Fiyat: {product.price} TL</p>
                <p> {product.explanation} </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Kapat
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductPopup;
