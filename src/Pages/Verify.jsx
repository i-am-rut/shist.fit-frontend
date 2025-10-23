import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import axios from 'axios';
import { notifyError, notifySuccess } from '../utils/toasts'; 
import Loader from '../components/Loader'; 

const Verify = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const token = searchParams.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        notifyError("Invalid or missing verification token.");
        return;
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/verify-email`,
          { token }
        );

        setStatus('success');
        notifySuccess("Email verified successfully!");
        // Optional: auto-redirect after success
        setTimeout(() => navigate('/login'), 3000);
      } catch (err) {
        setStatus('error');
        notifyError(
          'Email verification failed.',
          err.response?.data?.error || err.message
        );
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      {status === 'verifying' && (
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-lg">Verifying your email...</p>
        </div>
      )}
      {status === 'success' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Success 🎉</h2>
          <p>Your email has been verified. Redirecting to login...</p>
        </div>
      )}
      {status === 'error' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Verification Failed</h2>
          <p>Please request a new verification link or contact support.</p>
          {/* <button onClick={handleResendEmailClick} className="font-bold text-green-500 underline cursor-pointer">Resend link</button> */}
        </div>
      )}
    </div>
  );
};

export default Verify;
