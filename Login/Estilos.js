import {
    StyleSheet
  } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 20
    },
    input: {
        height: 45,
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        borderColor: '#EEE',
        borderWidth: 1,
        marginBottom: 10
    },
    inputError: {
        height: 45,
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        borderColor: '#F00',
        borderWidth: 2,
        paddingHorizontal: 20,
        marginBottom: 10
    }
});