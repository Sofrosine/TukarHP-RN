import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(254,249,255)',
    // justifyContent: 'center',
  },
  headerComponent: {
    alignItems: 'center',
    padding: wp(2),
    // top: hp(6),
    // position: 'absolute',
  },
  headerText: mb => ({
    fontSize: hp(2),
    textAlign: 'center',
    marginBottom: hp(mb),
  }),
  inputContainer: {
    marginBottom: hp(3),
    alignSelf: 'center',
    alignItems: 'center',
    width: wp(100),
  },
  input: {
    borderWidth: 2,
    borderColor: '#439fe6',
    borderRadius: 8,
    marginHorizontal: wp(2),
    padding: wp(3.5),
    fontSize: hp(2),
    width: wp(90),
  },
  infoText: {
    fontSize: hp(1.8),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  codeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    marginBottom: hp(2),
  },
  codeInput: {
    borderBottomWidth: 2,
    borderColor: '#439fe6',
    width: wp(90),
    padding: wp(4),
    paddingBottom: wp(1),
    marginBottom: hp(4),
    fontSize: hp(2.4),
    textAlign: 'center',
  },
  btnCode: {
    backgroundColor: '#439fe6',
    padding: wp(4),
    borderRadius: 8,
  },
  btnTextCode: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp(2),
  },
});

export default style;
