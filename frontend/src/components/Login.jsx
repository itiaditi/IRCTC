import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      const response = await axios.post('https://irctc-lc7w.onrender.com/login', formData);

      if (response.status === 200) {
        // Store the token and user details in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.payload));
        setIsLoggedIn({
          isAuth: true,
          token: response.data.token,
          isAdmin: response.data.payload.role === "admin" ? "admin" : false,
          isUser: response.data.payload.role === "user" ? "user" : false,
          userId: response.data.payload.id
        });
        // Show success toast
        toast.success('Login successful');
        navigate("/");
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please check your credentials and try again.');
      // Show error toast
      toast.error('Error logging in. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await handleLogin(formData);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="w-full bg-grey-lightest" style={{ paddingTop: '4rem' }}>
      <ToastContainer />
      <div className="container mx-auto py-8">
        <div id="register" className="w-5/6 lg:w-1/2 mx-auto rounded-md shadow-2xl">
          <div className="py-4 px-8 text-white text-xl border-b border-grey-lighter">
            Login
          </div>
          <div className="py-4 px-8">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3 text-grey-darker"
                    id="password"
                    type="password"
                    placeholder="Your secure password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <p className="text-grey text-xs mt-1">At least 6 characters</p>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex items-center justify-between mt-8">
                  <button
                    className="bg-white shadow-2xl hover:bg-blue-dark text-[#694585] font-bold py-2 px-4 rounded-full"
                    type="submit"
                  >
                    Login
                  </button>
                  <p className="text-center my-4">
                    <a
                      href="#"
                      className="text-white text-sm no-underline hover:text-grey-darker"
                    >
                      Don't have an account
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
