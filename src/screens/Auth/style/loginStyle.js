import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 180, 254, 0.99)',
    },
    backButton: {
      position: 'absolute',
      alignContent: 'center',
      justifyContent: 'center',
      top: 10,
      left: 20,
      borderRadius: 10,
      padding: 4,
      zIndex: 1,
    },
    titleContainer: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    heading: {
      fontSize: 28,
      fontFamily: 'Montserrat',
      color: '#fff',
      textAlign: 'left',
      marginTop: '60%',
      marginBottom: 10,
    },
    createAccountButton: {
      bottom: -60,
      alignSelf: 'center',
    },
    createAccountText: {
      color: '#00B4FE',
      fontFamily: 'poppins-regular',
      fontSize: 14,
      bottom: 20,
      textAlign: 'center',
    },
    subheading: {
      fontSize: 15,
      fontFamily: 'poppins-regular',
      color: '#fff',
      textAlign: 'left',
    },
    formContainer: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingTop: 30,
      paddingBottom: 40,
      width: '100%',
      height: '88%',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      borderColor: '#00B4FE',
      borderWidth: 1,
      borderRadius: 15,
    },
    invalidInput: {
      borderColor: 'red',
    },
    icon: {
      marginLeft: 10,
    },
    input: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 13,
      fontFamily: 'poppins-regular',
      borderRadius: 15,
    },
    checkboxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    checkbox: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkboxText: {
      marginLeft: 10,
      fontSize: 12,
      fontFamily: 'poppins-regular',
    },
    forgotPasswordText: {
      color: '#00B4FE',
      fontFamily: 'poppins-regular',
      fontSize: 13,
    },
    loginButton: {
      backgroundColor: '#00B4FE',
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontFamily: 'poppins-regular',
      fontSize: 16,
    },
    separatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    separatorLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#ccc',
    },
    separatorText: {
      marginHorizontal: 10,
      color: '#999',
      fontSize: 12,
      fontFamily: 'poppins-regular',
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
      gap: 20,
    },
    socialButton: {
      width: 90,
      height: 50,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#00B4FE',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    fingerprintButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    fingerprintText: {
      marginLeft: 10,
      color: '#00B4FE',
      fontFamily: 'poppins-regular',
    },
  });

export default styles;
