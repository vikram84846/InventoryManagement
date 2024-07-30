import React, { useEffect } from 'react';
import { auth } from '../appwrite/appwriteService';

const VerifyEmail = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');
        const secret = urlParams.get('secret');

        if (userId && secret) {
            auth.verifyEmail(userId, secret).then(() => {
                console.log('Email verification process completed.');
            }).catch((error) => {
                console.log('Email verification failed:', error.message);
            });
        }
    }, []);

    return (
        <div>
            <h1>Email Verification</h1>
            <p>Please wait while we verify your email...</p>
        </div>
    );
};

export default VerifyEmail;
