import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckTrainAvailability = () => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [stations, setStations] = useState([]);
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [trainName, setTrainName] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState(1); // Default to booking 1 seat
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('https://irctc-lc7w.onrender.com/');
        const data = await response.json();

        if (response.ok) {
          setStations(data.stations);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('An error occurred while fetching stations.');
      }
    };

    fetchStations();
  }, []);

  const handleCheckAvailability = async () => {
    try {
      const response = await fetch(
        `https://irctc-lc7w.onrender.com/train?source_station_name=${fromStation}&destination_station_name=${toStation}`
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

  const handleBookTrain = async () => {
    try {
      const response = await fetch('https://irctc-lc7w.onrender.com/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          train_name: trainName,
          number_of_seats: numberOfSeats,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setBookingStatus(data.message);
        navigate('/booking-details');
        setError('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred while booking the train.');
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
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="from_station"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
              >
                <option value="">Select departure station</option>
                {stations.map((station) => (
                  <option key={station.station_id} value={station.station_name}>
                    {station.station_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="to_station">
                To Station
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="to_station"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
              >
                <option value="">Select arrival station</option>
                {stations.map((station) => (
                  <option key={station.station_id} value={station.station_name}>
                    {station.station_name}
                  </option>
                ))}
              </select>
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
                      <button
                        className="bg-white shadow-2xl hover:bg-blue-dark text-[#694585] font-bold py-2 px-4 rounded-full ml-4"
                        type="button"
                        onClick={() => {
                          setSelectedTrain(train.train_id);
                          setTrainName(train.train_name);
                        }}
                      >
                        Book Train
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedTrain && (
              <div className="mt-8">
                <h2 className="text-white text-lg mb-4">Book Train</h2>
                <label className="block text-white text-sm font-bold mb-2" htmlFor="number_of_seats">
                  Number of Seats
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  id="number_of_seats"
                  type="number"
                  value={numberOfSeats}
                  onChange={(e) => setNumberOfSeats(parseInt(e.target.value))}
                  min="1"
                  max="10"
                />
                <button
                  className="bg-white shadow-2xl hover:bg-blue-dark text-[#694585] font-bold py-2 px-4 rounded-full mt-4"
                  type="button"
                  onClick={() => handleBookTrain(selectedTrain)}
                >
                  Confirm Booking
                </button>
                {bookingSuccess && <p className="text-green-500 mt-4">{bookingStatus}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckTrainAvailability;
