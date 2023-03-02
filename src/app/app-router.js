import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import AppComponent from './app.component';
import OverviewPage from './pages/overview/overview.page';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={process.env.PUBLIC_URL} element={<AppComponent />}>
            {/* Make sure that a User is sent to the OverViewPage whenever they visit the root route */}
            <Route index element={<Navigate to="overview" />} />
            {/* Render the OverviewPage on the route defined below */}
            <Route path="overview" element={<OverviewPage />} />
            {/* Make sure that a User is sent back to the OverviewPage when they navigate to an invalid URL */}
            <Route path="*" element={<Navigate to={process.env.PUBLIC_URL} />} />
        </Route>
    )
);
