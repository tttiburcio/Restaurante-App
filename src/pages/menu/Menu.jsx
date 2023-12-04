import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button/Button';
import { getAllPlates } from '../../services/pratosService'

export default () => {
    const [restaurant, setRestaurant] = useState({});
    const [plates, setPlates] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const fetchData = async () => {
        const value = await AsyncStorage.getItem('restaurantData');
        if (!value) {
            navigation.navigate('Login')
            return
        }
        setRestaurant(JSON.parse(value));
        setPlates(await getAllPlates(JSON.parse(value).restauranteID));
    };

    const exit = async () => {
        setPlates([]);
        await AsyncStorage.removeItem('restaurantData', () => navigation.navigate('Login'));
        setRestaurant({});
    }

    const renderList = () => {
        return plates.map((plate) => (
            <TouchableOpacity
                key={plate.id}
                onPress={() => navigation.navigate('PlateDetail')}>
                <View
                    key={1}
                    style={styles.categoryContent}
                >
                    <Text style={styles.text}>{plate.nome}</Text>
                    <Text style={styles.text}>R$ {plate.preco}</Text>
                </View>
            </TouchableOpacity >

        ))
    }

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    return (
        <>
            <SafeAreaView style={styles.sectionContainer}>
                <View style={styles.topView}>
                    <Text style={styles.labelText}>Olá {restaurant?.nome}!</Text>
                    <Button
                        buttonText="Sair"
                        buttonColor="#8C1717"
                        onPress={exit}
                        width={50}
                        marginTop={0}
                    />
                </View>
                <View style={styles.midView}>
                    <Text style={styles.menuLabel}>Cardapio</Text>
                    <Button
                        buttonText="Adicionar"
                        buttonColor="#E9967A"
                        onPress={() => navigation.navigate("NewPlate")}
                        marginTop={30}
                    />
                    <ScrollView>
                        {plates && renderList()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#EAEAEA',
        flex: 1,
        padding: 30,
        justifyContent: 'space-between'
    },
    labelText: {
        fontSize: 25,
        justifyContent: 'flex-start',
    },
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    midView: {
        marginTop: 20,
        justifyContent: 'space-around',
    },
    categoryContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 7,
        backgroundColor: 'white',
        height: 70,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'space-between'
    },
    icon: {
        marginRight: 20,
    },
    menuLabel: {
        fontSize: 25,
        alignSelf: 'center'
    },
});
