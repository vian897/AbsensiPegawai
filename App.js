/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {
  Component
} from 'react';

import { Container, Left, Header, Title, Body, Right } from 'native-base';


import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AbsenTendik from './screen/AbsensiTendik';
import AbsenKontrak from './screen/AbsensiKontrak';
import AbsenDosen from './screen/AbsensiDosen';

const Tab = createBottomTabNavigator();

export default class AppRoot extends Component {

  render() {
    return (
      <Container>

        <Header noLeft style={{ backgroundColor: '#990000' }}>
          <Left />
          <Body>
            <Title>Absensi Kehadiran</Title>
          </Body>
          <Right />
        </Header>
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Dosen') {
                iconName = focused
                  ? 'ios-person'
                  : 'ios-person-outline';
              } else if (route.name === 'Tendik') {
                iconName = focused
                  ? 'ios-people-sharp'
                  : 'ios-people-outline';
              } else if (route.name === 'Kontrak') {
                iconName = focused
                  ? 'ios-people-sharp'
                  : 'ios-people-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
            tabBarOptions={{
              activeTintColor: '#990000',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Dosen" component={AbsenDosen} />
            <Tab.Screen name="Tendik" component={AbsenTendik} />
            <Tab.Screen name="Kontrak" component={AbsenKontrak} />
          </Tab.Navigator>
        </NavigationContainer>

      </Container>
    );
  }
}
