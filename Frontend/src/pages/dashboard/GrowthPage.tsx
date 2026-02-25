import React, { useEffect, useState } from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { dashboardService } from '@/services/dashboardService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const GrowthPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    dashboardService.getGrowth().then(setData);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pt-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Growth Tracker</h2>
        <p className="text-sm text-muted-foreground mt-1">Performance trends across your last 5 assessments</p>
      </div>

      <SpotlightCard className="p-6">
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="assessment" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} label={{ value: 'Assessment', position: 'bottom', fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Line type="monotone" dataKey="decisiveness" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="analytical_depth" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="emotional_regulation" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="social_energy" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="risk_orientation" stroke="hsl(var(--chart-5))" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </SpotlightCard>

      <SpotlightCard className="p-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Insight Summary</p>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Consistent improvement across all trait dimensions over the last 5 assessments. 
          Emotional regulation leads at 85 with steady gains. Decisiveness shows the strongest growth trajectory (+13 points). 
          Social energy and risk orientation present the highest opportunity areas for targeted development.
        </p>
      </SpotlightCard>
    </div>
  );
};

export default GrowthPage;
