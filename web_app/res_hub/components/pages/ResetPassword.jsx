import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import styles from '../../styles/components/auch.module.css';
import Toast from '../common/Toast';

function ResetPassword() {
const location = useLocation();
const navigate = useNavigate();
const email = location.state?.email || '';

const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleSubmit = async (e) => {
e.preventDefault();
setError(null);

if (!password || !confirmPassword) {
setError('Please fill in both password fields.');
return;
}

if (password.length < 8) {
setError('Your password must contain at least 8 characters.');
return;
}

if (password !== confirmPassword) {
setError('The passwords do not match.');
return;
}

setLoading(true);

try {
const { error: updateError } =
await supabase.auth.updateUser({
password
});

if (updateError) {
throw updateError;
}

// End the recovery session after the password is changed.
await supabase.auth.signOut();

navigate('/login', {
state: {
passwordResetSuccess: true
}
});
} catch (err) {
setError(err.message || 'Unable to reset your password.');
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
<h1>Reset Password</h1>

<p className={styles.subtitle}>
Choose a new password for your ResHub account.
</p>

{email && (
<p className={styles.subtitle}>
Account: {email}
</p>
)}

<label className={styles.field}>
<span>New Password *</span>
<input
type="password"
placeholder="Enter your new password"
value={password}
onChange={(e) => setPassword(e.target.value)}
autoComplete="new-password"
required
/>
</label>

<label className={styles.field}>
<span>Confirm New Password *</span>
<input
type="password"
placeholder="Confirm your new password"
value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
autoComplete="new-password"
required
/>
</label>

<button
type="submit"
className={styles.submitBtn}
disabled={loading}
>
{loading ? 'Updating...' : 'Reset Password'}
</button>

<p className={styles.switchAuth}>
<Link to="/login">Back to Login</Link>
</p>
</form>
</div>
);
}

export default ResetPassword;