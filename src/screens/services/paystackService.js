// services/paystackService.js

import axios from 'axios';

const PAYSTACK_SECRET_KEY = 'sk_test_d3cc0126e23e9f4767cb460f462c4bb37d94299e'; // Your Paystack secret key

const initializePaystack = async (amount) => {
  try {
    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      email: 'ahmadkoki.jobs@yahoo.com',
      amount: amount * 100, // Convert amount to kobo
    }, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const { data } = response;
    return {
      publicKey: data.data.public_key,
      reference: data.data.reference,
    };
  } catch (error) {
    throw new Error('Error initializing payment');
  }
};

// const paystackCharge = async (email, amount, publicKey, reference) => {
//   try {
//     const response = await axios.post('https://api.paystack.co/transaction/charge_authorization', {
//       email,
//       amount: amount * 100, // Convert amount to kobo
//       reference,
//       authorization_code: '', // If using Paystack's authorization feature
//     }, {
//       headers: {
//         Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     const { data } = response;
//     return {
//       success: data.status === 'success',
//       message: data.message,
//       data,
//     };
//   } catch (error) {
//     throw new Error('Error charging payment');
//   }
// };

export { initializePaystack };
