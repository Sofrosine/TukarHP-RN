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
    justifyContent: 'center',
  },
  imageLogo: {
    height: 250,
    width: 250,
    marginHorizontal: 40,
  },
  btnStart: {
    backgroundColor: '#439fe6',
    width: wp(95),
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(2.4),
    borderRadius: 12,
    bottom: hp(3),
    position: 'absolute',
  },
  btnStartText: {
    fontSize: hp(2),
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    // flex: 1,
    backgroundColor: 'white',
    height: hp(40),
    alignItems: 'center',
  },
  imageIcon: {
    width: wp(25),
    height: hp(10),
  },
  modalText: {
    paddingHorizontal: wp(2),
    textAlign: 'center',
    fontSize: hp(2.3),
    marginBottom: hp(0.8),
  },
  btnModalViewContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // borderWidth: 1,
    justifyContent: 'space-between',
  },
  btnModalContainer: colorBG => ({
    width: wp(42),
    backgroundColor: colorBG,
    padding: hp(2.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: wp(1.5),
  }),
  btnModalText: {
    fontSize: hp(2),
    color: 'white',
    fontWeight: 'bold',
  },
});

export default style;
