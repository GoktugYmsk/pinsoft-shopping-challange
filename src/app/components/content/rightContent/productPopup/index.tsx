import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface Product {
    id: number;
    name: string;
    fiyat: number;
    image?: string;
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
                {product.image && <img src={product.image} alt={product.name} />}
                <p>Fiyat: {product.fiyat} TL</p>
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
