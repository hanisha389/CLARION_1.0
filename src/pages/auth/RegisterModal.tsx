import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/services/authService';
import OTPVerification from './OTPVerification';

interface Props {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<Props> = ({ open, onClose, onSwitchToLogin }) => {
  const [form, setForm] = useState({ full_name: '', username: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400'][strength];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true);
    try {
      const res = await authService.register({ full_name: form.full_name, username: form.username, email: form.email, password: form.password });
      setUserId(res.user_id);
      setShowOTP(true);
    } catch {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (showOTP) {
    return <OTPVerification open={open} onClose={onClose} userId={userId!} onVerified={() => { onClose(); onSwitchToLogin(); }} />;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-black/80 backdrop-blur-2xl border-white/10 text-white">
        <div className="space-y-5">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">Create Account</h2>
            <p className="text-sm text-white/40">Join CLARION</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-3">
            {([
              ['Full Name', 'full_name', 'text'],
              ['Username', 'username', 'text'],
              ['Email', 'email', 'email'],
              ['Password', 'password', 'password'],
              ['Confirm Password', 'confirm', 'password'],
            ] as const).map(([label, key, type]) => (
              <div key={key} className="space-y-1.5">
                <Label className="text-white/60 text-xs">{label}</Label>
                <Input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                  required
                />
                {key === 'password' && form.password && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${strengthColor}`} style={{ width: `${strength * 25}%` }} />
                    </div>
                    <span className="text-[10px] text-white/40">{strengthLabel}</span>
                  </div>
                )}
              </div>
            ))}

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm hover:bg-white/20 transition-all disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Register'}
            </button>
          </form>

          <p className="text-center text-xs text-white/30">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="text-white/60 hover:text-white/90 transition-colors underline">
              Sign in
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
