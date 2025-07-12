const BASE_URL = 'http://localhost:5000/api';

// Auth API calls
export const registerUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'GET',
    credentials: 'include'
  });
  return response.json();
};

// Items API calls
export const getAllItems = async () => {
  const response = await fetch(`${BASE_URL}/items/approved`);
  return response.json();
};

export const addNewItem = async (formData) => {
  const response = await fetch(`${BASE_URL}/items/add`, {
    method: 'POST',
    credentials: 'include',
    body: formData // FormData object will be sent as multipart/form-data
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Swap API calls
export const createSwapRequest = async (data) => {
  const response = await fetch(`${BASE_URL}/swaps`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const getUserSwaps = async (userId) => {
  const response = await fetch(`${BASE_URL}/swaps/user/${userId}`, {
    credentials: 'include'
  });
  return response.json();
};

// User Profile API calls
export const getUserProfile = async () => {
  const response = await fetch(`${BASE_URL}/auth/profile`, {
    credentials: 'include'
  });
  return response.json();
};

export const getUserItems = async () => {
  const response = await fetch(`${BASE_URL}/items/user`, {
    credentials: 'include'
  });
  return response.json();
};
