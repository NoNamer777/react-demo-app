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
        document.title = titlePrefix + routeTitleMap[location.pathname];
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
