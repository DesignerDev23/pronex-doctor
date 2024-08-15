import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingTop: 50,
      paddingBottom: 20,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 180, 254, 0.99)',
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
      marginBottom: 10,
    },
    subheading: {
      fontSize: 15,
      fontFamily: 'poppins-regular',
      color: '#fff',
      textAlign: 'left',
    },
    formContainer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingTop: 30,
      height: '100%',
      paddingBottom: 40,
    },
    eyeIcon: {
      position: 'absolute',
      right: 10,
      transform: [{ translateY: -11 }], // Adjust the translateY value to center the icon vertically
    },  
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      borderColor: '#00B4FE',
      fontFamily: 'Poppins-Regular',
      borderWidth: 1,
      borderRadius: 15,
    },
    icon: {
      marginLeft: 10,
    },
    input: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 13,
      borderRadius: 15,
    },
    termsText: {
      fontSize: 12,
      fontFamily: 'poppins-regular',
      marginBottom: 10,
      textAlign: 'center',
    },
    signupButton: {
      backgroundColor: '#00B4FE',
      padding: 15,
      borderRadius: 10,
      marginTop: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    loginText: {
      fontSize: 13,
      fontFamily: 'poppins-regular',
      marginTop: 10,
      textAlign: 'center',
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 10,
    },
    invalid: {
      borderColor: 'red',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    modalButton: {
      backgroundColor: '#2196F3',
      borderRadius: 10,
      padding: 10,
      elevation: 2,
    },
    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default styles;
