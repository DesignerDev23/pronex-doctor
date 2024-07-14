import axios from 'axios';

const API_URL = 'https://pronex.abdulfortech.com/api/doctors';

const doctorService = {
  fetchDoctors: async (token) => {
    try {
      const options = {
        method: 'GET',
        url: API_URL,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      console.error('Error fetching doctors:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
  fetchDoctorById: async (doctorID, token) => {
    try {
      const options = {
        method: 'GET',
        url: `${API_URL}/${doctorID}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      console.error('Error fetching doctor by ID:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
  addConsultation: async (formData, token) => {
    try {
      const options = {
        method: 'POST',
        url: 'https://pronex.abdulfortech.com/api/consultations/add',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: formData // Ensure formData is passed here
      };
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error('Error adding consultation:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
  
};

export default doctorService;
