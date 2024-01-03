import React, { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import api from '../../../../../intercepter'

interface LeftContentProps {
    setFiltre: React.Dispatch<React.SetStateAction<string>>;
    fiyatAraligi: [number, number];
    setFiyatAraligi: React.Dispatch<React.SetStateAction<[number, number]>>;
    selectedCategories: number[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
    categories: Category[];
}

interface Category {
    id: number;
    name: string;
}

const LeftContent: React.FC<LeftContentProps> = ({ setFiltre, fiyatAraligi, setFiyatAraligi, setSelectedCategories, selectedCategories }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/category');

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.data;
                setCategories(data);
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };
        fetchData();
    }, []);

    const handleCheckboxChange = (categoryId: number) => {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(categoryId)) {
                return prevSelectedCategories.filter((id) => id !== categoryId);
            } else {
                return [...prevSelectedCategories, categoryId];
            }
        });
    };

    return (
        <div className='container-content__box-left'>
            <div className='container-content__box-left__filter'>
                <h3>Filtrele</h3>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Ürün adı veya filtrele"
                        aria-label="search"
                        aria-describedby="basic-addon1"
                        onChange={(e) => setFiltre(e.target.value)}
                    />
                </InputGroup>
            </div>
            <div className='container-content__box-left__top'>
                {categories.map((category) => (
                    <label key={category.id}>
                        <input
                            type='checkbox'
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCheckboxChange(category.id)}
                        />
                        <p>{category.name}</p>
                    </label>
                ))}
            </div>
            <div className="container-content__box-left__down__filter">
                <label>Fiyat Aralığı:</label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={fiyatAraligi[1]}
                    onChange={(e) => setFiyatAraligi([fiyatAraligi[0], parseInt(e.target.value, 10)])}
                />
                <div className="container-content__box-left__down__filter__result">
                    <span>Min: {fiyatAraligi[0]}</span>
                    <span>Max: {fiyatAraligi[1]}</span>
                </div>
            </div>
        </div>
    );
};

export default LeftContent;
