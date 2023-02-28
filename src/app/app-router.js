import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import AppComponent from './app.component';
import OverviewPage from './pages/overview/overview.page';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppComponent />}>
            {/* Render the OverviewPage on the route defined below */}
            <Route path="overview" element={<OverviewPage />} />
            {/* Make sure that a User is sent back to the OverviewPage when they navigate to an invalid URL */}
            <Route path="*" element={<Navigate to="/overview" />} />
        </Route>
    )
);
