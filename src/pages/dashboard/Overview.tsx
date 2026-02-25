import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { dashboardService } from '@/services/dashboardService';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, Activity } from 'lucide-react';

const Overview: React.FC = () => {
  const navigate = useNavigate();
  const [snapshot, setSnapshot] = useState<any>(null);
  const [traits, setTraits] = useState<any>(null);

  useEffect(() => {
    dashboardService.getSnapshot().then(setSnapshot);
    dashboardService.getTraitScores().then(setTraits);
  }, []);

  const radarData = traits
    ? [
        { trait: 'Decisiveness', value: traits.decisiveness },
        { trait: 'Analysis', value: traits.analytical_depth },
        { trait: 'Emotion', value: traits.emotional_regulation },
        { trait: 'Social', value: traits.social_energy },
        { trait: 'Risk', value: traits.risk_orientation },
      ]
    : [];

  const stabilityPercent = snapshot?.stability ?? 0;
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (stabilityPercent / 100) * circumference;

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">Your behavioral intelligence overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Behavioral Snapshot */}
        <SpotlightCard className="p-6 col-span-1 lg:col-span-2">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Behavioral Snapshot</p>
                <h3 className="text-2xl font-bold mt-1">{snapshot?.dominant_trait || '—'}</h3>
              </div>
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Secondary</p>
                  <p className="font-medium">{snapshot?.secondary_trait || '—'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Score</p>
                  <p className="font-medium">{snapshot?.score ?? '—'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Trend</p>
                  <p className="font-medium text-chart-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {snapshot?.trend || '—'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{snapshot?.insight}</p>
            </div>
          </div>
        </SpotlightCard>

        {/* Stability Meter */}
        <SpotlightCard className="p-6 flex flex-col items-center justify-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Pattern Stability</p>
          <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" className="stroke-muted" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="45" fill="none"
                className="stroke-primary"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{stabilityPercent}%</span>
              <span className="text-[10px] text-muted-foreground">stable</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
            <Activity className="w-3 h-3" />
            <span>Low volatility</span>
          </div>
        </SpotlightCard>

        {/* Trait Radar */}
        <SpotlightCard className="p-6 col-span-1 md:col-span-2 lg:col-span-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Trait Visualization</p>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="trait" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Traits"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </SpotlightCard>

        {/* Adaptive Evaluation CTA */}
        <SpotlightCard className="p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/30 transition-colors" spotlightColor="rgba(73, 89, 64, 0.2)">
          <Brain className="w-10 h-10 text-primary" />
          <div className="text-center">
            <p className="font-semibold">Adaptive Evaluation</p>
            <p className="text-xs text-muted-foreground mt-1">Run today's behavioral assessment</p>
          </div>
          <button
            onClick={() => navigate('/assessment')}
            className="px-6 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            Start Evaluation
          </button>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default Overview;
