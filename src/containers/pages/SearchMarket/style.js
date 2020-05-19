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
  cityContainer: {
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    paddingBottom: hp(2),
    alignItems: 'center',
    marginHorizontal: wp(2),
    marginBottom: hp(2),
  },
  cityText: {
    fontSize: hp(2.2),
    fontWeight: 'bold',
    color: '#439fe6',
  },
});

export default style;
