import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { FavouritesProvider } from "./context/FavouritesContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { PokemonProvider } from "./context/PokemonContext";
import Navbar from "./components/shared/Navbar/Navbar";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      {" "}
      <ThemeProvider>
        <AuthProvider>
          <FavouritesProvider>
            <PokemonProvider>
              <Navbar />
              <Outlet />
            </PokemonProvider>
          </FavouritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default App;
