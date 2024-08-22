import axios from 'axios';

const API_URL = 'http://localhost:3001';

const saveUserState = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const loadUserState = () => {
  const savedUser = localStorage.getItem('user');
  return savedUser ? JSON.parse(savedUser) : null;
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
    const users = response.data;
    if (users.length > 0) {
      const user = users[0];
      saveUserState(user);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
    }
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: 'An error occurred' });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    const checkUser = await axios.get(`${API_URL}/users?email=${email}`);
    if (checkUser.data.length > 0) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'User already exists' });
    } else {
      const response = await axios.post(`${API_URL}/users`, { name, email, password });
      saveUserState(response.data);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    }
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: 'An error occurred' });
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  return { type: 'LOGOUT' };
};

export const checkExistingSession = () => (dispatch) => {
  const user = loadUserState();
  if (user) {
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  }
};