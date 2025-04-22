import { useEffect } from "react";

const GoogleTag = () => {
    useEffect(() => {
        const tagId = process.env.REACT_APP_GTAG_ID;
        if (!tagId) {
            console.warn("Google Tag ID is missing! Check your .env file.");
            return;
        }

        try {
            // Load Google Tag Manager Script
            const script = document.createElement("script");
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
            document.head.appendChild(script);

            // Initialize GTM
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                window.dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", tagId);
        } catch (error) {
            console.error("Google Tag Manager blocked by browser/ad blocker.");
        }

    }, []);

    return null; // This component doesn't render anything
};

export default GoogleTag;
