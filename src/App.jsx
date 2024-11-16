import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import Auth from "./pages/Auth";
import ProductDetail from "./pages/ProductDetail";
import CartContextProvider from "./store/CartContextProvider";

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path=":productId" element={<ProductDetail />} />
      <Route path="auth" element={<Auth />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
  return (
    <>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </>
  );
}

export default App;
