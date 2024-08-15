import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00B4FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  userName: {
    color: '#000',
    fontSize: 14,
    marginLeft: 15,
    fontFamily: 'Montserrat',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(0, 180, 254, 0.2)',
    borderRadius: 14,
    paddingHorizontal: 42,
    fontStyle: 'italic',
    marginRight: 10,
    height: 35,
  },
  searchIcon: {
    position: 'absolute',
    left: 30,
    top: 6,
  },
  appointmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  upcomingText: {
    color: '#777',
    fontSize: 10,
    fontFamily: 'Montserrat',
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#777',
    fontSize: 10,
    fontFamily: 'poppins-regular',
    marginRight: 5,
  },
  seeAllIcon: {
    marginLeft: 5,
  },
  content: {
    // paddingHorizontal: 10,
  },
  scrollViewContent: {
    // paddingBottom: 80, // Ensure there's enough space at the bottom of the scrollable content
  },
  bottomTabBar: {
    position: 'fixed',
    left: 0,
    width: 30,
    right: 0,
  },
});

export default styles;
