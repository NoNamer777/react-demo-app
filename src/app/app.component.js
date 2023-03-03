import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CenterComponent from './components/center/center.component';
import FooterComponent from './components/footer/footer.component';
import HeaderComponent from './components/header/header.component';

const AppComponent = () => {
    const location = useLocation();

    const routeTitleMap = {
        '/': '',
        '/overview': ': Overview',
    };
    const titlePrefix = 'DnD Mapp - Races';

    useEffect(() => {
        const pageTitle = routeTitleMap[location.pathname];
        document.title = titlePrefix + (!pageTitle ? '' : pageTitle);
    }, [location.pathname]);

    return (
        <>
            <HeaderComponent />
            <CenterComponent />
            <FooterComponent />
        </>
    );
};

export default AppComponent;
