export default function Toasts({ toasts, removeToast }) {
  return (
    <div id="toast-notification-container" className="toast-wrapper">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-alert-popup animate-slide-in">
          <div className="toast-indicator-line" />
          <div className="toast-main-content">
            <span className="toast-heading">🚨 CRITICAL SYSTEM EMERGENCY ALERT</span>
            <p className="toast-body">{toast.message}</p>
          </div>
          <button className="toast-close-x" onClick={() => removeToast(toast.id)}>&times;</button>
        </div>
      ))}
    </div>
  );
}
