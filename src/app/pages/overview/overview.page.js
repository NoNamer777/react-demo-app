import { useState } from 'react';
import RaceCardComponent from '../../components/race-card/race-card.component';

const OverviewPage = () => {
    const [races] = useState([]);

    return (
        <section>
            <div className="px-3">
                <h2>Races</h2>
                <p>
                    Below here is an overview of some of the playable Races that you can choose for you for your player
                    character.
                </p>
            </div>
            <hr className="flex-grow-0 flex-shrink-0" />
            <div className="flex-grow-1 flex-shrink-1 d-flex flex-wrap justify-content-center align-items-center gap-3">
                {races.length === 0 ? (
                    <div className="spinner-border"></div>
                ) : (
                    races.map((race) => <RaceCardComponent race={race} key={race.name} />)
                )}
            </div>
        </section>
    );
};

export default OverviewPage;
