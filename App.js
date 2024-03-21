import React from 'react';
import { StatusBar, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Availableshiftsscreen from './src/Components/Availableshiftsscreen';
import MyShifts from './src/Components/MyShifts';
import Myshiftsheader from './src/Components/Myshiftsheader';
const { width } = Dimensions.get('window');

function Myshift() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
   
   <StatusBar backgroundColor="#527ce4" style="auto" />
      <Myshiftsheader />
        <MyShifts />
       
      <Footer navigation={navigation} currentPage="Page1" />
    </View>
  );
}

function Availableshifts() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
      <StatusBar backgroundColor="#527ce4" style="auto" />

     
      <Availableshiftsscreen />

      <Footer navigation={navigation} currentPage="Page2" />
    </View>
  );
}

function Footer({ navigation, currentPage }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={[styles.button,{ width: width * 0.5 }, currentPage === 'Page1' && styles.highlighted]} onPress={() => navigation.navigate('Page1')}>
        <Text style={{color:"white" ,fontSize: 15, fontWeight: 'bold' }}>My Shifts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { width: width * 0.5 },currentPage === 'Page2' && styles.highlighted]} onPress={() => navigation.navigate('Page2')}>
        <Text style={{color:"white" ,fontSize: 15, fontWeight: 'bold' }}>Available shifts</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Page1"
            component={Myshift}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Page2"
            component={Availableshifts}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    
    // paddingVertical: 10,
  },
  button: {
    padding: 20,
    alignItems: 'center',
    // borderRadius: 50,
  },
  highlighted: {
    backgroundColor: '#527ce4',
  },
  scrollView: {
    flex: 1,
  },
});
