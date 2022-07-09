import './App.css';
import { NominationProvider } from './context/NominationContext';
import NominationPage from './pages/NominationPage';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';
function App() {
  return (
    <div className="nomination-app">
      <ChakraProvider>
        <NominationProvider>
          <NominationPage />
        </NominationProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
