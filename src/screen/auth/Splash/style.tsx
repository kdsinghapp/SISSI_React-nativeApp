import { StyleSheet, Dimensions } from 'react-native';
import { color } from '../../../constant';
import font from '../../../theme/font';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: width * 0.45,
    height: width * 0.45,
    borderRadius: 20,
  },

  versionContainer: {
    position: 'absolute',
    bottom: height * 0.05,
    width: '100%',
    alignItems: 'center',
  },

  versionText: {
    fontSize: 14,
    color: 'gray',
    opacity: 0.8,
    fontFamily: font.MonolithRegular,
  },
});
