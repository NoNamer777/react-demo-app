const RaceDetailsToggleButtonComponent = ({ name }) => {
    function buildTargetId() {
        return '#' + name + '-details-modal';
    }

    return (
        <button
            type="button"
            className="btn btn-sm btn-outline-primary rounded-pill"
            data-bs-toggle="modal"
            data-bs-target={buildTargetId()}
        >
            Details
        </button>
    );
};

export default RaceDetailsToggleButtonComponent;
