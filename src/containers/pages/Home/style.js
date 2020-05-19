import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(254,249,255)',
    alignItems: 'center',
  },
  logoImage: {
    height: 80,
    width: 80,
    marginBottom: hp(6),
    marginTop: hp(2),
  },
  deviceNameTitle: {
    fontSize: hp(2),
    color: 'gray',
    marginBottom: hp(1.5),
  },
  deviceNameText: {
    fontSize: hp(3),
    fontWeight: 'bold',
    marginBottom: hp(3),
  },
  phoneLogoImage: {
    height: hp(30),
    width: wp(35),
    marginBottom: hp(5),
  },
  infoText: {
    textAlign: 'center',
    paddingHorizontal: wp(15),
    fontSize: hp(2.2),
  },
  btnStartContainer: {
    backgroundColor: '#439fe6',
    width: wp(95),
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp(5),
    borderRadius: 12,
    position: 'absolute',
    bottom: hp(4),
  },
  btnStartText: {
    fontSize: hp(2.4),
    fontWeight: 'bold',
    color: 'white',
  },
});

export default style;
