import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';

const CheckTrainAvailability = () => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [stations, setStations] = useState([]);
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [trainName, setTrainName] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, token } = useAuth(); // Assume token is available in the auth context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://irctc-lc7w.onrender.com/');
        setStations(response.data.stations);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error('An error occurred while fetching stations.');
      }
    };

    fetchStations();
  }, []);

  const handleCheckAvailability = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://irctc-lc7w.onrender.com/train`, {
          params: {
            source_station_name: fromStation,
            destination_station_name: toStation
          }
        });
      setTrains(response.data.trains);
      setLoading(false);
      toast.success('Trains fetched successfully.');
    } catch (err) {
      setLoading(false);
      toast.error('An error occurred while fetching train data.');
    }
  };

  const handleBookTrain = async () => {
    if (!isLoggedIn.isAuth) {
      toast.error('You must be logged in to book a train.');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://irctc-lc7w.onrender.com/book', {
        train_name: trainName,
        number_of_seats: numberOfSeats,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${isLoggedIn.token}`, // Include the token in the Authorization header
        }
      });

      toast.success(response.data.message);
      setLoading(false);
      navigate('/booking-details');
    } catch (err) {
      setLoading(false);
      toast.error('An error occurred while booking the train.');
    }
  };

  return (
    <div className="w-full bg-grey-lightest" style={{ paddingTop: '4rem' }}>
      <ToastContainer />
      <div className="container mx-auto py-8">
        <div id="register" className="w-5/6 lg:w-1/2 mx-auto rounded-md shadow-2xl">
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
                disabled={loading}
              >
                {loading ? 'Checking...' : 'Check Availability'}
              </button>
              <p className="text-center my-4">
                <a href="/" className="text-white text-sm no-underline hover:text-grey-darker">
                  Back to Home
                </a>
              </p>
            </div>
            {trains.length > 0 && (
              <div className="mt-8 text-black bg-white">
                <h2 className="text-black text-lg mb-4">Available Trains:</h2>
                <ul>
                  {trains.map((train) => (
                    <li key={train.train_id} className="text-black mb-2">
                      Train Name: {train.train_name} <br /> From: {train.sourceStation.station_name}{' '}
                      <br /> To: {train.destinationStation.station_name} <br /> Total Seats: {train.total_seats}
                      <br />
                      <button
                        className="bg-[#694585] shadow-2xl hover:bg-blue-dark text-[white] font-bold py-2 px-4 rounded-full ml-4"
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
                  onClick={handleBookTrain}
                  disabled={loading}
                >
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckTrainAvailability;
