import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button className='btn btn-primary' onClick={handleClick}>
      Torna alla Homepage
    </button>
  );
};

export default HomeButton;
