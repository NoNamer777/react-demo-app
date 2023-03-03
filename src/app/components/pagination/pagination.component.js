import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { goToPage, setTotalPages } from '../../store';

/** Handles showing the different slices of content of the application */
const PaginationComponent = () => {
    const { filtered: data } = useSelector((state) => state.races);
    const { page: currentPage, totalPages: maxPages } = useSelector((state) => state.pagination);

    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();

    // Whenever the filtered content changes, update the total number of pages
    useEffect(() => {
        dispatch(setTotalPages(data.length));
    }, [data]);

    useEffect(() => updatePageFromRoute(), [searchParams]);

    /** Updates the pagination store whenever the query params in the route update */
    function updatePageFromRoute() {
        if (!searchParams.has('page')) return;

        const pageNumberFromRoute = parseInt(searchParams.get('page'));

        if (pageNumberFromRoute !== currentPage) {
            dispatch(goToPage(pageNumberFromRoute));
        }
    }

    /** Dynamically builds a route */
    function buildRoute(pageNumber) {
        let route =
            process.env.PUBLIC_URL +
            '/overview?' +
            searchParams.toString().replace(/page=[(0-9)*]/, 'page=' + pageNumber);

        // Add the page number, if it isn't build into the link yet
        if (!route.match(/page=[(0-9)*]/)) {
            if (!route.endsWith('?')) {
                route += '&';
            }
            route += 'page=' + pageNumber;
        }
        return route;
    }

    /** Show 'First' for the page nr. 1, and 'Last' for the last page. */
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
        if (!pageLinks.find((page) => page.label === 'First')) {
            pageLinks.unshift({ number: 1, label: 'First' });
        }
        if (!pageLinks.find((page) => page.label === 'Last')) {
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
