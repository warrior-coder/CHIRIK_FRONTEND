import { useNavigate } from 'react-router-dom';

export function useNavigateToAuth() {
    const navigate = useNavigate();

    return () => {
        navigate('/auth');
    };
}
