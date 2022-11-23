import { ThemeProvider } from 'styled-components';
import MainRoutes from '../../routes';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';
import ToastContainer from '../Toast/ToastContainer';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <ToastContainer />
      <MainRoutes />
    </ThemeProvider>
  );
}
