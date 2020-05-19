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
  headerText: {
    alignSelf: 'center',
    fontSize: hp(2.2),
    paddingVertical: hp(1.5),
    color: 'gray',
  },
  inputContainer: {
    marginBottom: hp(3),
  },
  input: {
    borderWidth: 2,
    borderColor: '#439fe6',
    borderRadius: 8,
    marginHorizontal: wp(2),
    padding: wp(3.5),
    fontSize: hp(2),
  },
  infoContainer: {
    paddingHorizontal: wp(2),
    marginBottom: hp(2),
  },
  infoTitleContainer: {
    backgroundColor: '#439fe6',
    padding: wp(4.5),
    alignItems: 'center',
    marginBottom: hp(1),
  },
  infoTitle: {
    fontSize: hp(2.2),
    color: 'white',
  },
  infoAddress: {
    fontSize: hp(1.8),
    paddingHorizontal: wp(2),
  },
});

export default style;
