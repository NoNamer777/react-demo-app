import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './filter-button.component.scss';

const FilterButtonComponent = () => {
    return (
        <button
            type="button"
            className="btn btn-primary rounded filter-btn"
            data-bs-toggle="offcanvas"
            data-bs-target="#filtering-sorting-panel"
        >
            <FontAwesomeIcon icon="filter" />
        </button>
    );
};

export default FilterButtonComponent;
