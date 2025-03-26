// import Favicon from "./components/FavIcon";
import { useEffect } from "react";
import hsm from "../src/assets/hsm.svg"
import AppRoutes from "./routes";
import { setFavicon } from "./services/favicon.service";

const App = () => {
  useEffect(() => {
    setFavicon(hsm);
  }, []);
  return (
    <>
     {/* <Favicon url={hsm} /> */}
     <AppRoutes/>
    </>
   
  );
};

export default App;