import React,{useEffect} from 'react';
import { Routes, Route,useLocation } from 'react-router-dom';
import MyMyungham from './MyMyungham';
import AboutUs from './AboutUs';
import Main from './Main';
import NotFound from './NotFound';

export function KimPage() {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/MyMyungham" element={<MyMyungham />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default KimPage;

