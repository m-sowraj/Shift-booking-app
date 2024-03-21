import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Myshiftsheader = () => {
  

  return (
    <View style={styles.container}>
             <Text style={[styles.text]}>My Shifts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingTop:20,
    // marginHorizontal:1,
    backgroundColor: '#527ce4',
    borderBottomEndRadius:10,
    borderBottomLeftRadius:10,

  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    paddingLeft:15,
    fontWeight: 'bold',
  },
  selectedButton: {
    // backgroundColor: 'pink',
  },
  selectedText: {
    color: 'orange', 
  },
});

export default Myshiftsheader;
