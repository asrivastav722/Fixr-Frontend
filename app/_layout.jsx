import AppContent from '@/components/root.layout'; // We'll create this next
import { ThemeProvider } from '@/context/ThemeContext';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import "./global.css";
import { StatusBar } from 'react-native';

export default function RootLayout() {
  

  return (
    <Provider store={store}>
      <ThemeProvider>
        <StatusBar backgroundColor="white" barStyle='dark-content' ></StatusBar>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}