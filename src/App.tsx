import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './App.css';
import { NominationProvider } from './context/NominationContext';
import NominationPage from './pages/NominationPage';
const theme = extendTheme({
  fonts: {
    body: `'Roboto', sans-serif;`,
  },
});
function App() {
  return (
    <ChakraProvider theme={theme}>
      <NominationProvider>
        <NominationPage />
      </NominationProvider>
    </ChakraProvider>
  );
}

export default App;
