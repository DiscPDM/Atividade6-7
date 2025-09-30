import { useWindowDimensions, Platform } from 'react-native';

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const tablet = width >= 768;
  const landscape = width > height;
  const web = Platform.OS === 'web';

  return {
    width,
    height,
    isTablet: tablet,
    isLandscape: landscape,
    isWeb: web,
  };
};
