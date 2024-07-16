import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      const response = await axios.post('https://irctc-lc7w.onrender.com/register', {
        name,
        email,
        password
      });

      if (response) {
        navigate('/login')
      }
    } catch (error) {
      console.error('There was an error registering the user!', error);
      alert('Error registering user. Please try again.');
    }
  };

  return (
    <div className="w-full bg-grey-lightest" style={{ paddingTop: '4rem' }}>
      <div className="container mx-auto py-8">
        <div id="register" className="w-5/6 lg:w-1/2 mx-auto  rounded-md shadow-2xl">
          <div className="py-4 px-8 text-white text-xl border-b border-grey-lighter">
            Register for a free account
          </div>
          <div className="py-4 px-8">
            <form onSubmit={handleSubmit}>
              <div className="flex mb-4">
                <div className="w-full mr-1">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="name"
                    type="text"
                    placeholder="Your first name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
               
              </div>
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
                  className=" border rounded w-full py-2 px-3 text-grey-darker"
                  id="password"
                  type="password"
                  placeholder="Your secure password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <p className="text-grey text-xs mt-1">At least 6 characters</p>
              </div>
              <div className="flex items-center justify-between mt-8">
                <button
                  className="bg-white shadow-2xl hover:bg-blue-dark text-[#694585] font-bold py-2 px-4 rounded-full"
                  type="submit"
                >
                  Sign Up
                </button>
                <p className="text-center my-4">
                  <a
                    href="#"
                    className="text-white text-sm no-underline hover:text-grey-darker"
                  >
                    I already have an account
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
