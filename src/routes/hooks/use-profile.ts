import axios from "axios";
import { useState, useEffect } from "react";

export const useProfile = () => {
  const [user, setUser] = useState<null | {
    displayName: string;
    email: string;
    photoURL?: string;
  }>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://52.203.31.162:5001/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setUser({
            displayName: res.data.data.username,
            email: res.data.data.email,
            photoURL: res.data.data.avatar || '/assets/images/avatar/avatar-25.webp',
          });
        }
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };

    fetchProfile();
  }, []);

  return user;
};