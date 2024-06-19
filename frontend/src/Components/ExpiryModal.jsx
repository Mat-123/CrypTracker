const ExpiryModal = ({ show, daysLeft, onHide }) => {

    const handleRenew = () => {
        window.location.href = '/buypremium';
    };
    
    return (
        <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content card-bg-color">
                    <div className="modal-header">
                        <h5 className="modal-title">Subscription Expiry Notice</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body">
                        <p>Your premium subscription is expiring in {daysLeft} days.</p>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn manage-btn" onClick={handleRenew}>Renew Now</button>
                        <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpiryModal;

