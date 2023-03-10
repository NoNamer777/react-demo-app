import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilteringSortingPanelComponent from '../../components/filter-and-sorting/filtering-and-sorting-panel/filtering-sorting-panel.component';
import RaceCardComponent from '../../components/race-card/race-card.component';
import { fetchPagedRaceData, fetchRaceData } from '../../store';

/** Contains a visual representation of the data */
const OverviewPage = () => {
    // Select different values from the store to determine when to show what as the component's content
    const { active: races, isLoading, isInitialized } = useSelector((state) => state.races);
    const { page: currentPage, pageSize, sorting, filters } = useSelector((state) => state.pagination);

    const dispatch = useDispatch();

    // Start the data initialization process when the component is created
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(fetchRaceData(signal));

        return () => {
            controller.abort();
        };
    }, []);

    // Whenever isInitialized, currentPage, or pageSize changes, fetch the races to show in the overview
    useEffect(() => {
        if (!isInitialized) return;
        dispatch(fetchPagedRaceData({ page: currentPage, pageSize, sorting, filters }));
    }, [isInitialized, currentPage, pageSize, sorting]);

    return (
        <section>
            <div className="px-3">
                <h2>Races</h2>
                <p>
                    Below here is an overview of some of the playable Races that you can choose for your player
                    character.
                </p>
            </div>
            <hr className="flex-grow-0 flex-shrink-0" />
            <div className="flex-grow-1 flex-shrink-1 d-flex flex-wrap justify-content-center align-items-center gap-3">
                {/* Create a race-card-component for every entry in the data */}
                {!isLoading &&
                    races.length > 0 &&
                    races.map((race) => <RaceCardComponent race={race} key={race.name} />)}

                {/* Show a 'no data received' message when there is no data to show */}
                {!isLoading && isInitialized && races.length === 0 && (
                    <div className="me-auto align-self-start">No Races to show...</div>
                )}

                {/* Show a spinner when the data is not yet initialized or is loading */}
                {(isLoading || !isInitialized) && <div className="spinner-border"></div>}
            </div>
            <FilteringSortingPanelComponent />
        </section>
    );
};

export default OverviewPage;
