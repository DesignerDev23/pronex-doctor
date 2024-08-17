import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#00B4FE',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'left',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleContainer: {
    marginLeft: 10,
    marginBottom: 40
  },
  title: {
    color: '#FFF',
    fontSize: 30,
    marginTop: 20,
    fontFamily: 'Montserrat',
  },
  subheading: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  whiteContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    minHeight: '80%',
  },
  infoContainer: {
    flexGrow: 1,
    paddingBottom: 100,
    minHeight: '120%',
  },
  cardsContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(0, 180, 254, 0.4)',
    borderRadius: 20,
    padding: 10,
    paddingVertical: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  cardDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  consultationType: {
    color: '#00B4FE',
    fontSize: 12,
    fontFamily: 'Montserrat',
    marginBottom: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardName: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Montserrat',
    marginRight: 5,
  },
  verifiedIcon: {
    marginLeft: 5,
  },
  cardTitle: {
    color: '#000',
    fontSize: 10,
    fontFamily: 'Montserrat-SemiBold',
  },
  viewButton: {
    flexDirection: 'row',
    backgroundColor: '#00B4FE',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    // padding: 10,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    marginRight: 5,
  },
});

export default styles;
