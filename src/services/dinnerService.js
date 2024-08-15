// src/services/apiService.js

import axios from 'axios';

const API_BASE_URL = 'https://matpirat-dsgpfqc9fbhnf2hq.northeurope-01.azurewebsites.net';

const apiService = {
  
    getDinners: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Dinner/GetDinners`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error(`Network error`);
    }
  },

  getDinnerById: async (id) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/Dinner/GetDinner`, { id });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error(`Network error`);
    }
  },

  addDinner: async (body) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/Dinner/AddDinner`, { body });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error(`Network error`);
    }
  },

  updateDinner: async (body) => {
    console.log(body);
    try {
        const response = await axios.post(`${API_BASE_URL}/Dinner/EditDinner`, { body });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error(`Network error`);
    }
  },

  deleteDinner: async (id) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/Dinner/DeleteDinner`, { id });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error(`Network error`);
    }
  }



};

export default apiService;