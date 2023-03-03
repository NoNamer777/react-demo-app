import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
    DEFAULT_FILTERING_BY_TRAIT,
    DEFAULT_SORTING_ON_ATTRIBUTE,
    DEFAULT_SORT_ORDER,
    queryParamKeys,
    SORTABLE_ATTRIBUTES,
    SORT_ORDERS,
} from '../../../constants';
import { setFilters, setSorting } from '../../../store';

/** A side panel which allows a User to set the sorting, or add a filter on the data */
const FilteringSortingPanelComponent = () => {
    const dispatch = useDispatch();

    // The currently active query params in the route
    const [queryParams, setQueryParams] = useSearchParams();

    // Inputs for the various input controls
    const [sortableAttributes] = useState(SORTABLE_ATTRIBUTES);
    const [sortOrders] = useState(SORT_ORDERS);
    const { racialTraits: filterableTraits } = useSelector((state) => state.races);

    // The current values of the input controls
    const [sortingOnAttribute, setSortingOnAttribute] = useState(
        getInitialValue(queryParamKeys.sortingOnAttribute, DEFAULT_SORTING_ON_ATTRIBUTE)
    );
    const [sortOrder, setSortOrder] = useState(getInitialValue(queryParamKeys.sortOrder, DEFAULT_SORT_ORDER));
    const [filteringByTrait, setFilteringByTrait] = useState(
        getInitialValue(queryParamKeys.filteringByTrait, DEFAULT_FILTERING_BY_TRAIT)
    );

    const [hasChanged, setChanged] = useState(false);
    const [formIsDefault, setFormIsDefault] = useState(false);
    const [hasInitialized, setInitialized] = useState(false);

    // Whenever the query params are updated, update the store state and the form in the side panel as well
    useEffect(() => {
        updateStoreAndFormFromRoute();
        checkFormIsDefault();

        if (!hasInitialized) {
            setInitialized(true);
        }
    }, [queryParams]);

    // Whenever an input control changes value, check if enabling or disabling buttons is required
    useEffect(() => {
        if (!hasInitialized) return;

        checkFormIsChanged();
        checkFormIsDefault();
    }, [sortOrder, sortingOnAttribute, filteringByTrait]);

    /** Handle updating the store and input controls with values from the query params */
    function updateStoreAndFormFromRoute() {
        if (queryParams.has(queryParamKeys.sortingOnAttribute)) {
            const sortingOnAttributeValue = getInitialValue(
                queryParamKeys.sortingOnAttribute,
                DEFAULT_SORTING_ON_ATTRIBUTE
            );
            dispatch(setSorting({ on: sortingOnAttributeValue }));
            setSortingOnAttribute(sortingOnAttributeValue);
        }
        if (queryParams.has(queryParamKeys.sortOrder)) {
            const sortOrderValue = getInitialValue(queryParamKeys.sortOrder, DEFAULT_SORT_ORDER);
            dispatch(setSorting({ order: sortOrderValue }));
            setSortOrder(sortOrderValue);
        }
        if (queryParams.has(queryParamKeys.filteringByTrait)) {
            const filteringByTraitValue = getInitialValue(queryParamKeys.filteringByTrait, DEFAULT_FILTERING_BY_TRAIT);
            dispatch(setFilters({ trait: filteringByTraitValue }));
            setFilteringByTrait(filteringByTraitValue);
        }
    }

    /** Handle submit events */
    function handleOnSubmit(submitEvent) {
        // Prevent the page from reloading
        submitEvent.preventDefault();
        updateQueryParams();

        setChanged(false);
    }

    /** Check whether the input controls are in the default state or not */
    function checkFormIsDefault() {
        const isFormDefault =
            sortOrder === DEFAULT_SORT_ORDER &&
            sortingOnAttribute === DEFAULT_SORTING_ON_ATTRIBUTE &&
            filteringByTrait === DEFAULT_FILTERING_BY_TRAIT;

        if ((isFormDefault && !formIsDefault) || (!isFormDefault && formIsDefault)) {
            setFormIsDefault(!formIsDefault);
        }
    }

    /** Check whether the form has changed since the last time filters or sorting has been applied */
    function checkFormIsChanged() {
        const initialSortingOnAttribute = getInitialValue(
            queryParamKeys.sortingOnAttribute,
            DEFAULT_SORTING_ON_ATTRIBUTE
        );
        const initialSortOrder = getInitialValue(queryParamKeys.sortOrder, DEFAULT_SORT_ORDER);
        const initialFilteringByTrait = getInitialValue(queryParamKeys.filteringByTrait, DEFAULT_FILTERING_BY_TRAIT);

        const changeDetected =
            initialSortingOnAttribute !== sortingOnAttribute ||
            initialSortOrder !== sortOrder ||
            initialFilteringByTrait !== filteringByTrait;

        if ((changeDetected && !hasChanged) || (!changeDetected && hasChanged)) {
            setChanged(!hasChanged);
        }
    }

    /** Resets the form, store state en query params to the default values */
    function handleReset() {
        setQueryParams({ page: 1 });

        dispatch(setSorting({ on: DEFAULT_SORTING_ON_ATTRIBUTE, order: DEFAULT_SORT_ORDER }));
        dispatch(setFilters({ trait: DEFAULT_FILTERING_BY_TRAIT }));
        setSortingOnAttribute(DEFAULT_SORTING_ON_ATTRIBUTE);
        setSortOrder(DEFAULT_SORT_ORDER);
        setFilteringByTrait(DEFAULT_FILTERING_BY_TRAIT);
    }

    /** Updates the query params with values from the input controls */
    function updateQueryParams() {
        // Go back to the first page
        const queryParamsObj = { page: 1 };

        // Don't store the default sorting and filtering in the query params
        if (sortingOnAttribute !== DEFAULT_SORTING_ON_ATTRIBUTE) {
            queryParams.append(queryParamKeys.sortingOnAttribute, sortingOnAttribute);
        }
        if (filteringByTrait !== DEFAULT_FILTERING_BY_TRAIT) {
            queryParams.append(queryParamKeys.filteringByTrait, filteringByTrait);
        }
        queryParams.append(queryParamKeys.sortOrder, sortOrder);
        queryParams.forEach((value, param) => (queryParamsObj[param] = value));

        setQueryParams(queryParamsObj);
    }

    /** Tries to retrieve a value stored in the query params, otherwise use the provided fallback value */
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
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
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
                    <select
                        className="form-select"
                        id="trait-filter-select"
                        value={filteringByTrait}
                        onChange={(e) => setFilteringByTrait(e.target.value)}
                    >
                        <option value=""></option>
                        {filterableTraits.map((filterable) => (
                            <option value={filterable.value} key={filterable.value}>
                                {filterable.label}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Enable the reset button whenever a change has been made since last applying sorting or filtering
                 * or if the input controls are not in the default state
                 */}
                <button
                    type="reset"
                    className="btn btn-danger"
                    disabled={!hasChanged && formIsDefault}
                    onClick={handleReset}
                >
                    Reset
                </button>
                {/* Enable the submit button whenever a change has been made since last applying sorting or filtering */}
                <button type="submit" className="btn btn-success" data-bs-dismiss="offcanvas" disabled={!hasChanged}>
                    Apply
                </button>
            </form>
        </div>
    );
};

export default FilteringSortingPanelComponent;
