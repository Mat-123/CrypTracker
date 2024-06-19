import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [stats, setStats] = useState({
        total_users: 0,
        premium_users: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserStats();
    }, []);

    const fetchUserStats = async () => {
        try {
            const response = await axios.get('/api/v1/admin/user-stats');
            setStats(response.data);
        } catch (error) {
            setError('An error occurred while fetching user stats.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="col-8">
            <div className="card card-bg-color text-white mt-5 rounded-4">
                <div className="card-body">
                    <h2>User Statistics</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-danger">{error}</p>
                    ) : (
                        <div>
                            <p>Total Users: {stats.total_users}</p>
                            <p>Premium Users: {stats.premium_users}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
