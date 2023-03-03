const RaceDetailsDialogComponent = ({ race, id }) => {
    return (
        <div className="modal fade" id={id} tabIndex="-1">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg modal-fullscreen-md-down text-bg-dark">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">{race.name}</h1>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex justify-content-between">
                            <img
                                src={race.imgSrc}
                                alt={race.name + ' image'}
                                className="race-image flex-grow-0 flex-shrink-0 "
                            />
                            <div className="flex-shrink-1 flex-grow-1">
                                <p className="d-flex justify-content-between">
                                    <span className="fw-bold">Size:</span>
                                    <span>{race.size}</span>
                                </p>
                                <p className="d-flex justify-content-between">
                                    <span className="fw-bold">speed:</span>
                                    <span>{race.speed}</span>
                                </p>
                            </div>
                        </div>
                        <hr />
                        <h5>Traits</h5>
                        {race.traits.length === 0 && <p>This Race has no Traits...</p>}
                        {race.traits.length > 0 &&
                            race.traits.map((trait) => (
                                <div key={trait.name}>
                                    <p className="fw-bold mb-0">{trait.name}</p>
                                    <p>{trait.description}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RaceDetailsDialogComponent;
