import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);     // default to empty array
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

    //   console.log("API Users Response:", res.data);

      // Handle both: array or wrapped in { users: [...] }
      const data = res.data;
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.warn("Unexpected response format:", data);
        setUsers([]); // fallback
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  const toggleBan = async (id) => {
    const confirmAction = window.confirm("Are you sure you want to ban/unban this user?");
    if (!confirmAction) return;

    try {
      await axios.put(`/api/admin/users/${id}/ban`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchUsers(); // refresh after update
    } catch (err) {
      console.error("Error toggling ban:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 border-b pb-2 border-blue-500 text-blue-800">
        All Users
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : Array.isArray(users) && users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg shadow-md border p-4 hover:shadow-lg transition duration-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-sm text-gray-600 mb-1">{user.email}</p>
              <p className="text-sm text-gray-700">Points: {user.points}</p>
              <p className="text-sm text-gray-700">Role: {user.role}</p>
              <button
                onClick={() => toggleBan(user._id)}
                className={`mt-3 px-4 py-2 rounded text-white w-full font-semibold ${
                  user.banned
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {user.banned ? "Unban User" : "Ban User"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No users found.</p>
      )}
    </div>
  );
};

export default Users;
