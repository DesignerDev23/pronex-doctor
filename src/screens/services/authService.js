import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://pronex.abdulfortech.com/doctor/auth';
const BASE_URL = 'https://pronex.abdulfortech.com';
const API_USER = 'https://pronex.abdulfortech.com/doctor/user';
const API_KYC = 'https://pronex.abdulfortech.com/doctor/kyc/verify-account';
const API_VERIFY_OTP = 'https://pronex.abdulfortech.com/doctor/kyc/verify-identity';
const API_CONSULTATIONS = 'https://pronex.abdulfortech.com/doctor/consultations/active';
const API_IS_VERIFIED = 'https://pronex.abdulfortech.com/doctor/user/isverified';
const API_PROFESSIONAL_REGISTRATION = 'https://pronex.abdulfortech.com/doctor/kyc/profession-update';

const authService = {
  signUp: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  signIn: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getUserData: async (token) => {
    try {
      const options = {
        method: 'GET',
        url: API_USER,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }
      };
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      throw error;
    }
  },
  
  storeToken: async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      console.log('Token stored locally:', token);
    } catch (error) {
      throw error;
    }
  },
  
  getToken: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      throw error;
    }
  },
  
  removeToken: async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      console.log('Token removed locally');
    } catch (error) {
      throw error;
    }
  },
  
  sendForgetPasswordRequest: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  resetPassword: async (otp, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, { otp, newPassword });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  storeUserData: async (userData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log('User data stored locally:', userData);
    } catch (error) {
      throw error;
    }
  },
  
  getUserRole: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        return parsedData.role;
      }
      return null;
    } catch (error) {
      throw error;
    }
  },
  
  getUserId: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        return parsedData.id;
      }
      return null;
    } catch (error) {
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      console.log('User logged out and data cleared');
    } catch (error) {
      throw error;
    }
  },
  
  verifyAccount: async (email) => {
    try {
      const token = await AsyncStorage.getItem('authToken'); // Get token from storage
      const response = await axios.post(API_KYC, {
        email: email,
        channel: 'email',
        contact: email
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error in verifyAccount:', error.response || error.message);
      throw error;
    }
  },

  verifyOTP: async (email, otp, channel, idNumber) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Token:', token);
      console.log('Email:', email);
      console.log('OTP:', otp);
      console.log('Channel:', channel);
      console.log('ID Number:', idNumber);

      // Ensure payload structure matches API requirements
      const response = await axios.post(API_VERIFY_OTP, 
        { email, otp, channel, idNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    } catch (error) {
      console.error('Error in verifyOTP:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  fetchDoctorConsultations: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(API_CONSULTATIONS, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  isUserVerified: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(API_IS_VERIFIED, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Check if response data is in the expected format
      if (response.data && typeof response.data.isVerified === 'boolean') {
        return response.data.isVerified;
      } else {
        throw new Error('Unexpected response format from API');
      }
    } catch (error) {
      console.error('Error checking user verification:', error.message || error.response?.data || error);
      throw error;
    }
  },

  acceptConsultation: async (consultationId) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Token:', token);
      const response = await axios.post(
        `https://pronex.abdulfortech.com/doctor/consultations/accept/${consultationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error in acceptConsultation:', error.response || error.message);
      throw error;
    }
  },

  rejectConsultation: async (consultationId) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Token:', token);
      const response = await axios.get(
        `https://pronex.abdulfortech.com/doctor/consultations/reject/${consultationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

registerProfessional: async (professionalData) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    // Extract date components and format start_date
    const { day, month, year } = professionalData.start_date || {};
    if (day && month && year) {
      professionalData.start_date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    } else {
      // Handle case where date components are missing
      throw new Error('Invalid start_date');
    }

    const response = await axios.post(
      `${BASE_URL}/doctor/kyc/profession-update`,
      professionalData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw error;
  }
},

  
};

export default authService;
