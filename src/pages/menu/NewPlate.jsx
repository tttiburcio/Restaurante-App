import React from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
} from 'react-native';
import Button from '../../components/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createPlate } from '../../services/pratosService'
import { useNavigation } from '@react-navigation/native';


function AddPlate() {
    const [nomeP, onChangeNomeP] = React.useState('');
    const [descricaoP, onChangeDescricaoP] = React.useState('');
    const [precoP, onChangePrecoP] = React.useState('');


    const navigation = useNavigation();

    const register = async () => {
        const errorMessage = getErrorMessage();

        if (errorMessage) {
            Alert.alert('Erro', errorMessage, [
                { text: 'OK', onPress: () => { } },
            ]);
            return
        }

        const value = await AsyncStorage.getItem('restaurantData');

        const data = {
            nome: nomeP,
            descricao: descricaoP,
            preco: precoP,
            restaurante: {
                restauranteID: JSON.parse(value).restauranteID,
            }
        }

        await createPlate(data)

        Alert.alert('Prato cadastrado com sucesso!');

        setTimeout(() => navigation.goBack(), 1500)

    };

    const getErrorMessage = () => {
        if (!nomeP) {
            return "O nome do prato é obrigatório.";
        }

        if (!descricaoP) {
            return "A descrição do prato é obrigatório.";
        }

        if (!precoP) {
            return "O preço do prato é obrigatório.";
        }

    }

    return (
        <SafeAreaView style={styles.sectionContainer}>
            <Text style={styles.labelText}>Cadastro de Pratos</Text>

            <TextInput
                style={styles.input}
                onChangeText={onChangeNomeP}
                value={nomeP}
                placeholder="Nome"
            />

            <TextInput
                style={styles.input}
                onChangeText={onChangeDescricaoP}
                value={descricaoP}
                placeholder="Descrição"
            />

            <TextInput
                style={styles.input}
                onChangeText={onChangePrecoP}
                value={precoP}
                placeholder="Preço"
            />

            <Button
                buttonText="Cadastrar"
                buttonColor="#E9967A"
                onPress={register}
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

export default AddPlate;
