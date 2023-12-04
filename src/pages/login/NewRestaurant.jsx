import React from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
} from 'react-native';
import Button from '../../components/Button/Button';
import { createRestaurant } from '../../services/restaurantService'
import { useNavigation } from '@react-navigation/native';


function Login() {
    const [nome, onChangeNome] = React.useState('');
    const [cnpj, onChangeCnpj] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [cep, onChangeCep] = React.useState('');
    const [logradouro, onChangeLogradouro] = React.useState('');
    const [numero, onChangeNumero] = React.useState('');
    const [complemento, onChangeComplemento] = React.useState('');
    const [bairro, onChangeBairro] = React.useState('');
    const [cidade, onChangeCidade] = React.useState('');
    const [estado, onChangeEstado] = React.useState('');

    const navigation = useNavigation();

    const register = async () => {
        const errorMessage = getErrorMessage();

        if (errorMessage) {
            Alert.alert('Erro', errorMessage, [
                { text: 'OK', onPress: () => { } },
            ]);
            return
        }

        const data = {
            nome,
            cnpj,
            email,
            senha: password,
            endereco: {
                cep,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                uf: estado
            }
        }

        await createRestaurant(data)

        Alert.alert('Restaurante cadastrado com sucesso!');

        setTimeout(() => navigation.navigate('Login'), 1500)

        // chamar login
    };

    const getErrorMessage = () => {
        if (!nome) {
            return "O campo Nome é obrigatório.";
        }

        if (!cnpj) {
            return "O campo CNPJ é obrigatório.";
        }

        if (!email) {
            return "O campo Email é obrigatório.";
        }

        if (!password) {
            return "O campo Senha é obrigatório.";
        }

        if (!cep) {
            return "O campo CEP é obrigatório.";
        }

        if (!logradouro) {
            return "O campo Logradouro é obrigatório.";
        }

        if (!numero) {
            return "O campo Número é obrigatório.";
        }

        if (!bairro) {
            return "O campo Bairro é obrigatório.";
        }

        if (!cidade) {
            return "O campo Cidade é obrigatório.";
        }

        if (!estado) {
            return "O campo Estado é obrigatório.";
        }



    }

    return (
        <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.sectionContainer}>
                <Text style={styles.labelText}>Cadastro de Restaurante</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNome}
                    value={nome}
                    placeholder="Nome"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeCnpj}
                    value={cnpj}
                    placeholder="CNPJ"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder="E-mail"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="Senha"
                    secureTextEntry={true}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeCep}
                    value={cep}
                    placeholder="CEP"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLogradouro}
                    value={logradouro}
                    placeholder="Logradouro"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumero}
                    value={numero}
                    placeholder="Número"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeComplemento}
                    value={complemento}
                    placeholder="Complemento"
                />


                <TextInput
                    style={styles.input}
                    onChangeText={onChangeBairro}
                    value={bairro}
                    placeholder="Bairro"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeCidade}
                    value={cidade}
                    placeholder="Cidade"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEstado}
                    value={estado}
                    placeholder="Estado"
                />

                <Button
                    buttonText="Cadastrar"
                    buttonColor="#E9967A"
                    onPress={register}
                />

            </SafeAreaView>
        </ScrollView >
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
        marginTop: 17,
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

export default Login;
