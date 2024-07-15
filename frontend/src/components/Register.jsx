import React from 'react';

const Register = () => {
  return (
    <div className="w-full bg-grey-lightest" style={{ paddingTop: '4rem' }}>
      <div className="container mx-auto py-8">
        <div id="register" className="w-5/6 lg:w-1/2 mx-auto  rounded-md shadow-2xl">
          <div className="py-4 px-8 text-white text-xl border-b border-grey-lighter">
            Register for a free account
          </div>
          <div className="py-4 px-8">
            <div className="flex mb-4">
              <div className="w-1/2 mr-1">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="first_name"
                >
                  First Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  id="first_name"
                  type="text"
                  placeholder="Your first name"
                />
              </div>
              <div className="w-1/2 ml-1">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="last_name"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  id="last_name"
                  type="text"
                  placeholder="Your last name"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
