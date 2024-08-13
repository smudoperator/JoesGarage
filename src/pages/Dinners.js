// src/pages/dinners.js

import React, { useEffect, useState } from 'react';
import apiService from '../services/dinnerService';

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
        <h1>Dinners List</h1>
        <ul>
          {dinners.map(dinner => (
            <li key={dinner.id}>{dinner.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Dinners;