import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { signIn, signUp } from '../auth/auth.client';

export default function LoginModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    softwareBackground: '',
    hardwareBackground: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          softwareBackground: formData.softwareBackground,
          hardwareBackground: formData.hardwareBackground,
        });
      } else {
        await signIn.email({
          email: formData.email,
          password: formData.password,
        });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
          <X size={20} />
        </button>

        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          {isSignUp && (
            <>
              <textarea
                placeholder="Software Background (e.g., Python, React, ROS)"
                value={formData.softwareBackground}
                onChange={(e) => setFormData({ ...formData, softwareBackground: e.target.value })}
              />
              <textarea
                placeholder="Hardware Background (e.g., Arduino, Jetson, Robotics)"
                value={formData.hardwareBackground}
                onChange={(e) => setFormData({ ...formData, hardwareBackground: e.target.value })}
              />
            </>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p className="toggle-text">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}