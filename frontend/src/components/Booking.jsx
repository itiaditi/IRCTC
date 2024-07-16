import React, { useState } from 'react';

const BookTrain = () => {
  const [trainName, setTrainName] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState(1); // Default to booking 1 seat
  const [bookingStatus, setBookingStatus] = useState('');
  const [error, setError] = useState('');

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
        <div id="book-train" className="w-5/6 lg:w-1/2 mx-auto rounded-md shadow-2xl">
          <div className="py-4 px-8 text-white text-xl border-b border-grey-lighter">Book Train</div>
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
              <label className="block text-white text-sm font-bold mb-2" htmlFor="number_of_seats">
                Number of Seats
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="number_of_seats"
                type="number"
                min="1"
                value={numberOfSeats}
                onChange={(e) => setNumberOfSeats(parseInt(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between mt-8">
              <button
                className="bg-white shadow-2xl hover:bg-blue-dark text-[#694585] font-bold py-2 px-4 rounded-full"
                type="button"
                onClick={handleBookTrain}
              >
                Book Train
              </button>
              <p className="text-center my-4">
                <a href="#" className="text-white text-sm no-underline hover:text-grey-darker">
                  Back to Home
                </a>
              </p>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {bookingStatus && <p className="text-green-500 mt-4">{bookingStatus}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTrain;
