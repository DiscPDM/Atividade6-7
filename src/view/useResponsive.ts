import { Dimensions, Platform } from 'react-native';

export const useResponsive = () => {
  const { width, height } = Dimensions.get('window');
  const isTablet = width >= 768;
  const isLandscape = width > height;
  const isWeb = Platform.OS === 'web';

  return {
    width,
    height,
    isTablet,
    isLandscape,
    isWeb,
  };
};
