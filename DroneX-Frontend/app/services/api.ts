const API_URL = 'http://localhost:5000/api';

export const fetchDrones = async () => {
    const response = await fetch(`${API_URL}/drones`);
    if (!response.ok) {
        throw new Error('Failed to fetch drones');
    }
    return response.json();
};

export const fetchUser = async () => {
    const response = await fetch(`${API_URL}/user`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return response.json();
}; 