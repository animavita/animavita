import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e1f5f3',
      100: '#b5e6df',
      200: '#85d7ca',
      300: '#51c6b4',
      400: '#26b8a4',
      500: '#07aa93',
      600: '#049c86',
      700: '#028b75',
      800: '#017b66',
      900: '#015e4a',
    },
    secondary: {
      50: '#e8f9ec',
      100: '#c8efcf',
      200: '#a4e5b1',
      300: '#7cdb91',
      400: '#5bd277',
      500: '#3cc860',
      600: '#32b856',
      700: '#25a549',
      800: '#1a943f',
      900: '#00732b',
    },
  },
  // TODO: Add new font, Discord new Font
  components: {
    Button: {
      // Can simply pass default props to change default behaviour of components.
      baseStyle: {
        rounded: 'xl',
      },
    },
  },
  config: {
    initialColorMode: 'light',
  },
});

export default theme;
