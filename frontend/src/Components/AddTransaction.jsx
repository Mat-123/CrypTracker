import { useState, useEffect } from 'react';
import axios from 'axios';

const AddTransaction = ({ isOpen, onClose, id_crypto }) => {

    const [formData, setFormData] = useState({
        quantity: '',
        transaction_price: '',
        total_spent: '',
        transaction_date: '',
        wallet: ''
    });

    const [transactionType, setTransactionType] = useState(null);

    useEffect(() => {
        // Quando il componente viene montato, impostiamo la data odierna come valore predefinito
        setFormData((prevFormData) => ({
            ...prevFormData,
            transaction_date: new Date().toISOString().split('T')[0]
        }));
    }, []);

    useEffect(() => {
        // Calcola automaticamente total_spent ogni volta che quantity o transaction_price cambiano
        const { quantity, transaction_price } = formData;
        if (quantity && transaction_price) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                total_spent: quantity * transaction_price
            }));
        }
    }, [formData.quantity, formData.transaction_price]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCreateTransaction = async () => {
        if (transactionType === null) {
            alert('Please select a transaction type.');
            return;
        }
        try {
            const dataToSend = {
                ...formData,
                id_crypto: id_crypto,
                transaction_type: transactionType
            };
            const response = await axios.post('/api/v1/transaction', dataToSend, {
                headers: {
                    'X-CSRF-TOKEN': window.csrfToken 
                }
            });
            console.log('Transaction created successfully:', response.data);
            onClose();
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    };

    return (
        <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Transaction</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                        <p>Select transaction type:</p>
                                <div className="d-flex justify-content-between">
                                    <button type="button" className="btn btn-success" onClick={() => setTransactionType(0)}>Buy</button>
                                    <button type="button" className="btn btn-danger" onClick={() => setTransactionType(1)}>Sell</button>
                                </div>

                            <div className="mb-3">
                                <label className="form-label">Quantity</label>
                                <input type="number" name="quantity" className="form-control" value={formData.quantity} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Transaction Price</label>
                                <input type="number" name="transaction_price" className="form-control" value={formData.transaction_price} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Total Spent</label>
                                <input type="number" name="total_spent" className="form-control" value={formData.total_spent} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Transaction Date</label>
                                <input type="date" name="transaction_date" className="form-control" value={formData.transaction_date} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Wallet</label>
                                <input type="text" name="wallet" className="form-control" value={formData.wallet} onChange={handleChange} />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handleCreateTransaction}>Create Transaction</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTransaction;
