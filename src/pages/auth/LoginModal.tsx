import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import ForgotPasswordModal from './ForgotPasswordModal';

interface Props {
  open: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<Props> = ({ open, onClose, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authService.login({ username, password });
      login(res.access_token, res.user);
      onClose();
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  if (showForgot) {
    return <ForgotPasswordModal open={open} onClose={() => { setShowForgot(false); onClose(); }} onBack={() => setShowForgot(false)} />;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-black/80 backdrop-blur-2xl border-white/10 text-white">
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">Welcome back</h2>
            <p className="text-sm text-white/40">Sign in to CLARION</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white/60 text-xs">Username or Email</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                placeholder="Enter username or email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/60 text-xs">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                placeholder="Enter password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" className="border-white/20" />
                <label htmlFor="remember" className="text-xs text-white/40">Remember me</label>
              </div>
              <button type="button" onClick={() => setShowForgot(true)} className="text-xs text-white/40 hover:text-white/70 transition-colors">
                Forgot password?
              </button>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm hover:bg-white/20 transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-white/30">
            Don't have an account?{' '}
            <button onClick={onSwitchToRegister} className="text-white/60 hover:text-white/90 transition-colors underline">
              Register
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
