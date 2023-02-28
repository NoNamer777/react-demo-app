import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTotalPages } from '../../../store/pagination.store';

const PaginationComponent = () => {
    const { data } = useSelector((state) => state.races);
    const { page: currentPage, totalPages: maxPages } = useSelector((state) => state.pagination);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTotalPages(data.length));
    }, [data, dispatch]);

    return (
        <ul className="pagination mb-0">
            {/* Disable the previous page link when on the first page */}
            <li className={'page-item ' + (currentPage === 1 ? 'disabled' : '')}>
                <Link className="page-link">Previous</Link>
            </li>
            {/* Make an integer range up to the total number of pages */}
            {[...Array(maxPages).keys()]
                // Shift the integer rage to start the range at 1
                .map((i) => i + 1)
                .map((pageNumber) => (
                    // Render a list item element for every integer in the integer rage
                    <li className={'page-item ' + (pageNumber === currentPage ? 'active' : '')} key={pageNumber}>
                        <Link className="page-link">{pageNumber}</Link>
                    </li>
                ))}
            {/* Disable the next page link when on the last page */}
            <li className={'page-item ' + (currentPage === maxPages ? 'disabled' : '')}>
                <Link className="page-link">Next</Link>
            </li>
        </ul>
    );
};

export default PaginationComponent;
