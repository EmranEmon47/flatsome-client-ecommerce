import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";

// ✅ Use live backend URL from Render
const API_URL = "https://flatsome-server-ecommerce.onrender.com/api/admin/users";

const useAdminUsers = () => {
    const [users, setUsers] = useState([]);

    const getToken = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error("No authenticated user");
        return user.getIdToken();
    };

    const fetchUsers = async () => {
        try {
            const token = await getToken();
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            toast.error("Failed to fetch users");
        }
    };

    const promoteUser = async (userId) => {
        try {
            const token = await getToken();
            await axios.put(
                `${API_URL}/${userId}/role`,
                { role: "admin" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("User promoted to admin successfully");
            fetchUsers();
        } catch (err) {
            console.error(err);
            toast.error("Failed to promote user");
        }
    };

    const demoteUser = async (userId) => {
        try {
            const token = await getToken();
            await axios.put(
                `${API_URL}/${userId}/role`,
                { role: "user" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("User demoted successfully");
            fetchUsers();
        } catch (err) {
            console.error(err);
            toast.error("Failed to demote user");
        }
    };

    const deleteUser = async (userId) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            const token = await getToken();
            await axios.delete(`${API_URL}/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("User deleted");
            fetchUsers();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete user");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        promoteUser,
        demoteUser,
        deleteUser,
        refresh: fetchUsers,
    };
};

export default useAdminUsers;
