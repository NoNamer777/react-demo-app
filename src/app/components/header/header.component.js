import { Link, NavLink } from 'react-router-dom';
import PaginationComponent from '../pagination/pagination.component';

const HeaderComponent = () => {
    return (
        <header className="flex-grow-0 flex-shrink-0">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src="assets/images/logo.png" alt="logo" className="logo" />
                        DnD Mapp - Races
                    </Link>
                    <button
                        type="button"
                        className="navbar-toggler"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar-supported-content"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-supported-content">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/overview" className="nav-link">
                                    Overview
                                </NavLink>
                            </li>
                        </ul>
                        <PaginationComponent />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
