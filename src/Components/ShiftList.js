import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, Dimensions, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ShiftList = ({ shifts, allshifts, onBookShift, onCancelShift }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []); 

  const groupShiftsByDate = () => {
    const groupedShifts = {};
    shifts.forEach(shift => {
      const date = new Date(shift.startTime).toDateString();
      if (!groupedShifts[date]) {
        groupedShifts[date] = [];
      }
      groupedShifts[date].push(shift);
    });
    return groupedShifts;
  };

  const renderShiftItem = ({ item }) => {
    const currentTime = new Date();
    const startTime = new Date(item.startTime);
    const endTime = new Date(item.endTime);
  
    const formatTime = (time) => {
      return time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    };
  
    const isOverlapped = () => {
      for (const shift of allshifts) {
        if (shift.booked && shift.id !== item.id) {
          const shiftStartTime = new Date(shift.startTime);
          const shiftEndTime = new Date(shift.endTime);
  
          if (
            (startTime >= shiftStartTime && startTime < shiftEndTime) ||
            (endTime > shiftStartTime && endTime <= shiftEndTime)
          ) {
            return true;
          }
        }
      }
      return false;
    };
  
    return (
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Text style={styles.shiftInfo}>
            {formatTime(startTime)} - {formatTime(endTime)}
          </Text>
          {currentTime > startTime ? (
            <TouchableOpacity
              disabled
              style={[
                styles.bookButton,
                { backgroundColor: '#CCCCCC' },
              ]}
            >
              <Text style={styles.buttonText}>Time's Up</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                item.booked ? onCancelShift(item.id) : onBookShift(item.id)
              }
              style={
                isOverlapped()
                  ? [
                      styles.bookButton,
                      { backgroundColor: '#CCCCCC' },
                    ]
                  : item.booked
                  ? styles.cancelButton
                  : styles.bookButton
              }
              disabled={isOverlapped()}
            >
              <Text style={styles.buttonText}>
                {isOverlapped() ? 'Overlapped' : item.booked ? 'Cancel' : 'Book'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.line} />
      </View>
    );
  };
  

  const renderDateItem = ({ item }) => (
    <View>
      <Text style={styles.date}>{item.date}</Text>
      <FlatList
        data={item.shifts}
        renderItem={renderShiftItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  const groupedShifts = groupShiftsByDate();
  const data = Object.keys(groupedShifts)
    .map(date => ({
      date,
      shifts: groupedShifts[date],
    }))
    .sort((a, b) => {
      const startTimeA = new Date(a.shifts[0].startTime);
      const startTimeB = new Date(b.shifts[0].startTime);
      return startTimeA - startTimeB;
    });

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#527ce4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderDateItem}
        keyExtractor={(item) => item.date}
        style={styles.flatList}
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
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    width: width,
  },
  itemContainer: {
    marginVertical: 4,
    marginHorizontal: 10,
  },
  item: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  shiftInfo: {
    flex: 1,
  },
  bookButton: {
    backgroundColor: '#527ce4',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  date: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    backgroundColor: '#f8f8f8',
    paddingTop: 10,
    paddingBottom: 10,
  },
 
});

export default ShiftList;
