// src/services/apiService.js

import axios from 'axios';

const API_BASE_URL = 'https://matpirat-dsgpfqc9fbhnf2hq.northeurope-01.azurewebsites.net';

const apiService = {
  getDinners: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Dinner/GetDinners`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  }

};

export default apiService;