import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTotalPages } from '../../../store/pagination.store';

const PaginationComponent = () => {
    const { active: data } = useSelector((state) => state.races);
    const { page: currentPage, totalPages: maxPages } = useSelector((state) => state.pagination);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTotalPages(data.length));
    }, [data, dispatch]);

    return (
        <ul className="pagination mb-0">
            <li className={'page-item ' + (currentPage === 1 ? 'disabled' : '')}>
                <Link className="page-link">Previous</Link>
            </li>
            {[...Array(maxPages).keys()]
                .map((i) => i + 1)
                .map((pageNumber) => (
                    <li className={'page-item ' + (pageNumber === currentPage ? 'active' : '')}>
                        <Link className="page-link">{pageNumber}</Link>
                    </li>
                ))}
            <li className={'page-item ' + (currentPage === maxPages ? 'disabled' : '')}>
                <Link className="page-link">Next</Link>
            </li>
        </ul>
    );
};

export default PaginationComponent;
