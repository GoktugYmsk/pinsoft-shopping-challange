import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

interface LeftContentProps {
    setFiltre: React.Dispatch<React.SetStateAction<string>>;
    fiyatAraligi: [number, number];
    setFiyatAraligi: React.Dispatch<React.SetStateAction<[number, number]>>;
}

interface Category {
    id: number;
    name: string;
}

const LeftContent: React.FC<LeftContentProps> = ({ setFiltre, fiyatAraligi, setFiyatAraligi }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://pinsoft.onrender.com/category');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };

        fetchData();
    }, []);

    console.log('categories', categories)

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
                        <input type='checkbox' defaultChecked={false} />
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
