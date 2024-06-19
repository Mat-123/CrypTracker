import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = () => {
    const user = useSelector((state) => state.user);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (user.role === 'admin') ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;