import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { goToPage, setTotalPages } from '../../../store/pagination.store';

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
        return '/overview?page=' + pageNumber;
    }

    function renderPageLabel(pageNumber) {
        if (pageNumber === 1) {
            return 'First';
        }
        if (pageNumber === maxPages) {
            return 'Last';
        }
        return `${pageNumber}`;
    }

    /** Make an integer range up to the total number of pages */
    function pageLinks() {
        // Make an array with all the page numbers
        let pageLinks = [...Array(maxPages).keys()].map((i) => ({
            number: i + 1,
            label: renderPageLabel(i + 1),
        }));
        const indexActiveLink = pageLinks.indexOf(pageLinks.find((page) => page.number === currentPage));

        // Determine a more scoped array of page numbers, based on the currently active page
        let start = indexActiveLink - 1 < 0 ? 0 : indexActiveLink - 1;
        let end = indexActiveLink + 2 > pageLinks.length - 1 ? pageLinks.length - 1 : indexActiveLink + 2;

        // Make sure there's always at least 3 different pages available to go to
        if (end >= pageLinks.length - 1) {
            start = end - 3;
        }
        if (start < 1) {
            end = start + 4;
        }
        pageLinks = pageLinks.slice(start, end);

        // Always add the first and last pages for easy access
        if (!pageLinks.find((page) => page.number === 1)) {
            pageLinks.unshift({ number: 1, label: 'First' });
        }
        if (!pageLinks.find((page) => page.number === maxPages)) {
            pageLinks.push({ number: maxPages, label: 'Last' });
        }
        return pageLinks;
    }

    return (
        <ul className="pagination mb-0">
            {/* Disable the previous page link when on the first page */}
            <li className={'page-item ' + (currentPage === 1 ? 'disabled' : '')}>
                <Link to={buildRoute(currentPage === 1 ? 1 : currentPage - 1)} className="page-link">
                    Previous
                </Link>
            </li>
            {pageLinks().map((page, index) => (
                // Render a list item element for every integer in the integer rage
                <li className={'page-item ' + (page.number === currentPage ? 'active' : '')} key={index}>
                    <Link to={buildRoute(page.number)} className="page-link">
                        {page.label}
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
