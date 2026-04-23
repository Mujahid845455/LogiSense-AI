import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_MAPPLS_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_MAPPLS_CLIENT_SECRET;

let accessToken = null;
let tokenExpiry = null;

export const getMapplsToken = async () => {
    // Return cached token if valid
    if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
        return accessToken;
    }

    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', CLIENT_ID);
        params.append('client_secret', CLIENT_SECRET);

        const response = await axios.post('https://outpost.mappls.com/api/security/oauth/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        accessToken = response.data.access_token;
        // Set expiry (default 3600s, let's subtract 60s for safety)
        tokenExpiry = Date.now() + (response.data.expires_in - 60) * 1000;
        
        return accessToken;
    } catch (error) {
        console.error('Error fetching Mappls token:', error);
        return null;
    }
};

/**
 * Get an optimized route between coordinates
 * @param {string} coordinates - Semicolon separated lon,lat pairs (e.g. "77.23,28.62;77.10,28.72")
 */
export const getOptimizedRoute = async (coordinates) => {
    const token = await getMapplsToken();
    if (!token) return null;

    try {
        const response = await axios.get(`https://route.mappls.com/route/optimization/trip_optimization_eta/driving/${coordinates}`, {
            params: {
                region: 'ind',
                geometries: 'polyline',
                overview: 'full',
                steps: false,
                source: 'first',
                destination: 'last',
                roundtrip: false,
                access_token: token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching optimized route:', error);
        return null;
    }
};
