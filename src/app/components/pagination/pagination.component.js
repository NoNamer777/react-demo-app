import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { goToPage, setTotalPages } from '../../store/pagination.store';

const PaginationComponent = () => {
    const { data } = useSelector((state) => state.races);
    const { page: currentPage, totalPages: maxPages } = useSelector((state) => state.pagination);

    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTotalPages(data.length));
    }, [data, dispatch]);

    useEffect(() => {
        /** Updates the pagination store whenever the query params in the route updates */
        function updatePageFromRoute() {
            if (!searchParams.has('page')) return;

            const pageNumberFromRoute = parseInt(searchParams.get('page'));

            if (pageNumberFromRoute !== currentPage) {
                dispatch(goToPage(pageNumberFromRoute));
            }
        }

        updatePageFromRoute();
    }, [currentPage, dispatch, searchParams]);

    /** Dynamically builds a route */
    function buildRoute(pageNumber) {
        return process.env.PUBLIC_URL + '/overview?page=' + pageNumber;
    }

    return (
        <ul className="pagination mb-0">
            {/* Disable the previous page link when on the first page */}
            <li className={'page-item ' + (currentPage === 1 ? 'disabled' : '')}>
                <Link to={buildRoute(currentPage === 1 ? 1 : currentPage - 1)} className="page-link">
                    Previous
                </Link>
            </li>
            {/* Make an integer range up to the total number of pages */}
            {[...Array(maxPages).keys()]
                // Shift the integer rage to start the range at 1
                .map((i) => i + 1)
                .map((pageNumber) => (
                    // Render a list item element for every integer in the integer rage
                    <li className={'page-item ' + (pageNumber === currentPage ? 'active' : '')} key={pageNumber}>
                        <Link to={buildRoute(pageNumber)} className="page-link">
                            {pageNumber}
                        </Link>
                    </li>
                ))}
            {/* Disable the next page link when on the last page */}
            <li className={'page-item ' + (currentPage === maxPages ? 'disabled' : '')}>
                <Link to={buildRoute(currentPage === maxPages ? maxPages : currentPage + 1)} className="page-link">
                    Next
                </Link>
            </li>
        </ul>
    );
};

export default PaginationComponent;
