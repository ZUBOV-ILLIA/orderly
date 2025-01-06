import axios from "@/axiosInterceptors";

const API = process.env.NEXT_PUBLIC_API;

type User = {
  email: string;
  password: string;
};

export const registration = async (user: User, locale: string) => {
  try {
    const res = await axios.post(`${API}/auth/register`, user, {
      headers: {
        "Accept-Language": locale,
      },
    });

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const activation = async (activationSlug: string) => {
  try {
    const res = await axios.get(`${API}/auth/activation/${activationSlug}`);

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const login = async (user: User) => {
  try {
    const res = await axios.post(`${API}/auth/login`, user);

    return res.data;
  } catch (e) {
    console.error(e);
  }
};
