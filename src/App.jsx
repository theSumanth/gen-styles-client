import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import "./App.css";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import Auth from "./pages/Auth";
import CartLayout from "./pages/Cart";
import SearchResults from "./pages/SearchResults";
import ProductDetail from "./pages/ProductDetail";
import UserContextProvider from "./store/UserContextProvider";
import ErrorBoundary from "./pages/Error";
import { queryClient } from "./util/api";

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={
        <ErrorBoundary
          title={"Some Error has occured"}
          message={"Please try again"}
          className={"mt-32"}
        />
      }
    >
      <Route index element={<HomePage />} />
      <Route path="search" element={<SearchResults />} />
      <Route path=":productId" element={<ProductDetail />} />
      <Route path="cart" element={<CartLayout />} />
      <Route path="auth" element={<Auth />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routeDefinitions, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_partialHydration: true,
    v7_normalizeFormMethod: true,
    v7_skipActionErrorRevalidation: true,
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="bottom-right" visibleToasts={3} />
      <UserContextProvider>
        <RouterProvider
          future={{
            v7_startTransition: true,
          }}
          router={router}
        />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
