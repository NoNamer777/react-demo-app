import './app.component.scss';
import CenterComponent from './components/center/center.component';
import FooterComponent from './components/footer/footer.component';
import HeaderComponent from './components/header/header.component';

function AppComponent() {
    return (
        <>
            <HeaderComponent />
            <CenterComponent />
            <FooterComponent />
        </>
    );
}

export default AppComponent;
