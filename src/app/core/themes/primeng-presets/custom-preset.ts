import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';

export const bluePreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '#0884ed',
      100: '#0884ed',
      200: '#0884ed',
      300: '#0884ed',
      400: '#0884ed',
      500: '#0884ed',
      600: '#0884ed',
      700: '#0884ed',
      800: '#0884ed',
      900: '#0884ed',
      950: '#0884ed'
    },
    colorScheme: {
      light: {
        formField: {
          hoverBorderColor: '#0884ed' // Direct reference
        }
      }
    }
  }
});