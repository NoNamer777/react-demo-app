import { Link, NavLink } from 'react-router-dom';
import FilterButtonComponent from '../filter-and-sorting/filter-button/filter-button.component';
import PaginationComponent from '../pagination/pagination.component';

const HeaderComponent = () => {
    return (
        <header className="flex-grow-0 flex-shrink-0 sticky-top">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to={process.env.PUBLIC_URL} className="navbar-brand">
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
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink to={process.env.PUBLIC_URL + '/overview'} className="nav-link">
                                    Overview
                                </NavLink>
                            </li>
                        </ul>
                        <div className="d-none d-lg-flex gap-2 align-items-center">
                            <PaginationComponent />
                            <FilterButtonComponent />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
