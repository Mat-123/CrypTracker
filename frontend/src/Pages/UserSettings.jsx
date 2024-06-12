import { useEffect, useState } from 'react';
import axios from 'axios';

const UserSettings = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        cmc_api_key: '',
    });
    const [loaded, setLoaded] = useState(false);

    const formatDate = (inputDate) => {
        if (!inputDate) return '';
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        axios.get('/api/user')
            .then((res) => {
                setUser(res.data);
                setFormData({
                    cmc_api_key: res.data.cmc_api_key || '',
                });
                setLoaded(true);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const saveChanges = async () => {
        try {
            const response = await axios.put(`/api/v1/profile`, formData, {
                headers: {
                    'X-CSRF-TOKEN': window.csrfToken
                }
            });
            console.log('Transaction updated successfully:', response.data);
        } catch (error) {
            console.error('Errore durante il salvataggio delle modifiche:', error);
        }
    }

    if (!loaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
    <div className="col-2">

    </div>
    <div className="col-8">
        <div className="card mt-5 card-bg-color text-white">
            <div className="card-header">
                User's Settings
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label htmlFor='userType' className='form-label'>User Type:</label>
                    <input className='form-control card-bg-color text-white' id='userType' type='text' value={user.role} disabled readOnly></input>
                </div>
                <div className="mb-3">
                    <label htmlFor='premiumExpiry' className='form-label'>Premium Expiry:</label>
                    <input className='form-control card-bg-color text-white' id='premiumExpiry' type='text' value={user.premium_expiry ? formatDate(user.premium_expiry) : ''} disabled readOnly></input>
                </div>
                <div className="mb-3">
                    <label htmlFor='cmcApiKey' className='form-label'>CMC API KEY:</label>
                    <input className='form-control card-bg-color text-white' id='cmcApiKey' name='cmc_api_key' type='text' value={formData.cmc_api_key} onChange={handleChange}></input>
                </div>
                <button type="button" className="btn btn-success" onClick={saveChanges}>Save changes</button>
            </div>
        </div>
        </div>
    </>
    );
}

export default UserSettings;
