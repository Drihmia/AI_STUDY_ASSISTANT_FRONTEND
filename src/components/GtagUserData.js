
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';

const GtagUserData = () => {
    const { user } = useUser();

    useEffect(() => {
        if (user && window.gtag) {
            window.gtag('set', 'user_data', {
                "email": user.primaryEmailAddress?.emailAddress,
                "address": {
                    "first_name": user.firstName,
                    "last_name": user.lastName,
                }
            });
        }
    }, [user]);

    return null;
};

export default GtagUserData;
