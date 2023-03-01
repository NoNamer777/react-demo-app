const FilteringPanelComponent = () => {
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
                        {/* TODO - Connect to the form model */}
                        <select className="form-select">
                            {/* TODO - Add 'null' option */}
                            {/*<template v-for="sortable of SORTABLE_ATTRIBUTES" :key="sortable.value">*/}
                            {/*    <option :value="sortable.value">{{ sortable.label }}</option>*/}
                            {/*</template>*/}
                        </select>
                        {/*<template v-for="order of SORTING_ORDERS" :key="order.value">*/}
                        {/*    <div class="form-check mt-2">*/}
                        {/*        <input type="radio" class="form-check-input" v-model="form.sortingOrder" :value="order.value" />*/}
                        {/*        <label class="form-check-label">{{ order.label }}</label>*/}
                        {/*    </div>*/}
                        {/*</template>*/}
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
                    {/* TODO - Disable when there are no changes made since the panel has opened or if there is no filter or sorting applied */}
                    {/* TODO - Add click handler */}
                    <button type="reset" className="btn btn-danger">
                        Reset
                    </button>
                    {/* TODO - Disable when there are no changes made since the panel has opened */}
                    <button type="submit" className="btn btn-success" data-bs-dismiss="offcanvas">
                        Apply
                    </button>
                </form>
            </section>
        </aside>
    );
};

export default FilteringPanelComponent;
