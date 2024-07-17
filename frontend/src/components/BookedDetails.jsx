import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

const BookedDetails = () => {
  const [bookingId, setBookingId] = useState(''); // Assume booking ID is known or passed as a prop
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(
          `https://irctc-lc7w.onrender.com/bookings/${bookingId}`
        );
        const data = await response.json();

        if (response.ok) {
          setBooking(data.booking);
          setError('');
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('An error occurred while fetching booking data.');
      }
    };

    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  const handleDownload = () => {
    if (booking) {
      const bookingDetails = `
        Booking ID: ${booking.booking_id}
        Train Name: ${booking.Train.train_name}
        User: ${booking.User.name} (${booking.User.email})
        Booking Status: ${booking.booking_status}
      `;
      const blob = new Blob([bookingDetails], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, `booking_${booking.booking_id}.txt`);
    }
  };

  return (
    <div className="w-full bg-grey-lightest" style={{ paddingTop: '4rem' }}>
      <div className="container mx-auto py-8">
        <div id="booking-details" className="w-5/6 lg:w-1/2 mx-auto rounded-md shadow-2xl">
          <div className="py-4 px-8 text-white text-xl border-b border-grey-lighter">
            Booking Details
          </div>
          <div className="py-4 px-8">
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {booking ? (
              <div className="mt-8">
                <h2 className="text-white text-lg mb-4">Booking Information:</h2>
                <ul>
                  <li className="text-white mb-2">
                    Booking ID: {booking.booking_id}
                  </li>
                  <li className="text-white mb-2">
                    Train Name: {booking.Train.train_name}
                  </li>
                  <li className="text-white mb-2">
                    User: {booking.User.name} ({booking.User.email})
                  </li>
                  <li className="text-white mb-2">
                    Booking Status: {booking.booking_status}
                  </li>
                </ul>
                <button
                  className="mt-4 bg-white text-[#694585] font-bold py-2 px-4 rounded-full shadow-2xl hover:bg-blue-dark"
                  onClick={handleDownload}
                >
                  Download Booking Details
                </button>
              </div>
            ) : (
              !error && <p className="text-white mt-4">Loading booking details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedDetails;
