import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import styles from '../../styles/components/auch.module.css';
import Toast from '../common/Toast';

function VerifyResetOTP() {
const location = useLocation();
const navigate = useNavigate();
const email = location.state?.email || '';

const [token, setToken] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleSubmit = async (e) => {
e.preventDefault();
setError(null);

if (!email) {
setError('Email address missing. Please request a new reset code.');
return;
}

if (!token.trim()) {
setError('Please enter the OTP sent to your email.');
return;
}

setLoading(true);

try {
const { error: verifyError } = await supabase.auth.verifyOtp({
email,
token: token.trim(),
type: 'recovery'
});

if (verifyError) {
throw verifyError;
}

navigate('/reset-password', {
state: { email }
});
} catch (err) {
setError(err.message || 'Invalid or expired OTP.');
} finally {
setLoading(false);
}
};

return (
<div className={styles.container}>
{error && (
<Toast
title="Error"
content={error}
type="error"
/>
)}

<form
className={styles.card}
onSubmit={handleSubmit}
noValidate
>
<h1>Verify Your Email</h1>

<p className={styles.subtitle}>
Enter the one-time password sent to your registered email.
</p>

<label className={styles.field}>
<span>Email Address</span>
<input type="email" value={email} readOnly />
</label>

<label className={styles.field}>
<span>OTP Code *</span>
<input
type="text"
placeholder="Enter your OTP"
value={token}
onChange={(e) => setToken(e.target.value)}
autoComplete="one-time-code"
required
/>
</label>

<button
type="submit"
className={styles.submitBtn}
disabled={loading}
>
{loading ? 'Verifying...' : 'Verify OTP'}
</button>

<p className={styles.switchAuth}>
<Link to="/forgot-password">Request another code</Link>
</p>
</form>
</div>
);
}

export default VerifyResetOTP;