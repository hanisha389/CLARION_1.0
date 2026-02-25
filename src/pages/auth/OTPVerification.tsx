import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/services/authService';

interface Props {
  open: boolean;
  onClose: () => void;
  userId: number;
  onVerified: () => void;
}

const OTPVerification: React.FC<Props> = ({ open, onClose, userId, onVerified }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.verifyOTP({ user_id: userId, otp_code: otp });
      onVerified();
    } catch {
      setError('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-black/80 backdrop-blur-2xl border-white/10 text-white">
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">Verify Email</h2>
            <p className="text-sm text-white/40">Enter the 6-digit code sent to your email</p>
          </div>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white/60 text-xs">OTP Code</Label>
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-white/5 border-white/10 text-white text-center text-lg tracking-[0.5em] placeholder:text-white/20"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium text-sm hover:bg-white/20 transition-all disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
            <button type="button" className="w-full text-xs text-white/30 hover:text-white/60 transition-colors">
              Resend OTP
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPVerification;
