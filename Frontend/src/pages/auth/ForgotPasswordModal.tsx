import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/services/authService';

interface Props {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
}

const ForgotPasswordModal: React.FC<Props> = ({ open, onClose, onBack }) => {
  const [step, setStep] = useState<'email' | 'otp' | 'done'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.forgotPassword(email);
      setStep('otp');
    } catch { setError('Failed to send OTP'); }
    finally { setLoading(false); }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    setError('');
    try {
      await authService.resetPassword({ email, otp_code: otp, new_password: newPassword });
      setStep('done');
    } catch { setError('Reset failed'); }
    finally { setLoading(false); }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-black/80 backdrop-blur-2xl border-white/10 text-white">
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              {step === 'done' ? 'Password Reset' : 'Forgot Password'}
            </h2>
          </div>

          {step === 'email' && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white/60 text-xs">Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/5 border-white/10 text-white" required />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-all disabled:opacity-50">
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
              <button type="button" onClick={onBack} className="w-full text-xs text-white/30 hover:text-white/60">Back to login</button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white/60 text-xs">OTP Code</Label>
                <Input value={otp} onChange={(e) => setOtp(e.target.value)} className="bg-white/5 border-white/10 text-white text-center tracking-[0.5em]" maxLength={6} required />
              </div>
              <div className="space-y-2">
                <Label className="text-white/60 text-xs">New Password</Label>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-white/5 border-white/10 text-white" required />
              </div>
              <div className="space-y-2">
                <Label className="text-white/60 text-xs">Confirm Password</Label>
                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-white/5 border-white/10 text-white" required />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-all disabled:opacity-50">
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}

          {step === 'done' && (
            <div className="text-center space-y-4">
              <p className="text-white/60 text-sm">Your password has been reset successfully.</p>
              <button onClick={onBack} className="px-6 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-all">
                Back to Login
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
