import { BrowserRouter, Routes, Route } from "react-router-dom";
import Booth   from "./pages/Booth";
import Home    from "./pages/Home";
import Result  from "./pages/Result";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import About   from "./pages/About";
import Policy  from "./pages/Policy";
import Photos  from "./pages/Photos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<Home />}     />
        <Route path="/result"  element={<Result />}   />
        <Route path="/booth"   element={<Booth />}    />
        <Route path="/about"   element={<About />}    />
        <Route path="/policy"  element={<Policy />}   />
        <Route path="/photos"  element={<Photos />}   />
        <Route path="/contact" element={<Contact />}  />
        <Route path="*"        element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
