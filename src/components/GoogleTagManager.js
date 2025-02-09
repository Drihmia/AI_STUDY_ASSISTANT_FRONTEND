import { Helmet } from 'react-helmet';


const GoogleTagManager = () => {
  const gtmId = process.env.REACT_APP_GTM_ID;
  if (!gtmId) {
    console.warn('GTM ID not found. Check your environment variables.');
    return null;
  }
  try {
    return (
      <Helmet>
        {/* Google Tag Manager Script - placed in <head> */}
        <script>
          {`
                        (function(w,d,s,l,i){
                            w[l]=w[l]||[];
                            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                            var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                            j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                            f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${gtmId}');
                    `}
        </script>
      </Helmet>
    );
  } catch (error) {
    console.error('Error loading Google Tag Manager', error.message);
    return null;
  }

}

export default GoogleTagManager;
