
import { useEffect, useState } from 'react';
import toastSt from '../../styles/components/Toast.module.css';

function Toast({ title, content, type }) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!content || !['success', 'error'].includes(type)) {
      setShowToast(false);
      return;
    }

    setShowToast(true);

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [title, content, type]);

  if (!showToast) return null;

  return (
    <div className={toastSt.container}>
      <section
        className={toastSt.toast}
        role={type === 'error' ? 'alert' : 'status'}
        aria-live={type === 'error' ? 'assertive' : 'polite'}
      >
        <div
          className={`${toastSt.toastIndicator} ${
            type === 'success' ? toastSt.success : toastSt.error
          }`}
        />

        <div className={toastSt.toastContent}>
          <p className={toastSt.toastTitle}>
            {title || (type === 'error' ? 'Error' : 'Success')}
          </p>

          <p className={toastSt.content}>{content}</p>
        </div>
      </section>
    </div>
  );
}

export default Toast;