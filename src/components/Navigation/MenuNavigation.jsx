import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../pages/login/Login';
import NewRestaurant from '../../pages/login/NewRestaurant';
import Menu from '../../pages/menu/Menu';
import NewPlate from '../../pages/menu/NewPlate';
import PlateDetail from '../../pages/menu/PlateDetail';

const Stack = createNativeStackNavigator();

export default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="NewRestaurant" component={NewRestaurant} />
                <Stack.Screen name="NewPlate" component={NewPlate} />
                <Stack.Screen name="PlateDetail" component={PlateDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
