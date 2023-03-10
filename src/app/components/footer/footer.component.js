import { Link } from 'react-router-dom';

/** A component, located at the bottom of the application, showing copyrights symbol and easy link back to the root route */
const FooterComponent = () => {
    return (
        <footer className="flex-grow-0 flex-shrink-0 d-flex flex-wrap justify-content-between align-items-center py-3 border-top bg-body-tertiary">
            <div className="col-md-4 d-flex align-items-center">
                <Link to={process.env.PUBLIC_URL} className="mb-3 mx-2 mb-md-0 text-muted text-decoration-none lh-1">
                    <img src="assets/images/logo.png" alt="logo" className="logo" />
                </Link>
                <span className="text-muted">© 2023 DnD Mapp</span>
            </div>
        </footer>
    );
};

export default FooterComponent;
