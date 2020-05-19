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
  headerContainer: {
    //   borderWidth: 1,
    padding: hp(4),
    alignItems: 'center',
  },
  headerText: (color, fontWeight) => {
    return {
      color: color,
      fontWeight: fontWeight,
      fontSize: hp(2.2),
    };
  },
  infoViewContainer: {},
  infoContainer: {
    paddingHorizontal: wp(2),
  },
  emptyData: {
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    color: 'red',
    fontSize: hp(2)
  },
  gradeContainer: {
    backgroundColor: '#439fe6',
    padding: wp(4),
    alignItems: 'center',
  },
  gradeText: {
    fontSize: hp(2.4),
    fontWeight: 'bold',
    color: 'white',
  },
  gradeInfoContainer: {
    padding: wp(2),
  },
  gradeInfoText: {
    fontSize: hp(1.8),
    marginBottom: hp(0.8),
  },
  footerContainer: {
    padding: wp(5),
    // bottom: hp(4),
    paddingHorizontal: wp(2),
    width: wp(100),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems:'center',
    backgroundColor: 'rgb(254,249,255)',
  },
  btnContainer: {
    backgroundColor: '#439fe6',
    width: wp(90),
    padding: wp(4.5),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1)
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: hp(1.8),
    color: 'white',
  },
});

export default style;
