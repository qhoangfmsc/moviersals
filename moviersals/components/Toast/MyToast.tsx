import React, { useState, useEffect } from 'react';

type ToastProps = {
  content: string;
  duration?: number; // duration in milliseconds
  type?: 'error' | 'success'; // determines the style of the toast
};

export default function MyToast({ content, duration = 10000, type = 'success' }: ToastProps) {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
    setVisible(true);

    const hideTimer = setTimeout(() => setVisible(false), duration);
    const removeTimer = setTimeout(() => setShouldRender(false), duration + 500); // Extra time for animation

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setShouldRender(false), 500); // Delay to match animation duration
  };

  if (!shouldRender) return null;

  // Determine styles based on the toast type
  const backgroundColor = type === 'error' ? '#f56565' : '#48bb78'; // Red for error, green for success

  return (
    <div
      className={`toast ${visible ? 'toast-show' : 'toast-hide'} z-50`}
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor,
        color: '#fff',
        borderRadius: '5px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: '300px',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {content}
      </span>
      <button
        onClick={handleClose}
        style={{
          marginLeft: '10px',
          backgroundColor: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        ✖
      </button>
      <style jsx>{`
        .toast-show {
          opacity: 1;
          transform: translateY(0);
        }

        .toast-hide {
          opacity: 0;
          transform: translateY(20px); /* Slide down on hide */
        }
      `}</style>
    </div>
  );
}
