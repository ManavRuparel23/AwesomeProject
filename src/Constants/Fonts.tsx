import { Platform } from 'react-native';

const Fonts = {
  ...Platform.select({
    ios: {
      LEXEND_DECA_LIGHT: 'LexendDeca-Light',
      LEXEND_DECA_MEDIUM: 'LexendDeca-Medium',
      LEXEND_DECA_REGULAR: 'LexendDeca-Regular',
      LEXEND_DECA_SEMIBOLD: 'LexendDeca-SemiBold',
      POPPINS_MEDIUM: 'Poppins-Medium',
    },
    android: {
      LEXEND_DECA_LIGHT: 'LexendDecaLight',
      LEXEND_DECA_MEDIUM: 'LexendDecaMedium',
      LEXEND_DECA_REGULAR: 'LexendDecaRegular',
      LEXEND_DECA_SEMIBOLD: 'LexendDecaSemiBold',
      POPPINS_MEDIUM: 'PoppinsMedium',
    },
  }),
};

export default Fonts;
