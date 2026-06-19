export default function AuthForm({
  isSignUpMode,
  authRole,
  setAuthRole,
  toggleAuthMode,
  handleAuthSubmit,
  logout
}) {
  return (
    <div id="auth-page" className="page-container active">
      <div className="auth-card">
        <header className="brand-header">
          <h1>HealNest</h1>
          <p className="tagline">Care that continues after discharge</p>
        </header>
        <h2 id="auth-title">{isSignUpMode ? 'Create Account' : 'Account Login'}</h2>
        <form id="auth-form" onSubmit={handleAuthSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" required placeholder="name@hospital.com" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required placeholder="••••••••" />
          </div>
          <div className="input-group">
            <label htmlFor="role">Identify Your Role</label>
            <select id="role" required value={authRole} onChange={(event) => setAuthRole(event.target.value)}>
              <option value="" disabled>Select your role...</option>
              <option value="doctor">Medical Professional (Doctor)</option>
              <option value="patient">Patient / Family Member</option>
            </select>
          </div>
          <button type="submit" id="auth-btn" className="btn-primary">
            {isSignUpMode ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <p className="auth-toggle">
          <span id="toggle-text">{isSignUpMode ? 'Already have an account?' : "Don't have an account?"}</span>
          <a href="#" id="toggle-link" onClick={(event) => { event.preventDefault(); toggleAuthMode(); }}>
            {isSignUpMode ? 'Log In' : 'Sign Up'}
          </a>
        </p>
      </div>
    </div>
  );
}
