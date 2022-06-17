import {StyleSheet} from 'react-native'

const newCardStyles = StyleSheet.create({
  card: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  img: {
    marginTop: -5,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  font: {
    fontSize: 16,
  },
});
export default newCardStyles;
