import API from './api';

const register = async (userData) => {
    const response = await API.post('/users/register', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const login = async (userData) => {
    const response = await API.post('/users/login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

const authService = {
    register,
    login,
    logout,
};

export default authService;
