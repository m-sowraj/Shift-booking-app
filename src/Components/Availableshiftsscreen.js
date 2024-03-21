import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import AreaSelection from './AreaSelection';
import ShiftList from './ShiftList';
import { fetchShifts, bookShift, cancelShift } from './api';
import CustomAlert from './CustomAlert';

const Availableshiftsscreen = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [selectedArea, setSelectedArea] = useState('Helsinki');
  const [shifts, setShifts] = useState([]);
  const [alldata,setalldata] = useState('');

  useEffect(() => {
    loadShifts();
  }, [selectedArea]);

  const loadShifts = async () => {
    try {
      if (selectedArea) {
        const data = await fetchShifts(selectedArea);
        const alldata = await fetchShifts()
        console.log("hiii")
        setShifts(data);
        setalldata(alldata)
      }
    } catch (error) {
      console.error('Error loading shifts:', error);
      Alert.alert('Error', 'Failed to load shifts. Please try again later.');
    }
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  const handleBookShift = async (shiftId) => {
    try {
      const response = await bookShift(shiftId);
       setAlertTitle('Success');
      setAlertMessage('Shift booked successfully.');
      setAlertVisible(true);
      loadShifts();
    } catch (error) {
      console.error('Error booking shift:', error);
      setAlertTitle('Error');
      setAlertMessage('Failed to book shift. Please try again later.');
    }
    setTimeout(() => {
      setAlertVisible(false); 
    }, 2000);
  };

  const handleCancelShift = async (shiftId) => {
    try {
      await cancelShift(shiftId);
      setAlertTitle('Success');
      setAlertMessage('Shift cancelled successfully.');
      setAlertVisible(true);
      loadShifts();
    } catch (error) {
      console.error('Error cancelling shift:', error);
      AsetAlertTitle('Sorry');
      setAlertMessage('Failed to Cancell');
      setAlertVisible(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
       <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
      <AreaSelection handleAreaSelect={handleAreaSelect} />
     
      <ShiftList shifts={shifts} allshifts={alldata} onBookShift={handleBookShift} onCancelShift={handleCancelShift} />
    </View>
  );
};

export default Availableshiftsscreen;
