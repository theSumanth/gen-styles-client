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

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="auth" element={<Auth />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
  return (
    <>
      {/* <div>
        <Toaster position="top-center"></Toaster>
      </div> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
