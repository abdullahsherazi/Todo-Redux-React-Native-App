import {StyleSheet} from 'react-native';
import colors from './colors';
import fontSizes from '../constants/fontSizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  headingText: {
    color: colors.blackColor,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: fontSizes.large,
    marginTop: 20,
    marginBottom: 10,
    width: '80%',
  },
  scrollView: {
    marginVertical: 5,
  },
  flatlist: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  appContainerThemeColor: {
    flex: 1,
    backgroundColor: colors.themeColor,
  },
  appContainerWhite: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  appContainerView: {flex: 1},
  error: {
    marginVertical: 5,
    color: colors.redErrorColor,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 10,
    color: colors.redErrorColor,
    fontSize: fontSizes.normal,
    textAlign: 'center',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
});
