// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      '::placeholder': {
        color: 'white',
      },
    },
  },
});

export default theme;
