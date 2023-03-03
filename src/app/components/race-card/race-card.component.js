import './race-card.component.scss';

/** A card item which shows more information about a particular Race. */
const RaceCardComponent = ({ race }) => {
    return (
        <div className="card shadow-sm bg-body-tertiary text-body-tertiary">
            <img src={race.imgSrc} alt={race.name + ' image'} className="card-img-top border-bottom race-image" />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{race.name}</h5>
                </div>
                <p className="card-text d-flex justify-content-between">
                    <span>Size:</span>
                    <span>{race.size}</span>
                </p>
                <p className="card-text d-flex justify-content-between">
                    <span>Speed:</span>
                    <span>{race.speed}</span>
                </p>
            </div>
        </div>
    );
};

export default RaceCardComponent;
