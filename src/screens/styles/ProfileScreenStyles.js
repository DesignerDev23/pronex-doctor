import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#00B4FE',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePicture: {
    width: 95,
    height: 95,
    borderRadius: 53,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
  },
  profileInitial: {
    color: '#00B4FE',
    fontSize: 36,
    fontFamily: 'Montserrat',
  },
  userName: {
    color: '#FFF',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },
  whiteContainer: {
    flex: 1,
    borderTopLeftRadius: 30, // Border radius from the top-left corner
    borderTopRightRadius: 30, // Border radius from the top-right corner
    backgroundColor: '#FFFFFF', // White background color
    paddingHorizontal: 20, // Add horizontal padding as needed
    paddingTop: 20, // Add top padding as needed
    minHeight: '80%', // Define the height to 80% of the screen
  },
  infoContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Add bottom padding as needed
    minHeight: '120%',
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  icon: {
    marginRight: 15,
    marginTop: '-215%',
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 180, 254, 0.2)',
    borderRadius: 15,
    marginBottom: 10,
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 14,
  },
  iconContainer: {
    marginRight: 10,
    height: 35,
    width: 35,
    right: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 180, 254, 0.1)',
    borderRadius: 10, // Adjust the border radius as needed
  },
  title: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    fontFamily: 'Montserrat-SemiBold',
  },
  logout: {
    fontSize: 14,
    color: '#C23534',
    flex: 1,
    fontFamily: 'Montserrat-SemiBold',
  },
  groupContainer: {
    marginBottom: 30, // Adjust the margin bottom as needed
  },
  logoutContainer: {
    marginBottom: 50, // Adjust the margin bottom as needed for the log out button
  }
});

export default styles;
