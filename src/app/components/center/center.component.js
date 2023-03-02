import { Outlet } from 'react-router-dom';
import FilterButtonComponent from '../filter-and-sorting/filter-button/filter-button.component';
import PaginationComponent from '../pagination/pagination.component';
import './center.component.scss';

const CenterComponent = () => {
    return (
        <main className="flex-grow-1 flex-shrink-1 bg-body text-body">
            <article className="container py-2 h-100">
                <Outlet />
            </article>
            <div className="d-flex justify-content-center align-items-center d-lg-none py-2 sticky-bottom bg-body-tertiary border-top">
                <PaginationComponent />
                <div className="position-fixed filter-btn-container">
                    <FilterButtonComponent />
                </div>
            </div>
        </main>
    );
};

export default CenterComponent;
