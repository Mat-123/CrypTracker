import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button className='btn manage-btn rounded-3' onClick={handleClick}>
      Back To Homepage
    </button>
  );
};

export default HomeButton;
