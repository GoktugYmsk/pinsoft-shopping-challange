import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface LeftContentProps {
    setFiltre: React.Dispatch<React.SetStateAction<string>>;
    fiyatAraligi: [number, number];
    setFiyatAraligi: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const LeftContent: React.FC<LeftContentProps> = ({ setFiltre, fiyatAraligi, setFiyatAraligi }) => {
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
                <label>
                    <input type='checkbox' defaultChecked={false} />
                    <p>Kitap</p>
                </label>

                <label>
                    <input type='checkbox' defaultChecked={false} />
                    <p>Elektronik</p>
                </label>

                <label>
                    <input type='checkbox' defaultChecked={false} />
                    <p>Giyim</p>
                </label>
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
