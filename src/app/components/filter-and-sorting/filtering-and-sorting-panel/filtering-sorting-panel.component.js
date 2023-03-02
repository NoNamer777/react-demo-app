import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSorting } from '../../../store/pagination.store';

const FilteringSortingPanelComponent = () => {
    const { sorting } = useSelector((state) => state.pagination);
    const dispatch = useDispatch();

    const [sortableAttributes] = useState([
        { value: 'name', label: 'Name' },
        { value: 'size', label: 'Size' },
        { value: 'speed', label: 'Speed' },
    ]);

    const [sortingOnAttribute, setSortingOnAttribute] = useState(sorting.on);

    function handleOnSubmit(submitEvent) {
        submitEvent.preventDefault();

        dispatch(setSorting({ on: sortingOnAttribute }));
    }

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="filtering-sorting-panel">
            <div className="offcanvas-header border-bottom">
                <h5 className="offcanvas-title">Filtering and Sorting</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <form className="offcanvas-body d-flex flex-column gap-3" onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="attribute-sorting-select">
                        Sort by attribute
                    </label>
                    <select
                        className="form-select"
                        id="attribute-sorting-select"
                        defaultValue={sortingOnAttribute}
                        onChange={(e) => setSortingOnAttribute(e.target.value)}
                    >
                        <option value=""></option>
                        {sortableAttributes.map((sortable) => (
                            <option value={sortable.value} key={sortable.value}>
                                {sortable.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-auto">
                    <label htmlFor="trait-filter-select" className="form-label">
                        Filter by Trait:
                    </label>
                    <select className="form-select" id="trait-filter-select">
                        <option value=""></option>
                    </select>
                </div>
                <button type="reset" className="btn btn-danger">
                    Reset
                </button>
                <button type="submit" className="btn btn-success">
                    Apply
                </button>
            </form>
        </div>
    );
};

export default FilteringSortingPanelComponent;
