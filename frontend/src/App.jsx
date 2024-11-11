// App.js
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Header";

function App() {
  const [users, setUsers] = useState([]);
  const [regstate, setregstate] = useState("Register");
  const [reg, setreg] = useState("User Registration");
  const [form, setForm] = useState({ name: "", email: "", dob: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [activeTab, setActiveTab] = useState("form");
  const URL = import.meta.env.VITE_URL;

  const fetchUsers = async () => {
    const response = await axios.get(`${URL}/users`);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.dob) {
      alert("All fields are required!");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (editingUser) {
      if (confirm("Are you sure you want to update this user?")) {
        await axios.put(`${URL}/users/${editingUser.id}`, form);
      }
    } else {
      if (confirm("Are you sure you want to add this user?")) {
        await axios.post(`${URL}/users`, form);
      }
    }
  
    setForm({ name: "", email: "", dob: "" });
    setEditingUser(null);
    setreg("User Registration");
    fetchUsers();
  };
  
  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, dob: user.dob });
    setregstate("Update ");
    setreg("Update User");
    setActiveTab("form");
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`${URL}/users/${id}`);
      fetchUsers();
    }
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", dob: "" });
    setEditingUser(null);
    setregstate("Register");
    setreg("User Registration");
    setActiveTab("form");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar/>

      <main className="flex-grow p-8 flex justify-center">
        <div className="w-full sm:w-11/12 md:w-9/12 lg:w-2/3 xl:w-1/2 bg-gray-50 p-6 rounded-lg shadow-lg max-w-screen-xl">
       
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("form")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "form" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {`${regstate} User`}
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "list" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              View Users
            </button>
          </div>

          {activeTab === "form" && (
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">{`${reg}`}</h1>
              <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p>DOB:</p>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-3 rounded-lg w-full hover:bg-blue-700 transition-colors"
                  >
                    {editingUser ? "Update User" : "Add User"}
                  </button>
                  {editingUser && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-400 text-white py-3 rounded-lg w-full hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {activeTab === "list" &&
            (users.length == 0 ? (
              <p className="text-center">No user found</p>
            ) : (
              <ul>
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="flex justify-between items-center py-4 px-3 border-b border-gray-200"
                  >
                    <div>
                      <h2 className="font-semibold text-lg text-gray-700">
                        {user.name}
                      </h2>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-gray-500 text-sm">{user.dob}</p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800 transition-colors font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ))}
        </div>
      </main>
<Footer/>
    </div>
  );
}

export default App;
