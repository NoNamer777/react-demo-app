import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { queryParamKeys } from '../../../constants/queryParam';
import { SORTABLE_ATTRIBUTES, SORT_ORDERS } from '../../../constants/sorting';
import { setSorting } from '../../../store/pagination.store';

const FilteringSortingPanelComponent = () => {
    const dispatch = useDispatch();

    const [queryParams, setQueryParams] = useSearchParams();

    const [sortableAttributes] = useState(SORTABLE_ATTRIBUTES);
    const [sortOrders] = useState(SORT_ORDERS);

    const [sortingOnAttribute, setSortingOnAttribute] = useState(
        queryParams.has(queryParamKeys.sortingOnAttribute) ? queryParams.get(queryParamKeys.sortingOnAttribute) : ''
    );
    const [sortOrder, setSortOrder] = useState(
        queryParams.has(queryParamKeys.sortOrder) ? queryParams.get(queryParamKeys.sortOrder) : 'asc'
    );

    useEffect(() => {
        if (queryParams.has(queryParamKeys.sortingOnAttribute)) {
            dispatch(setSorting({ on: queryParams.get(queryParamKeys.sortingOnAttribute) }));
            setSortingOnAttribute(queryParams.get(queryParamKeys.sortingOnAttribute));
        }
        if (queryParams.has(queryParamKeys.sortOrder)) {
            dispatch(setSorting({ order: queryParams.get(queryParamKeys.sortOrder) }));
            setSortOrder(queryParams.get(queryParamKeys.sortOrder));
        }
    }, [queryParams]);

    function handleOnSubmit(submitEvent) {
        submitEvent.preventDefault();
        updateQueryParams();
    }

    function handleReset() {
        setQueryParams({ page: 1 });

        dispatch(setSorting({ on: '', order: 'asc' }));
        setSortingOnAttribute('');
        setSortOrder('asc');
    }

    function updateQueryParams() {
        const queryParamsObj = {};

        queryParams.append(queryParamKeys.sortingOnAttribute, sortingOnAttribute);
        queryParams.append(queryParamKeys.sortOrder, sortOrder);
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
                <div>
                    <label className="form-label fw-bold" htmlFor="attribute-sorting-select">
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
                <label className="fw-bold">Sorting order</label>
                {sortOrders.map((order) => (
                    <div className="form-check" key={order.value}>
                        <input
                            className="form-check-input"
                            id={'sort-order-radio-' + order.value}
                            type="radio"
                            name="sort-order"
                            value={order.value}
                            defaultChecked={sortOrder === order.value}
                            onChange={() => setSortOrder(order.value)}
                        />
                        <label className="form-check-label" htmlFor={'sort-order-radio-' + order.value}>
                            {order.label}
                        </label>
                    </div>
                ))}
                <div className="mb-auto mt-3">
                    <label htmlFor="trait-filter-select" className="form-label fw-bold">
                        Filter by Trait:
                    </label>
                    <select className="form-select" id="trait-filter-select">
                        <option value=""></option>
                    </select>
                </div>
                <button type="reset" className="btn btn-danger" onClick={handleReset}>
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
