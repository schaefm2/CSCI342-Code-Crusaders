import React, { useEffect, useState } from 'react';

// Amadeus API key: ...

// const AmadeusAPITokenCreation = ({ fetchedToken }) => {
  
    // const [accessToken, setAccessToken] = useState(null);
    // const [error, setError] = useState(null);

    const clientID = 'NkMFkZLtqmt4Mls7Qtmgc8JpPtzsu8Yp';
    const clientSecret = 'Dn3qINbKSQnwTt6x';

    // useEffect(() => {

    //     const storedLocalToken = localStorage.getItem('accessToken');

        // if (storedLocalToken) { // if one exists return the existing token
        //     setAccessToken(storedLocalToken)
        //     return;
        // }
        

        const fetchAccessToken = async (fetchedToken) => {

            console.log("Start of fetchAccessToken");

            try {

                const storedLocalToken = localStorage.getItem('accessToken');

                // If token is already in localStorage, call the fetchedToken callback and return
                if (storedLocalToken) { 
                    console.log("Found stored token inside fetchAccessToken, returning...");
                    fetchedToken(storedLocalToken);
                    return;
                }

                const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
                    
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},

                    // body of fetch to API which is how access token is acquired
                    body: new URLSearchParams({
                        grant_type: 'client_credentials',
                        client_id: clientID,
                        client_secret: clientSecret,
                    }),
                });

                if (!response.ok) { // if response failed
                    throw new Error('Failed to fetch access token from Amadeus API')
                }

                // const data = await response.json();
                // setAccessToken(data.access_token);

                // const token = data.access_token;
                // fetchedToken(token);

                const data = await response.json();
                const token = data.access_token;

                // Set the token in localStorage here too
                localStorage.setItem('accessToken', token);
                // setAccessToken(token);

                // is this needed???
                if (fetchedToken) {
                    fetchedToken(token);
                }

                console.log("Unique User Access Token: ", data.access_token);

            } catch(e) {
                // setError(`Error: ${err.message}`); // adds error to useState holding error for later
                console.log(e);
            }
        };

        // fetchAccessToken();
    // }, []); // NEED EMPTY DEPENDENCIES otherwise multiple tokens generate

    // // if error got set send error
    // if (error) {
    //     return <div>{error}</div>;
    // }
    
    // // if token isnt set yet keep loading
    // if (!accessToken) {
    //     return <div>Loading...</div>;
    // }

    // // return the string containing the accessToken
    // return <div>{accessToken}</div>
        
// }

// export default AmadeusAPITokenCreation;
export default fetchAccessToken;
