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


axios.defaults.headers.common['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzYyZWQ3NS03OTk1LTQyMWQtOTE1ZS03MjdkZGY3OTQyMjMiLCJqdGkiOiI0NTk2OWFmNjJiNTI4OGU2Zjc5ZWNlOWM4YTBmY2I0NDQ3ZjgyNzg3N2I3YTc5MmEyMDhmNzMyYjI3MjI4NjdmZTAxM2NmOTk2NWY4NjlhMSIsImlhdCI6MTcyMDA3NzgyNC42ODg3NjYsIm5iZiI6MTcyMDA3NzgyNC42ODg3NywiZXhwIjoxNzUxNjEzODIzLjgzNjc4Niwic3ViIjoiMSIsInNjb3BlcyI6W119.X81m9b4Se-aRBJEaYu3U86GZnwGIBPYIUe8HXpwzmd008b6J_KzWIB3haUobieesxdJzLIrpKdW8v8FXam4PSoqS3SrGkrr7Os2nsl0PpIzx3S5EBmYqCCV8vMqmB_D6GjtiZZPBEss-KpPoVIlTpU2xb2VZtMg-SjdXeZ_LX_SCb0r6GlihUheEgDZe3dSv5BlTKomP0jkOjX2vXc8grXhrF9hiKpjN9wGxZ5KIra5Att-M5Mk3N9Tba2WKxEZenjKMpEzlh92jspnhgzGSyxW-nhDAIvergV_wmkE5eQ93nj7wzvCNzLc0ziGjv177ycBbNJkOVe5i-TPFDGcq88NJXVA6CL4aZMb9aim6CkcBRh1q3wsKhcDcdh_F8n52OydXI828y9eYVHCsLVsJ2-pkx4mM41TMWdMqMl0lmfK9IrDinQn_BAZsDLKRVuUAIcpj3Ruwmdy4htG-Ng7H2hvQiVTo5xuRsKi-PywVyykdeX795Ou78-0RC8hiajJm4iyt3NwuaCTmD6_jlBRyiJXuUAmqoDb0LtFeRV8jGSgnLW8WJ3Cji8Xty2s6m91D-853NlWyInFuMtDBJihykOym6ccAgr_EGD5HbRREn-qZUXW9ebRkjpug8LmMx35fXPZ697GeOJMU7FXjaZchr319S3CRbftxACn8pJdXlw0`;
const proTeken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YzYyZWQ3NS03OTk1LTQyMWQtOTE1ZS03MjdkZGY3OTQyMjMiLCJqdGkiOiI0NTk2OWFmNjJiNTI4OGU2Zjc5ZWNlOWM4YTBmY2I0NDQ3ZjgyNzg3N2I3YTc5MmEyMDhmNzMyYjI3MjI4NjdmZTAxM2NmOTk2NWY4NjlhMSIsImlhdCI6MTcyMDA3NzgyNC42ODg3NjYsIm5iZiI6MTcyMDA3NzgyNC42ODg3NywiZXhwIjoxNzUxNjEzODIzLjgzNjc4Niwic3ViIjoiMSIsInNjb3BlcyI6W119.X81m9b4Se-aRBJEaYu3U86GZnwGIBPYIUe8HXpwzmd008b6J_KzWIB3haUobieesxdJzLIrpKdW8v8FXam4PSoqS3SrGkrr7Os2nsl0PpIzx3S5EBmYqCCV8vMqmB_D6GjtiZZPBEss-KpPoVIlTpU2xb2VZtMg-SjdXeZ_LX_SCb0r6GlihUheEgDZe3dSv5BlTKomP0jkOjX2vXc8grXhrF9hiKpjN9wGxZ5KIra5Att-M5Mk3N9Tba2WKxEZenjKMpEzlh92jspnhgzGSyxW-nhDAIvergV_wmkE5eQ93nj7wzvCNzLc0ziGjv177ycBbNJkOVe5i-TPFDGcq88NJXVA6CL4aZMb9aim6CkcBRh1q3wsKhcDcdh_F8n52OydXI828y9eYVHCsLVsJ2-pkx4mM41TMWdMqMl0lmfK9IrDinQn_BAZsDLKRVuUAIcpj3Ruwmdy4htG-Ng7H2hvQiVTo5xuRsKi-PywVyykdeX795Ou78-0RC8hiajJm4iyt3NwuaCTmD6_jlBRyiJXuUAmqoDb0LtFeRV8jGSgnLW8WJ3Cji8Xty2s6m91D-853NlWyInFuMtDBJihykOym6ccAgr_EGD5HbRREn-qZUXW9ebRkjpug8LmMx35fXPZ697GeOJMU7FXjaZchr319S3CRbftxACn8pJdXlw0';





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
      const response = await axios.post(
        `${BASE_URL}/doctor/kyc/profession-update`,
        professionalData,
        {
          headers: {
            Authorization: `Bearer ${proTeken}`,
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
