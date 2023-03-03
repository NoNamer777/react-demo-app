const RaceDetailsToggleButtonComponent = ({ id }) => {
    return (
        <button
            type="button"
            className="btn btn-sm btn-outline-primary rounded-pill"
            data-bs-toggle="modal"
            data-bs-target={'#' + id}
        >
            Details
        </button>
    );
};

export default RaceDetailsToggleButtonComponent;
