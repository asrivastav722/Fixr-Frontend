import AppContent from '@/components/root.layout'; // We'll create this next
import { ThemeProvider } from '@/context/ThemeContext';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import "./global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}