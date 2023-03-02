import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { queryParamKeys } from '../../../constants/queryParam';
import { SORTABLE_ATTRIBUTES } from '../../../constants/sorting';
import { setSorting } from '../../../store/pagination.store';

const FilteringSortingPanelComponent = () => {
    const dispatch = useDispatch();

    const [queryParams, setQueryParams] = useSearchParams();

    const [sortableAttributes] = useState(SORTABLE_ATTRIBUTES);

    const [sortingOnAttribute, setSortingOnAttribute] = useState('');

    useEffect(() => {
        if (queryParams.has(queryParamKeys.sortingOnAttribute)) {
            dispatch(setSorting({ on: queryParams.get(queryParamKeys.sortingOnAttribute) }));
            setSortingOnAttribute(queryParams.get(queryParamKeys.sortingOnAttribute));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams]);

    function handleOnSubmit(submitEvent) {
        submitEvent.preventDefault();
        updateQueryParams();
    }

    function updateQueryParams() {
        const queryParamsObj = {};

        queryParams.append(queryParamKeys.sortingOnAttribute, sortingOnAttribute);
        queryParams.forEach((value, param) => (queryParamsObj[param] = value));

        setQueryParams(queryParamsObj);
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
                        value={sortingOnAttribute}
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
                <button type="submit" className="btn btn-success" data-bs-dismiss="offcanvas">
                    Apply
                </button>
            </form>
        </div>
    );
};

export default FilteringSortingPanelComponent;
