import { Route, Routes, BrowserRouter } from "react-router-dom";

import { Allroutes } from "../Routes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {Allroutes.map((route) => (
          <Route
          key={route.path}
            path={route.path}
            element={
            <route.layout>
                <route.component/>
            </route.layout>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
