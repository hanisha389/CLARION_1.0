import React, { useEffect, useState } from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { dashboardService } from '@/services/dashboardService';
import { Flame, Star } from 'lucide-react';

const RewardsPage: React.FC = () => {
  const [rewards, setRewards] = useState<any>(null);

  useEffect(() => {
    dashboardService.getRewards().then(setRewards);
  }, []);

  if (!rewards) return null;

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Rewards</h2>
        <p className="text-sm text-muted-foreground mt-1">Your progress and achievements</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <SpotlightCard className="p-6 text-center">
          <Star className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-3xl font-bold">Level {rewards.level}</p>
          <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(rewards.xp / rewards.xp_next_level) * 100}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{rewards.xp} / {rewards.xp_next_level} XP</p>
        </SpotlightCard>

        <SpotlightCard className="p-6 text-center">
          <Flame className="w-8 h-8 text-chart-3 mx-auto mb-2" />
          <p className="text-3xl font-bold">{rewards.streak}</p>
          <p className="text-xs text-muted-foreground mt-1">Day Streak</p>
        </SpotlightCard>

        <SpotlightCard className="p-6 text-center">
          <p className="text-3xl font-bold">{rewards.badges.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Badges Earned</p>
        </SpotlightCard>
      </div>

      <SpotlightCard className="p-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Badges</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {rewards.badges.map((badge: any, i: number) => (
            <div key={i} className="flex flex-col items-center p-4 rounded-xl bg-muted/30 gap-2">
              <span className="text-3xl">{badge.icon}</span>
              <span className="text-xs font-medium text-center">{badge.name}</span>
              <span className="text-[10px] text-muted-foreground">{badge.earned_at}</span>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </div>
  );
};

export default RewardsPage;
