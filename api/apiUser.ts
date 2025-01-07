import axios from "@/axiosInterceptors";

const API = process.env.NEXT_PUBLIC_API;

export const getProfileInfo = async (id: string) => {
  try {
    const res = await axios.get(`${API}/user/${id}`);

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const updateUserAvatar = async (user: {
  id: string;
  avatar: string | null;
}) => {
  try {
    const res = await axios.post(`${API}/user/avatar/${user.id}`, {
      avatar: user.avatar,
    });

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const updateUserPassword = async (user: {
  id: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${API}/user/password/${user.id}`, {
      password: user.password,
    });

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await axios.delete(`${API}/user/${id}`);

    return res.data;
  } catch (e) {
    console.error(e);
  }
};
