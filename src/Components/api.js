import axios from 'axios';

const BASE_URL = 'https://shift-booking-mock-api.onrender.com';

export const fetchShifts = async (area) => {
  try {
    const response = await axios.get(`${BASE_URL}/shifts`);
    let allShifts = response.data;
    allShifts.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (area) {
      const filteredShifts = allShifts.filter(shift => shift.area === area);
      return filteredShifts;
    } else {
      return allShifts;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchBookedShifts = async () => {
  try {
    const allShifts = await fetchShifts();
    const bookedShifts = allShifts.filter(shift => shift.booked);
    return bookedShifts;
  } catch (error) {
    throw error;
  }
};

export const bookShift = async (shiftId) => {
  try {
    const response = await axios.post(`${BASE_URL}/shifts/${shiftId}/book`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelShift = async (shiftId) => {
  try {
    const response = await axios.post(`${BASE_URL}/shifts/${shiftId}/cancel`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
