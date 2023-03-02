import { Outlet } from 'react-router-dom';
import PaginationComponent from '../pagination/pagination.component';

const CenterComponent = () => {
    return (
        <main className="flex-grow-1 flex-shrink-1 bg-body text-body">
            <article className="container py-2 h-100">
                <Outlet />
            </article>
            <div className="d-flex justify-content-center align-items-center d-lg-none py-2 sticky-bottom bg-body-tertiary border-top">
                <PaginationComponent />
            </div>
        </main>
    );
};

export default CenterComponent;
