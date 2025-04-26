import { useEffect } from 'react';
import Favicon from './components/FavIcon'; // Your favicon component
import hsm from './assets/hsm.svg'; // Your favicon image
import { setFavicon } from './services/favicon.service'; // Your service to set the favicon
import AppRoutes from './routes'; // Import the AppRoutes to include routing
import { AuthProvider } from './context/AuthContext'; // Provide Auth context

const App = () => {
  useEffect(() => {
    setFavicon(hsm); // Set favicon when the app loads
  }, []);

  return (
    <AuthProvider> {/* Wrap the whole app with AuthProvider to provide authentication context */}
      <Favicon url={hsm} /> {/* Set the favicon */}
      <AppRoutes /> {/* Render your routes */}
    </AuthProvider>
  );
};

export default App;
// import { useEffect } from 'react';
// import Favicon from './components/FavIcon';
// import hsm from './assets/hsm.svg';
// import { setFavicon } from './services/favicon.service';
// import { RouterProvider } from 'react-router-dom'; // Import RouterProvider directly
// import router from './routes'; // Import the router directly
// import { AuthProvider } from './context/AuthContext';

// const App = () => {
//   useEffect(() => {
//     setFavicon(hsm); // Set favicon when the app loads
//   }, []);

//   return (
//     <AuthProvider>
//       <Favicon url={hsm} />
//       <RouterProvider router={router} /> {/* Directly use RouterProvider */}
//     </AuthProvider>
//   );
// };

// export default App;
