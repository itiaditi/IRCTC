import React, { useState } from 'react';

const CheckTrainAvailability = () => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState('');

  const handleCheckAvailability = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/train?source_station_name=${fromStation}&destination_station_name=${toStation}`
      );
      const data = await response.json();

      if (response.ok) {
        setTrains(data.trains);
        setError('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred while fetching train data.');
    }
  };

  return (
    <div className="w-full bg-grey-lightest" style={{ paddingTop: '4rem' }}>
      <div className="container mx-auto py-8">
        <div id="check-train-availability" className="w-5/6 lg:w-1/2 mx-auto rounded-md shadow-2xl">
          <div className="py-4 px-8 text-white text-xl border-b border-grey-lighter">
            Check Train Availability
          </div>
          <div className="py-4 px-8">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="from_station">
                From Station
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="from_station"
                type="text"
                placeholder="Enter departure station"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="to_station">
                To Station
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="to_station"
                type="text"
                placeholder="Enter arrival station"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between mt-8">
              <button
                className="bg-white shadow-2xl hover:bg-blue-dark text-[#694585] font-bold py-2 px-4 rounded-full"
                type="button"
                onClick={handleCheckAvailability}
              >
                Check Availability
              </button>
              <p className="text-center my-4">
                <a href="#" className="text-white text-sm no-underline hover:text-grey-darker">
                  Back to Home
                </a>
              </p>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {trains.length > 0 && (
              <div className="mt-8">
                <h2 className="text-white text-lg mb-4">Available Trains:</h2>
                <ul>
                  {trains.map((train) => (
                    <li key={train.train_id} className="text-white mb-2">
                      Train Name: {train.train_name} | From: {train.sourceStation.station_name} | To: {train.destinationStation.station_name} | Total Seats: {train.total_seats}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckTrainAvailability;
