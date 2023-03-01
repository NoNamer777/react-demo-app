import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import PaginationComponent from './pagination/pagination.component';

const HeaderComponent = () => {
    return (
        <header className="flex-grow-0 flex-shrink-0 sticky-top">
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
                        <div className="d-flex align-items-center w-100 mt-2 mt-lg-0">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <NavLink to="/overview" className="nav-link">
                                        Overview
                                    </NavLink>
                                </li>
                            </ul>
                            <PaginationComponent />
                            <button
                                type="button"
                                className="btn btn-primary ms-2"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#filter-sorting-panel"
                            >
                                <FontAwesomeIcon icon="filter" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
