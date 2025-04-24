import { useEffect } from 'react';
import Favicon from './components/FavIcon';
import hsm from './assets/hsm.svg';
import { setFavicon } from './services/favicon.service';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  useEffect(() => {
    setFavicon(hsm);
  }, []);

  return (
    <AuthProvider>
      <Favicon url={hsm} />
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;