import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from '../../../../intercepter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

interface DeleteProductPopupProps {
    setIsDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
    setToastActive: React.Dispatch<React.SetStateAction<boolean>>;
    setToastMessage: React.Dispatch<React.SetStateAction<string>>;
    deletedProductId: number | undefined;
}


function DeleteProductPopup({ setIsDeletePopup, setToastActive, deletedProductId, setToastMessage }: DeleteProductPopupProps) {
    const router = useRouter();
    const handleDeleteProduct = async () => {
        try {
            await api.delete(`/product/${deletedProductId}`);
            console.log('Ürün başarıyla silindi.');
            setToastMessage('Data deleted succesfully!')
            setToastActive(true)
            setIsDeletePopup(false);
            window.location.reload();
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
