import React, { useEffect } from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
} from 'react-native';
import Button from '../../components/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatePlate, deletePlate } from '../../services/pratosService'
import { useNavigation, useIsFocused } from '@react-navigation/native';


function DetailPlate({ route }) {
    const [plate, setPlate] = React.useState({});
    const [nomeP, onChangeNomeP] = React.useState('');
    const [descricaoP, onChangeDescricaoP] = React.useState('');
    const [precoP, onChangePrecoP] = React.useState('');

    const isFocused = useIsFocused();
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

        await updatePlate(plate.id, data)

        Alert.alert('Prato alterado com sucesso!');

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

    const removePlate = async () => {
        Alert.alert('Excluir Prato!', 'Você realmente deseja excluir o prato?', [
            {
                text: 'Não',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'Sim', onPress: async () => {
                    await deletePlate(plate.id)

                    Alert.alert('Prato excluído com sucesso!');

                    setTimeout(() => navigation.goBack(), 1500)
                }
            },
        ]);
    }

    const loadData = () => {
        const plate = route.params.plate
        onChangeNomeP(plate?.nome)
        onChangeDescricaoP(plate?.descricao)
        onChangePrecoP(plate?.preco + "")
        setPlate(plate)
    };

    useEffect(() => {
        if (isFocused) {
            loadData();
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.sectionContainer}>
            <Text style={styles.labelText}>Detalhes do Prato</Text>

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
                buttonText="Editar Prato"
                buttonColor="#E9967A"
                onPress={register}
            />

            <Button
                buttonText="Excluir Prato"
                buttonColor="#8C1717"
                onPress={removePlate}
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
    },
});

export default DetailPlate;
