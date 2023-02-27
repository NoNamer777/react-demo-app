import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppComponent from './app/app.component';
import OverviewPage from './app/pages/overview/overview.page';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppComponent />}>
                    {/* Render the OverviewPage on the route defined below */}
                    <Route path="overview" element={<OverviewPage />} />
                    {/* Make sure that a User is sent back to the OverviewPage when they navigate to an invalid URL */}
                    <Route path="*" element={<Navigate to="/overview" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
