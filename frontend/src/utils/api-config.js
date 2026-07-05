
export const AUTH_SERVICE_URL = "http://localhost:8081/auth-service/api";
export const GEOMETRY_SERVICE_URL = "http://localhost:8082/geometry-service/api";

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${AUTH_SERVICE_URL}/auth/login`,
        REGISTER: `${AUTH_SERVICE_URL}/auth/register`,
    },
    GEOMETRY: {
        POINTS: `${GEOMETRY_SERVICE_URL}/points`,
    }
};

export const getAuthHeader = () => {
    const token = localStorage.getItem('accessToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};