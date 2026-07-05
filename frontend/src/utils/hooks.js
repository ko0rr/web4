import { useEffect, useState } from "react";

export const useErrorVisibility = (error) => {
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (error) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return showError;
};