import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(254,249,255)',
  },
  image: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    marginTop: 24,
  },
  choiceContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  choiceText: {
    fontSize: hp(2.2),
    fontWeight: 'bold',
    marginBottom: hp(6),
    alignSelf: 'center',
  },
  choiceBtnContainer: {
    backgroundColor: '#439fe6',
    marginBottom: hp(2),
    padding: wp(5),
    width: wp(95),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceBtnText: {
    fontWeight: 'bold',
    fontSize: hp(1.8),
    color: 'white',
  },
});

export default style;
