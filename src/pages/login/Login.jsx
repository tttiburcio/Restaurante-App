import React from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
} from 'react-native';
import Button from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { callLogin } from '../../services/loginService'

function Login() {
    const [login, onChangeLogin] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const navigation = useNavigation();

    const doLogin = async () => {
        const errorMessage = getErrorMessage();

        if (errorMessage) {
            Alert.alert('Erro', errorMessage, [
                { text: 'OK', onPress: () => { } },
            ]);
            return
        }

        try {
            const restaurant = await callLogin(login, password);
            const rawData = JSON.stringify(restaurant);
            await AsyncStorage.setItem('restaurantData', rawData, () => navigation.navigate('Menu'));
        } catch (err) {
            console.log(err)
            Alert.alert('Login inválido!', errorMessage, [
                { text: 'OK', onPress: () => { } },
            ]);
        }
    };

    const getErrorMessage = () => {
        if (!login) {
            return "login é obrigatório";
        }

        if (!password) {
            return "senha é obrigatório";
        }
    }

    return (
        <SafeAreaView style={styles.sectionContainer}>
            <Text style={styles.labelText}>RESTAURANTE</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeLogin}
                value={login}
                placeholder="Login"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Senha"
                secureTextEntry={true}
            />
            <Button
                buttonText="Logar"
                buttonColor="#FA8072"
                onPress={doLogin}
            />

            <Button
                buttonText="Cadastrar-se"
                buttonColor="#E9967A"
                onPress={() => navigation.navigate("NewRestaurant")}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#EAEAEA',
        flex: 1,
        padding: 50,
        justifyContent: 'center'
    },
    input: {
        marginTop: 30,
        padding: 10,
        borderColor: '#BBBBBB',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 7,
    },
    labelText: {
        fontSize: 25,
        alignSelf: 'center'
    }
});

export default Login;
