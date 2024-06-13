import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PremiumRoutes = () => {
    const user = useSelector((state) => state.user);

    return (user.role === 'premium') ? <Outlet /> : <Navigate to="/buypremium" />;
};

export default PremiumRoutes;