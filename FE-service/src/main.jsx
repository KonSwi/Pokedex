import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/subpages/Home/HomePage.jsx";
import Favourites from "./components/subpages/Favourites/Favourites.jsx";
import Arena from "./components/subpages/Arena/Arena.jsx";
import Login from "./components/subpages/Login/Login.jsx";
import Register from "./components/subpages/Register/Register.jsx";
import Ranking from "./components/subpages/Ranking/Ranking.jsx";
import Edition from "./components/subpages/Edition/Edition.jsx";
import PokemonDetails from "./components/subpages/PokemonDetails/PokemonDetails.jsx";
import UserRoute from "./context/UserRoute.jsx";
import GuestRoute from "./context/GuestRoute.jsx";
import CreatePokemon from "./components/subpages/Edition/CreatePokemon.jsx";
import EditPokemon from "./components/subpages/Edition/EditPokemon.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "pokemon/:id",
        element: <PokemonDetails />,
      },
      {
        path: "login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: "favourites",
        element: (
          <UserRoute>
            <Favourites />
          </UserRoute>
        ),
      },
      {
        path: "arena",
        element: (
          <UserRoute>
            <Arena />
          </UserRoute>
        ),
      },
      {
        path: "ranking",
        element: (
          <UserRoute>
            <Ranking />
          </UserRoute>
        ),
      },
      {
        path: "edition",
        element: (
          <UserRoute>
            <Edition />
          </UserRoute>
        ),
      },
      {
        path: "edition/create",
        element: (
          <UserRoute>
            <CreatePokemon />
          </UserRoute>
        ),
      },
      {
        path: "edition/edit/:id",
        element: (
          <UserRoute>
            <EditPokemon />
          </UserRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("content")).render(
  <RouterProvider router={router} />
);
