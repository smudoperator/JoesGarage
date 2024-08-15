// src/pages/dinners.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/dinnerService';

var showIds = false; 

const Dinners = () => {
    const [dinners, setDinners] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchDinners = async () => {
        try {
          const data = await apiService.getDinners();
          setDinners(data);
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchDinners();
    }, []);
  
    if (error) return <div>Error: {error}</div>;
  
    return (
      <div>
        <h1>Dinners</h1>
        <button onClick={toggleId}>Show id's</button>
        
        <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Meat Type</th>
                        <th>Skill Level</th>
                        <th>Ingredients</th>
                        <th>Tags</th>
                        <th>Image</th>
                        <th>Id</th>
                    </tr>
                </thead>
                <tbody>
                    {dinners.map(dinner => (
                        <tr key={dinner.id}>
                            <td>{dinner.name}</td>
                            <td>{dinner.description}</td>
                            <td>{dinner.type}</td>
                            <td>{dinner.meatType}</td>
                            <td>{dinner.skillLevel}</td>
                            <td>{dinner.ingredients.join(', ')}</td>
                            <td>{dinner.tags.join(', ')}</td>
                            <td>{dinner.imageData ? 'Image Available' : 'No Image'}</td>
                            <td>{dinner.id}</td>
                            <td>
                                <Link to={`/dinner/${dinner.id}`}>
                                    <button>Edit</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx>{`
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    font-size: 16px;
                    text-align: left;
                }
                th, td {
                    padding: 12px;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #f4f4f4;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
            `}</style>
      </div>
    );
  };

  function toggleId() {
    if (showIds) {
        showIds = false;
    }
    else {
        showIds = true;
    }
  }
  
  export default Dinners;