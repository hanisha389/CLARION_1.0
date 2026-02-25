import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { dashboardService } from '@/services/dashboardService';

const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dashboardService.getAssessmentQuestions().then(setQuestions);
  }, []);

  const q = questions[current];
  const total = questions.length;

  const selectOption = (val: string) => {
    setResponses({ ...responses, [q.id]: val });
  };

  const handleSubmit = async () => {
    await dashboardService.submitAssessment(responses);
    setSubmitted(true);
    setTimeout(() => navigate('/dashboard'), 2000);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <SpotlightCard className="p-8 text-center max-w-md">
          <p className="text-2xl font-bold mb-2">Assessment Complete</p>
          <p className="text-sm text-muted-foreground">Your trait scores have been updated. Redirecting...</p>
        </SpotlightCard>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pt-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dynamic Behavioral Calibration</h2>
        <p className="text-sm text-muted-foreground mt-1">Adaptive assessment engine</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${((current + 1) / total) * 100}%` }} />
        </div>
        <span className="text-xs text-muted-foreground font-mono">{current + 1}/{total}</span>
      </div>

      <SpotlightCard className="p-6" key={q.id}>
        <div className="space-y-2 mb-6">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-1 rounded-md bg-muted/50">
            {q.question_type === 'mcq' ? 'Multiple Choice' : q.question_type === 'scenario' ? 'Scenario' : 'Short Answer'}
          </span>
          <p className="text-base font-medium leading-relaxed mt-3">{q.question_text}</p>
        </div>

        {q.question_type === 'short_answer' ? (
          <textarea
            value={responses[q.id] || ''}
            onChange={(e) => selectOption(e.target.value)}
            className="w-full h-28 rounded-xl border border-border bg-muted/30 p-4 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Type your response..."
          />
        ) : (
          <div className="space-y-2">
            {q.options.map((opt: string, i: number) => (
              <button
                key={i}
                onClick={() => selectOption(opt)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                  responses[q.id] === opt
                    ? 'border-primary bg-primary/10 font-medium'
                    : 'border-border bg-muted/20 hover:bg-muted/40'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </SpotlightCard>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="px-5 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        >
          Previous
        </button>
        {current < total - 1 ? (
          <button
            onClick={() => setCurrent(current + 1)}
            disabled={!responses[q.id]}
            className="px-5 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-30"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(responses).length < total}
            className="px-5 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-30"
          >
            Submit Assessment
          </button>
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;
