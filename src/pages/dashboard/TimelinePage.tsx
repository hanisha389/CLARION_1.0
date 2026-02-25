import React, { useEffect, useState } from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { dashboardService } from '@/services/dashboardService';
import { ArrowUp, ArrowDown } from 'lucide-react';

const TimelinePage: React.FC = () => {
  const [timeline, setTimeline] = useState<any[]>([]);

  useEffect(() => {
    dashboardService.getTimeline().then(setTimeline);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Behavioral Timeline</h2>
        <p className="text-sm text-muted-foreground mt-1">Your trait evolution over time</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-4">
          {timeline.map((entry, i) => {
            const isPositive = entry.change.startsWith('+');
            return (
              <div key={i} className="relative pl-14">
                <div className={`absolute left-3 top-5 w-4 h-4 rounded-full border-2 ${isPositive ? 'border-chart-1 bg-chart-1/20' : 'border-destructive bg-destructive/20'}`} />
                <SpotlightCard className="p-5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">{entry.month}</p>
                      <p className="font-semibold mt-1">{entry.dominant}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`flex items-center gap-1 font-medium ${isPositive ? 'text-chart-1' : 'text-destructive'}`}>
                        {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {entry.change}
                      </span>
                      <span className="text-muted-foreground">Stability: {entry.stability}%</span>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
