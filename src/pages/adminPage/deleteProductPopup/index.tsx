import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from '../../../../intercepter';
import 'bootstrap/dist/css/bootstrap.min.css';

interface DeleteProductPopupProps {
    setIsDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
    setToastActive: React.Dispatch<React.SetStateAction<boolean>>;
    deletedProductId: number | undefined;
}


function DeleteProductPopup({ setIsDeletePopup, setToastActive, deletedProductId }: DeleteProductPopupProps) {

    console.log('deletedProductId', deletedProductId)
    const handleDeleteProduct = async () => {
        try {
            await api.delete(`/product/${deletedProductId}`);
            console.log('Ürün başarıyla silindi.');
            setToastActive(true)
            setIsDeletePopup(false);
        } catch (error) {
            console.log('Ürün silinemedi:', error);
        }
    };

    return (
        <Modal show={true} onHide={() => setIsDeletePopup(false)}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>Are you sure you want to delete this product</Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setIsDeletePopup(false)} variant="secondary">Cancel</Button>
                <Button onClick={handleDeleteProduct} variant="secondary">Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteProductPopup;
