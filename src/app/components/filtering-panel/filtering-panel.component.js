import { useEffect, useState } from 'react';

const FilteringPanelComponent = () => {
    const defaultFormValue = {
        sortingOrder: 'asc',
        sortingOn: '',
    };

    const initialFormValue = {
        sortingOrder: 'asc',
        sortingOn: '',
    };

    const [sortAttributes] = useState([
        { value: 'name', label: 'Name' },
        { value: 'size', label: 'Size' },
        { value: 'speed', label: 'Speed' },
    ]);

    const [sortOrders] = useState([
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
    ]);

    const [sortingOn, setSortingOn] = useState(initialFormValue.sortingOn);
    const [sortingOrder, setSortingOrder] = useState(initialFormValue.sortingOrder);

    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        const currentFormValue = { sortingOrder, sortingOn };
        let changeDetected = false;

        // Determine whether the form has changed from the initial value
        Object.entries(initialFormValue).forEach(([key, value]) => {
            if (changeDetected) return;
            changeDetected = currentFormValue[key] !== value;
        });

        if (changeDetected && !hasChanged) {
            setHasChanged(true);
        } else if (!changeDetected && hasChanged) {
            setHasChanged(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortingOrder, sortingOn]);

    function resetForm() {
        setSortingOn(defaultFormValue.sortingOn);
        setSortingOrder(defaultFormValue.sortingOrder);
    }

    return (
        <aside className="offcanvas offcanvas-end" tabIndex="-1" id="filter-sorting-panel">
            <section className="offcanvas-header">
                <h5 className="offcanvas-title">Filters and Sorting</h5>
                <button type="button" className="btn btn-close" data-bs-dismiss="offcanvas"></button>
            </section>
            <section className="offcanvas-body">
                {/* TODO - Handle form submissions */}
                <form className="h-100 d-flex flex-column gap-2">
                    <div className="mb-3">
                        <label className="form-label">Sorting on</label>
                        <select
                            className="form-select"
                            value={sortingOn}
                            onChange={(event) => setSortingOn(event.target.value)}
                        >
                            <option value=""></option>
                            {sortAttributes.map((sortable) => (
                                <option value={sortable.value} key={sortable.value}>
                                    {sortable.label}
                                </option>
                            ))}
                        </select>
                        {sortOrders.map((order) => (
                            <div className="form-check mt-2" key={order.value}>
                                <label className="form-check-label">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value={order.value}
                                        name="sorting-order"
                                        defaultChecked={sortingOrder === order.value}
                                        onChange={(event) => setSortingOrder(event.target.value)}
                                    />
                                    {order.label}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="mb-auto">
                        <label className="form-label">Filter by Trait</label>
                        {/* TODO - Connect to the form model */}
                        <select className="form-select">
                            {/* TODO - Add 'null' option */}
                            {/*<option :value="null"></option>*/}
                            {/*<template v-for="traitOption in racialTraits" :key="value">*/}
                            {/*    <option :value="traitOption.value">{{ traitOption.label }}</option>*/}
                            {/*</template>*/}
                        </select>
                    </div>
                    <button type="reset" className="btn btn-danger" disabled={!hasChanged} onClick={resetForm}>
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success"
                        data-bs-dismiss="offcanvas"
                        disabled={!hasChanged}
                    >
                        Apply
                    </button>
                </form>
            </section>
        </aside>
    );
};

export default FilteringPanelComponent;
