import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AreaSelection = ({ handleAreaSelect }) => {
  const [selectedArea, setSelectedArea] = useState('Helsinki');

  const handlePress = (area) => {
    setSelectedArea(area);
    handleAreaSelect(area);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, selectedArea === 'Helsinki' ? styles.selectedButton : null]}
        onPress={() => handlePress('Helsinki')}>
        <Text style={[styles.text, selectedArea === 'Helsinki' ? styles.selectedText : null]}>Helsinki</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedArea === 'Tampere' ? styles.selectedButton : null]}
        onPress={() => handlePress('Tampere')}>
        <Text style={[styles.text, selectedArea === 'Tampere' ? styles.selectedText : null]}>Tampere</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedArea === 'Turku' ? styles.selectedButton : null]}
        onPress={() => handlePress('Turku')}>
        <Text style={[styles.text, selectedArea === 'Turku' ? styles.selectedText : null]}>Turku</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingTop:20,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButton: {
  },
  selectedText: {
    color: 'orange',
  },
});

export default AreaSelection;
