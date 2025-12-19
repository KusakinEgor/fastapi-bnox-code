import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const runPythonCode = async (code: string) => {
  try {
    const res = await axios.post(`${API_URL}/run/code`, { code });
    return res.data;
  } catch (err) {
    console.error(err);
    return { stdout: "", stderr: "Error contacting server" };
  }
};

export const runJScript = async (code: string) => {
  try {
    const res = await axios.post(`${API_URL}/run/script`, { code });
    return res.data;
  } catch (err) {
    console.error(err);
    return { stdout: "", stderr: "Error contacting server" };
  }
};

export const registerUser = async (email: string, username: string, password: string) => {
    try {
        const res = await axios.post(`${API_URL}/auth/register`, { email, username, password })
        return res.data;
    } catch (error: any) {
        if (error.response) return { error: error.response.data.detail };
        return { error: "Server error" };
    }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });

    if (res.data?.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
    }

    return res.data;
  } catch (err: any) {
    if (err.response?.data?.detail) return { error: err.response.data.detail };
    return { error: "Server error" };
  }
};

export const sendMessageToAI = async (message: string) => {
    try {
        const request = await axios.post(`${API_URL}/chat`, { message });
        return request.data;
    } catch (err: any) {
        console.error(err);
        return {error: "Error contacting AI server"};
    }
};

export const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem("access_token");

        if (!token) return { error: "No token found" };

        const res = await axios.get(`${API_URL}/users/current`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (err: any) {
      if (err.response?.data?.detail) return { error: err.response.data.detail };
      return { error: "Server error" };
    }
};

export const contact = async (name: string, email: string, message: string) => {
    try {
        const res = await axios.post(
            `${API_URL}/contact`,
            new URLSearchParams({name, email, message}),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        return res.data;
    } catch (err: any) {
        console.error(err);
        if (err.response) return { error: err.response.data.detail };
        return { error: "Server error" };
    }
}
