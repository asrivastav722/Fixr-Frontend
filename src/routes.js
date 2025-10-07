// src/routes.js

import CustProfile from "./pages/customer/Profile";
// import BookService from "./pages/customer/BookService";
// import ServiceHistory from "./pages/customer/ServiceHistory";

import TechProfile from "./pages/technician/Profile";
// import Jobs from "./pages/technician/Jobs";
// import Earnings from "./pages/technician/Earnings";

import Signup from "./auth/Signup";
import Login from "./auth/Login";

export const publicRoutes = [
  { path: "/c/signup", element: <Signup role="customer" /> },
  { path: "/c/login", element: <Login role="customer" /> },
  { path: "/t/signup", element: <Signup role="technician" /> },
  { path: "/t/login", element: <Login role="technician" /> },
];

export const customerRoutes = [
  { path: "/c/profile", element: <CustProfile /> },
//   { path: "/book-service", element: <BookService /> },
//   { path: "/service-history", element: <ServiceHistory /> },
];

export const technicianRoutes = [
  { path: "/t/profile", element: <TechProfile /> },
//   { path: "/t/jobs", element: <Jobs /> },
//   { path: "/t/earnings", element: <Earnings /> },
];
