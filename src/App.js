import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Allroutes } from "./Routes";
import { GlobalProvider } from "./context/GlobalState";
import NotFound from "./pages/notFound";

const App = () => {
  return (
    <GlobalProvider>
    <BrowserRouter>
      <Routes>
        {Allroutes.map((route) => (
          <Route
          key={route.path}
            path={route.path}
            element={
              <route.layout>
               
                <route.component/>
                
              </route.layout>
           }
          />
        ))}
        {/* <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </GlobalProvider>
  );
};

export default App