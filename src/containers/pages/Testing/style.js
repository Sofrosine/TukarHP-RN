import {StyleSheet, Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const {width} = Dimensions.get('screen');
const ITEM_SIZE = width / 8;

const style = StyleSheet.create({
  itemContainer: {
    width: ITEM_SIZE,
    aspectRatio: 1,
    padding: 2.5,
  },
  item: {
    flex: 1,
    backgroundColor: '#d9184b',
  },
  itemTouch: {
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(254,249,255)',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(3),
  },
  backContainer: {
    position: 'absolute',
    height: hp(2.5),
    width: wp(30),
    left: wp(3),
  },
  backIcon: {
    height: hp(2.5),
    width: wp(10),
  },
  logoIcon: {
    height: 60,
    width: 60,
  },
  infoPhoneContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: hp(2),
    justifyContent: 'center',
  },
  phoneImage: {
    height: hp(13),
    width: wp(16),
    marginRight: wp(5),
  },
  infoPhoneTextContainer: {
    marginLeft: wp(2),
    alignSelf: 'center',
  },
  infoPhoneText1: mb => ({
    fontSize: hp(2.4),
    marginBottom: hp(mb),
  }),
  infoPhoneText2: {
    fontSize: hp(2.4),
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#f2f2f2',
    paddingVertical: hp(2),
  },
  infoDataContainer: {
    backgroundColor: 'rgb(254,249,255)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
  },
  infoDataImageContainer: {
    // borderWidth: 1,
    marginRight: wp(4),
  },
  infoDataImage: {
    height: 40,
    width: 40,
  },
  infoDataTextContainer: {
    //   borderWidth: 1
  },
  infoDataText1: {
    fontSize: hp(2.8),
    fontWeight: 'bold',
    marginBottom: hp(0.5),
  },
  infoDataText2: {
    fontSize: hp(2),
    // fontWeight: 'bold'
    color: 'gray',
  },
  btnContainer: {
    backgroundColor: '#f2f2f2',
    // borderWidth: 1,
    paddingVertical: hp(2),
  },
  btn: {
    backgroundColor: '#439fe6',
    padding: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(2),
    borderRadius: 14,
  },
  btnText: {
    color: 'white',
    fontSize: hp(2.2),
    fontWeight: 'bold',
  },
  loadingIcon: {
    position: 'absolute',
    right: wp(5),
    fontSize: hp(1.8),
    color: 'gray',
  },
  failedBtnContainer: {
    position: 'absolute',
    right: wp(5),
    backgroundColor: '#439fe6',
    padding: wp(4),
    paddingHorizontal: wp(6),
    borderRadius: 12,
  },
  failedBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp(2),
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingTop: hp(2),
    borderRadius: 8,
  },
  modalText: {
    textAlign: 'center',
    color: '#439fe6',
    fontSize: hp(2),
    marginBottom: hp(2),
  },
  btnModalContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#439fe6',
    justifyContent: 'space-evenly',
  },
  btnModal: (left, right) => ({
    alignItems: 'center',
    borderRightWidth: right,
    borderLeftWidth: left,
    borderRightColor: '#439fe6',
    borderLeftColor: '#439fe6',
    width: wp(45),
    padding: wp(4),
  }),
  btnModalText: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
  },
  modalTouchScreenTop: {
    flex: 1,
    paddingVertical: hp(8),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  modalTouchScreenLeft: {
    flex: 1,
    paddingVertical: hp(8),
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    position: 'absolute',
  },
  modalTouchScreenRight: {
    flex: 1,
    paddingVertical: hp(8),
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  modalTouchScreenBottom: {
    flex: 1,
    paddingVertical: hp(8),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    left: wp(11),
    bottom: hp(-0.5),
  },
  modalTouchScreenCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: hp(8),
  },
  touchScreenBox: {
    width: wp(10),
    height: hp(5),
    marginHorizontal: wp(4),
    marginBottom: hp(10),
    backgroundColor: '#439fe6',
  },
  modalVolumeContainer: {
    backgroundColor: 'white',
    paddingVertical: hp(2),
    borderRadius: 8,
    alignItems: 'center',
  },
  volumeTitle: {
    fontSize: hp(3),
    fontWeight: 'bold',
    marginBottom: hp(1.5),
  },
  volumeText: weight => ({
    fontWeight: weight,
    fontSize: hp(2),
    marginBottom: hp(1),
  }),
  btnVolumeFailed: {
    backgroundColor: '#439fe6',
    padding: hp(2),
    paddingHorizontal: wp(10),
    borderRadius: 12,
  },
  btnVolumeFailedText: {
    color: 'white',
    fontSize: hp(1.8),
    fontWeight: 'bold',
  },
  count: {
    fontSize: 100,
    // position: 'absolute',
    zIndex: 999,
    bottom: hp(40),
    color: 'black',
  },
});

export default style;
