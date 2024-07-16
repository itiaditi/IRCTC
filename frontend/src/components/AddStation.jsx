import React, { useState } from 'react';

const AddStation = () => {
  const [stationName, setStationName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddStation = async () => {
    try {
      const response = await fetch(
        'https://irctc-lc7w.onrender.com/station/addstation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust as needed
          },
          body: JSON.stringify({ station_name: stationName }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError('');
        setStationName('');
      } else {
        setError(data.error);
        setMessage('');
      }
    } catch (err) {
      setError('An error occurred while adding the station.');
    }
  };

  return (
    <div className="w-full bg-grey-lightest" style={{ paddingTop: '4rem' }}>
      <div className="container mx-auto py-8">
        <div id="add-station" className="w-5/6 lg:w-1/2 mx-auto rounded-md shadow-2xl">
          <div className="py-4 px-8 text-white text-xl border-b border-grey-lighter">
            Add Station
          </div>
          <div className="py-4 px-8">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="station_name">
                Station Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="station_name"
                type="text"
                placeholder="Enter station name"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between mt-8">
              <button
                className="bg-white shadow-2xl hover:bg-blue-dark text-[#694585] font-bold py-2 px-4 rounded-full"
                type="button"
                onClick={handleAddStation}
              >
                Add Station
              </button>
              <p className="text-center my-4">
                <a href="#" className="text-white text-sm no-underline hover:text-grey-darker">
                  Back to Home
                </a>
              </p>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {message && <p className="text-green-500 mt-4">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStation;
