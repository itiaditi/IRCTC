import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTrain = () => {
  const [trainName, setTrainName] = useState('');
  const [sourceStationName, setSourceStationName] = useState('');
  const [destinationStationName, setDestinationStationName] = useState('');
  const [totalSeats, setTotalSeats] = useState('');

  const handleAddTrain = async () => {
    try {
      const response = await fetch(
        'https://irctc-lc7w.onrender.com/train/train',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust as needed
          },
          body: JSON.stringify({
            train_name: trainName,
            source_station_name: sourceStationName,
            destination_station_name: destinationStationName,
            total_seats: totalSeats,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setTrainName('');
        setSourceStationName('');
        setDestinationStationName('');
        setTotalSeats('');
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error('An error occurred while adding the train.');
    }
  };

  return (
    <div className="w-full bg-grey-lightest" style={{ paddingTop: '4rem' }}>
      <div className="container mx-auto py-8">
        <div id="register" className="w-5/6 lg:w-1/2 mx-auto rounded-md shadow-2xl">
          <div className="py-4 px-8 text-white text-xl border-b border-grey-lighter">
            Add Train
          </div>
          <div className="py-4 px-8">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="train_name">
                Train Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="train_name"
                type="text"
                placeholder="Enter train name"
                value={trainName}
                onChange={(e) => setTrainName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="source_station_name">
                Source Station Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="source_station_name"
                type="text"
                placeholder="Enter source station name"
                value={sourceStationName}
                onChange={(e) => setSourceStationName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="destination_station_name">
                Destination Station Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="destination_station_name"
                type="text"
                placeholder="Enter destination station name"
                value={destinationStationName}
                onChange={(e) => setDestinationStationName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="total_seats">
                Total Seats
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="total_seats"
                type="number"
                placeholder="Enter total seats"
                value={totalSeats}
                onChange={(e) => setTotalSeats(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between mt-8">
              <button
                className="bg-white shadow-2xl hover:bg-blue-dark text-[#694585] font-bold py-2 px-4 rounded-full"
                type="button"
                onClick={handleAddTrain}
              >
                Add Train
              </button>
              <p className="text-center my-4">
                <a href="#" className="text-white text-sm no-underline hover:text-grey-darker">
                  Back to Home
                </a>
              </p>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTrain;
