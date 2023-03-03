import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { queryParamKeys } from '../../../constants/queryParam';
import {
    DEFAULT_SORTING_ON_ATTRIBUTE,
    DEFAULT_SORT_ORDER,
    SORTABLE_ATTRIBUTES,
    SORT_ORDERS,
} from '../../../constants/sorting';
import { setSorting } from '../../../store/pagination.store';

const FilteringSortingPanelComponent = () => {
    const dispatch = useDispatch();

    const [queryParams, setQueryParams] = useSearchParams();

    const [sortableAttributes] = useState(SORTABLE_ATTRIBUTES);
    const [sortOrders] = useState(SORT_ORDERS);

    const [sortingOnAttribute, setSortingOnAttribute] = useState(
        getInitialValue(queryParamKeys.sortingOnAttribute, DEFAULT_SORTING_ON_ATTRIBUTE)
    );
    const [sortOrder, setSortOrder] = useState(getInitialValue(queryParamKeys.sortOrder, DEFAULT_SORT_ORDER));

    const [hasChanged, setChanged] = useState(false);
    const [formIsDefault, setFormIsDefault] = useState(false);
    const [hasInitialized, setInitialized] = useState(false);

    useEffect(() => {
        if (queryParams.has(queryParamKeys.sortingOnAttribute)) {
            dispatch(setSorting({ on: queryParams.get(queryParamKeys.sortingOnAttribute) }));
            setSortingOnAttribute(queryParams.get(queryParamKeys.sortingOnAttribute));
        }
        if (queryParams.has(queryParamKeys.sortOrder)) {
            dispatch(setSorting({ order: queryParams.get(queryParamKeys.sortOrder) }));
            setSortOrder(queryParams.get(queryParamKeys.sortOrder));
        }
        if (!hasInitialized) {
            setInitialized(true);
        }
        checkFormIsDefault();
    }, [queryParams]);

    useEffect(() => {
        if (!hasInitialized) return;

        checkFormIsChanged();
        checkFormIsDefault();
    }, [sortOrder, sortingOnAttribute]);

    function handleOnSubmit(submitEvent) {
        submitEvent.preventDefault();
        updateQueryParams();

        setChanged(false);
    }

    function checkFormIsDefault() {
        const isFormDefault = sortOrder === DEFAULT_SORT_ORDER && sortingOnAttribute === DEFAULT_SORTING_ON_ATTRIBUTE;

        if ((isFormDefault && !formIsDefault) || (!isFormDefault && formIsDefault)) {
            setFormIsDefault(!formIsDefault);
        }
    }

    function checkFormIsChanged() {
        const initialSortingOnAttribute = getInitialValue(
            queryParamKeys.sortingOnAttribute,
            DEFAULT_SORTING_ON_ATTRIBUTE
        );
        const initialSortOrder = getInitialValue(queryParamKeys.sortOrder, DEFAULT_SORT_ORDER);

        const changeDetected = initialSortingOnAttribute !== sortingOnAttribute || initialSortOrder !== sortOrder;

        if ((changeDetected && !hasChanged) || (!changeDetected && hasChanged)) {
            setChanged(!hasChanged);
        }
    }

    function handleReset() {
        setQueryParams({ page: 1 });

        dispatch(setSorting({ on: DEFAULT_SORTING_ON_ATTRIBUTE, order: DEFAULT_SORT_ORDER }));
        setSortingOnAttribute(DEFAULT_SORTING_ON_ATTRIBUTE);
        setSortOrder(DEFAULT_SORT_ORDER);
    }

    function updateQueryParams() {
        const queryParamsObj = {};

        queryParams.append(queryParamKeys.sortingOnAttribute, sortingOnAttribute);
        queryParams.append(queryParamKeys.sortOrder, sortOrder);
        queryParams.forEach((value, param) => (queryParamsObj[param] = value));

        setQueryParams(queryParamsObj);
    }

    function getInitialValue(param, fallback) {
        if (queryParams.has(param)) {
            return queryParams.get(param);
        }
        return fallback;
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
                <button
                    type="reset"
                    className="btn btn-danger"
                    disabled={!hasChanged && formIsDefault}
                    onClick={handleReset}
                >
                    Reset
                </button>
                <button type="submit" className="btn btn-success" data-bs-dismiss="offcanvas" disabled={!hasChanged}>
                    Apply
                </button>
            </form>
        </div>
    );
};

export default FilteringSortingPanelComponent;
