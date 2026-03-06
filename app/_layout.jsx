import AppContent from '@/components/root.layout'; // We'll create this next
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { store } from '@/store/store';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import "./global.css";

export default function RootLayout() {
  
  
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <StatusBar backgroundColor="white" barStyle='dark-content'></StatusBar>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}