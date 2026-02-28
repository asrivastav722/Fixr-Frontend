import AppContent from '@/components/root.layout'; // We'll create this next
import { ThemeProvider } from '@/context/ThemeContext';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import "./global.css";
import { StatusBar } from 'react-native';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout() {
  

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <StatusBar backgroundColor="white" barStyle='dark-content' ></StatusBar>
          <AppContent />
      </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}