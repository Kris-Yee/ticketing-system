import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  Dashboard,
  Login,
  Profile,
  Settings,
  Task
} from "./pages";
import Layout from "./components/Layout";

const AppRouter = () =>
{
    return(
        <BrowserRouter basename="/tickIT">
            <Routes>
                <Route index element={<Login />} />
                <Route path="dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="profile" element={<Layout><Profile /></Layout>} />
                <Route path="settings" element={<Layout><Settings /></Layout>} />
                <Route path="task" element={<Layout><Task /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;