import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const BookedDetails = () => {
  const [bookings, setBookings] = useState([]); // Initialize bookings as an array
  const [error, setError] = useState('');
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get('https://irctc-lc7w.onrender.com/bookings', {
          headers: {
            Authorization: `Bearer ${isLoggedIn.token}`, // Add the token to the request headers
          },
        });
        console.log(response.data);
        if (response.status === 200) {
          setBookings(response.data.bookings);
          setError('');
        } else {
          setError(response.data.error);
        }
      } catch (err) {
        setError('An error occurred while fetching booking data.');
      }
    };

    fetchBookingDetails();
  }, [isLoggedIn]);

  const handleDownload = (booking) => {
    if (booking) {
      const doc = new jsPDF();
      doc.text('Booking Details', 10, 10);
      doc.text(`Booking ID: ${booking.booking_id}`, 10, 20);
      doc.text(`Train Name: ${booking.Train.train_name}`, 10, 30);
      doc.text(`User: ${booking.User.name} (${booking.User.email})`, 10, 40);
      doc.text(`Booking Status: ${booking.booking_status}`, 10, 50);
      doc.save(`booking_${booking.booking_id}.pdf`);
    }
  };

  return (
    <div className="w-full bg-grey-lightest" style={{ paddingTop: '4rem' }}>
      <div className="container mx-auto py-8">
        <div id="register" className="w-5/6 lg:w-1/2 mx-auto rounded-md shadow-2xl">
          <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
            Booking Details
          </div>
          <div className="py-4 px-8">
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking.booking_id} className="mt-8">
                  <h2 className="text-black text-lg mb-4">Booking Information:</h2>
                  <ul>
                    <li className="text-black mb-2">Booking ID: {booking.booking_id}</li>
                    <li className="text-black mb-2">Train Name: {booking.Train.train_name}</li>
                    <li className="text-black mb-2">User: {booking.User.name} ({booking.User.email})</li>
                    <li className="text-black mb-2">Booking Status: {booking.booking_status}</li>
                  </ul>
                  <button
                    className="mt-4 bg-white text-[#694585] font-bold py-2 px-4 rounded-full shadow-2xl hover:bg-blue-dark"
                    onClick={() => handleDownload(booking)}
                  >
                    Download Booking Details
                  </button>
                  <hr className='mt-10'></hr>
                </div>
              ))
            ) : (
              <div className="p-8">
                <p className="text-black text-5xl mt-4">Book your destination place to visit</p>
                <p className="text-black mt-10">
                  <Link to="/">Back Home</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedDetails;
