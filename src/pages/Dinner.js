// src/pages/dinner.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/dinnerService';

const Dinner = () => {
    const { id } = useParams();
    const [dinner, setDinner] = useState({
        name: '',
        description: '',
        type: 0,
        meatType: 0,
        ingredients: [],
        tags: [],
        imageData: ''
    });
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null); // State for handling image uploads
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDinner = async () => {
            try {
                const data = await apiService.getDinnerById(id);
                setDinner(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDinner();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDinner(prevDinner => ({
            ...prevDinner,
            [name]: value
        }));
    };

    const handleArrayChange = (e, field) => {
        const { value } = e.target;
        setDinner(prevDinner => ({
            ...prevDinner,
            [field]: value.split(',').map(item => item.trim()) // Convert comma-separated string to array
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setDinner(prevDinner => ({
                ...prevDinner,
                imageData: reader.result
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
            setImage(file); // Save file for potential future use
        }
    };

    const handleSave = async () => {
        try {
            await apiService.updateDinner(dinner);
            navigate('/dinners'); // Redirect
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!dinner) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Dinner</h1>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={dinner.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={dinner.description}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Type:</label>
                <input
                    type="number"
                    name="type"
                    value={dinner.type}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Meat Type:</label>
                <input
                    type="number"
                    name="meatType"
                    value={dinner.meatType}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Ingredients (comma separated):</label>
                <input
                    type="text"
                    name="ingredients"
                    value={dinner.ingredients.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'ingredients')}
                />
            </div>
            <div>
                <label>Tags (comma separated):</label>
                <input
                    type="text"
                    name="tags"
                    value={dinner.tags.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'tags')}
                />
            </div>
            <div>
                <label>Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {dinner.imageData && <img src={dinner.imageData} alt="Dinner" style={{ width: '100px', height: '100px' }} />}
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default Dinner;