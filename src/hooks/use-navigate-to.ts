import { useNavigate } from 'react-router-dom';

export function useNavigateTo(path: string): () => void {
    const navigateTo = useNavigate();

    return () => {
        navigateTo(path);
    };
}
