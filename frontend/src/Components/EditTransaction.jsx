const EditTransaction = ({ isOpen, onClose, transaction }) => {
    if (!isOpen || !transaction) return null;
  
    return (
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Transaction</h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input type="number" className="form-control" id="quantity" defaultValue={transaction.quantity} />
                </div>
                <div className="form-group">
                  <label htmlFor="transactionPrice">Transaction Price</label>
                  <input type="number" className="form-control" id="transactionPrice" defaultValue={transaction.transaction_price} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditTransaction;