import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    explanation: string;
    base64image: string;
}

interface ProductPopupProps {
    product: Product;
    onClose: () => void;
}

const ProductPopup: React.FC<ProductPopupProps> = ({ product, onClose }) => {


    const decodeBase64Image = (base64: string) => {
        const base64ImageData = base64.split(",")[1];
        const binaryString = atob(base64ImageData);
        const byteNumbers = new Array(binaryString.length);

        for (let i = 0; i < binaryString.length; i++) {
            byteNumbers[i] = binaryString.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        const dataUrl = `data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, byteNumbers))}`;

        return dataUrl;
    };


    return (
        <Modal className='products-popup-container' show={true} onHide={onClose} >
            <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='products-popup-container__box' >
                {product.base64image && (
                    <img src={decodeBase64Image(product.base64image)} alt={product.name} />
                )}
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
