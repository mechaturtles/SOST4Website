import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const ServiceManagerPage = () => (
    <div>
        <h1>Connect to your Health Device</h1>
        <ServiceManagerForm />
    </div>
);

class ServiceManagerFormBase extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <a href="#" onClick={DexcomRedirectLink}>Sign in to Dexcom</a> 
                    </li>
                    <li>
                        <Link to={ROUTES.SIGN_IN}>Sign in to Fitbit</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

const DexcomRedirectLink = () => {
    let client_id = process.env.REACT_APP_DEXCOM_CLIENT_ID;
    let redirect_uri = "http://localhost:3000/oauth/dexcom";
    //let link = `https://api.dexcom.com/v2/oauth2/login?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=offline_access`;
    let link = `https://sandbox-api.dexcom.com/v2/oauth2/login?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=offline_access`;
    window.open(link);
}

export default ServiceManagerPage;

const ServiceManagerForm = withFirebase(ServiceManagerFormBase);

export { ServiceManagerForm };