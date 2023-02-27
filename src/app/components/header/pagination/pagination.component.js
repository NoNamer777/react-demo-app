import { Link } from 'react-router-dom';

const PaginationComponent = () => {
    return (
        <ul className="pagination mb-0">
            <li className="page-item">
                <Link className="page-link">Previous</Link>
            </li>
            <li className="page-item">
                <Link className="page-link">Next</Link>
            </li>
        </ul>
    );
};

export default PaginationComponent;
