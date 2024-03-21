import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { fetchBookedShifts, cancelShift } from './api'; 
import CustomAlert from './CustomAlert'; 

const MyShifts = () => {
  const [bookedShifts, setBookedShifts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    loadBookedShifts();
  }, []);

  const loadBookedShifts = async () => {
    try {
      setRefreshing(true);
      const data = await fetchBookedShifts(); 
      setBookedShifts(data);
      setRefreshing(false);
      setLoading(false);
    } catch (error) {
      console.error('Error loading booked shifts:', error);
      showAlert('Error', 'Failed to load booked shifts. Please try again later.');
      setRefreshing(false);
      setLoading(false); 
    }
  };

  const handleCancelShift = async (shiftId) => {
    try {
      await cancelShift(shiftId); 
      loadBookedShifts();
    } catch (error) {
      console.error('Error cancelling shift:', error);
      showAlert('Error', 'Failed to cancel shift. Please try again later.');
    }
  };

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false); 
    }, 2000);
  };

  const renderShiftItem = ({ item }) => {
    const startTime = new Date(item.startTime);
    const currentTime = new Date();
  

    const shiftStarted = currentTime > startTime;
  
    return (
      <View>
        <View style={styles.item}>
          <Text style={styles.shiftInfo}>
            {startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} -{' '}
            {new Date(item.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </Text>
          <Text style={styles.shiftInfo}>
            {item.area}
          </Text>
          {shiftStarted ? (
            <View style={[styles.cancelButton, { backgroundColor: 'grey' }]}>
              <Text style={styles.cancelButtonText}>Started</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={() => handleCancelShift(item.id)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.line} />
      </View>
    );
  };
  

  const renderDateItem = ({ item }) => (
    <View style={styles.dateContainer}>
      <Text style={styles.date}>{item.date}</Text>
      <FlatList
        data={item.shifts}
        renderItem={renderShiftItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  const groupShiftsByDate = () => {
    const groupedShifts = {};
    bookedShifts.forEach(shift => {
      const date = new Date(shift.startTime).toDateString();
      if (!groupedShifts[date]) {
        groupedShifts[date] = [];
      }
      groupedShifts[date].push(shift);  
    });
    return groupedShifts;
  };

  const groupedShifts = groupShiftsByDate();
  const data = Object.keys(groupedShifts).map(date => ({
    date,
    shifts: groupedShifts[date],
  }));

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#527ce4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text>No shifts in your queue. See available Shifts.</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderDateItem}
          keyExtractor={(item) => item.date}
          style={styles.flatList}
          refreshing={refreshing}
          onRefresh={loadBookedShifts}
        />
      )}
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  flatList: {
    width: width,
  },
  dateContainer: {
    // marginBottom: 10,
  },
  item: {
    marginVertical:4,
    marginHorizontal:10,
    borderRadius:8,
    elevation: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical:10,
    paddingHorizontal:15,
  },
  shiftInfo: {
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'orange', 
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    marginLeft:12,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    backgroundColor: '#f8f8f8',
    paddingTop: 10,
    paddingBottom: 10,
  },
 
});

export default MyShifts;
