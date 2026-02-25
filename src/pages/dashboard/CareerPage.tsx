import React, { useEffect, useState } from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { dashboardService } from '@/services/dashboardService';
import { Briefcase, AlertTriangle, Award, Lightbulb } from 'lucide-react';

const CareerPage: React.FC = () => {
  const [career, setCareer] = useState<any>(null);

  useEffect(() => {
    dashboardService.getCareer().then(setCareer);
  }, []);

  if (!career) return null;

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Career Alignment</h2>
        <p className="text-sm text-muted-foreground mt-1">AI-matched career recommendations based on your behavioral profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SpotlightCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10"><Briefcase className="w-5 h-5 text-primary" /></div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Recommended Roles</p>
          </div>
          <div className="space-y-2">
            {career.recommended_roles.map((role: string, i: number) => (
              <div key={i} className="px-4 py-2.5 rounded-xl bg-muted/50 text-sm font-medium">{role}</div>
            ))}
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-destructive/10"><AlertTriangle className="w-5 h-5 text-destructive" /></div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Risk Notes</p>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{career.risk_notes}</p>
        </SpotlightCard>

        <SpotlightCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-chart-1/10"><Award className="w-5 h-5 text-chart-1" /></div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Leadership Readiness</p>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold">{career.leadership_readiness}</span>
            <span className="text-sm text-muted-foreground mb-1">/ 100</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-chart-1 transition-all duration-700" style={{ width: `${career.leadership_readiness}%` }} />
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10"><Lightbulb className="w-5 h-5 text-primary" /></div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Growth Advice</p>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{career.growth_advice}</p>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default CareerPage;
