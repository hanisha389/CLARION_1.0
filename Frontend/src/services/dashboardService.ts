import api from './api';

const MOCK = true;

const mockSnapshot = {
  dominant_trait: 'Decisiveness',
  secondary_trait: 'Analytical Depth',
  score: 78,
  trend: '+6%',
  stability: 82,
  last_updated: '2026-02-25',
  insight: 'Your decision-making speed has improved by 12% while maintaining analytical depth. Emotional regulation remains stable.',
};

const mockTraitScores = {
  decisiveness: 78,
  analytical_depth: 72,
  emotional_regulation: 85,
  social_energy: 64,
  risk_orientation: 58,
};

const mockGrowth = [
  { assessment: 1, decisiveness: 65, analytical_depth: 60, emotional_regulation: 78, social_energy: 55, risk_orientation: 50 },
  { assessment: 2, decisiveness: 68, analytical_depth: 64, emotional_regulation: 80, social_energy: 58, risk_orientation: 52 },
  { assessment: 3, decisiveness: 72, analytical_depth: 68, emotional_regulation: 82, social_energy: 60, risk_orientation: 55 },
  { assessment: 4, decisiveness: 75, analytical_depth: 70, emotional_regulation: 84, social_energy: 62, risk_orientation: 56 },
  { assessment: 5, decisiveness: 78, analytical_depth: 72, emotional_regulation: 85, social_energy: 64, risk_orientation: 58 },
];

const mockCareer = {
  recommended_roles: ['Strategy Consultant', 'Product Manager', 'Data Analyst', 'Operations Director'],
  risk_notes: 'Moderate risk tolerance suggests avoiding high-volatility startup environments initially.',
  leadership_readiness: 74,
  growth_advice: 'Focus on improving social energy and risk orientation to unlock leadership opportunities in cross-functional teams.',
};

const mockRewards = {
  xp: 340,
  xp_next_level: 500,
  level: 4,
  streak: 7,
  badges: [
    { name: 'First Assessment', icon: '🎯', earned_at: '2026-01-15' },
    { name: '5-Day Streak', icon: '🔥', earned_at: '2026-02-01' },
    { name: 'Stability Master', icon: '⚖️', earned_at: '2026-02-10' },
    { name: 'Deep Thinker', icon: '🧠', earned_at: '2026-02-20' },
  ],
};

const mockTimeline = [
  { month: 'Feb 2026', dominant: 'Decisiveness', change: '+6%', stability: 82 },
  { month: 'Jan 2026', dominant: 'Emotional Regulation', change: '+4%', stability: 78 },
  { month: 'Dec 2025', dominant: 'Analytical Depth', change: '+8%', stability: 72 },
  { month: 'Nov 2025', dominant: 'Decisiveness', change: '+2%', stability: 68 },
  { month: 'Oct 2025', dominant: 'Social Energy', change: '-3%', stability: 65 },
];

const mockQuestions = [
  { id: 1, trait_id: 1, question_text: 'You are leading a team meeting and two members present conflicting strategies. Both have valid data. How do you proceed?', context_type: 'corporate', question_type: 'scenario', options: ['Choose the strategy with faster ROI', 'Request more data before deciding', 'Facilitate a team vote', 'Combine elements of both strategies'] },
  { id: 2, trait_id: 2, question_text: 'When faced with a complex problem, what is your first instinct?', context_type: 'general', question_type: 'mcq', options: ['Break it into smaller parts', 'Look for similar past solutions', 'Discuss with others', 'Trust your gut feeling'] },
  { id: 3, trait_id: 3, question_text: 'Describe a recent situation where you had to manage your emotions under pressure.', context_type: 'stress', question_type: 'short_answer', options: [] },
  { id: 4, trait_id: 4, question_text: 'At a networking event, you typically:', context_type: 'general', question_type: 'mcq', options: ['Introduce yourself to strangers', 'Stay with people you know', 'Observe first, then engage', 'Leave early'] },
  { id: 5, trait_id: 5, question_text: 'A promising but risky opportunity arises. It could double your progress or set you back. What do you do?', context_type: 'academic', question_type: 'scenario', options: ['Take the risk immediately', 'Analyze probability of success', 'Seek mentor advice first', 'Pass and wait for safer option'] },
];

export const dashboardService = {
  async getSnapshot() {
    if (MOCK) return mockSnapshot;
    const { data } = await api.get('/dashboard/snapshot');
    return data;
  },
  async getTraitScores() {
    if (MOCK) return mockTraitScores;
    const { data } = await api.get('/dashboard/traits');
    return data;
  },
  async getGrowth() {
    if (MOCK) return mockGrowth;
    const { data } = await api.get('/dashboard/growth');
    return data;
  },
  async getCareer() {
    if (MOCK) return mockCareer;
    const { data } = await api.get('/career');
    return data;
  },
  async getRewards() {
    if (MOCK) return mockRewards;
    const { data } = await api.get('/rewards');
    return data;
  },
  async getTimeline() {
    if (MOCK) return mockTimeline;
    const { data } = await api.get('/dashboard/timeline');
    return data;
  },
  async getAssessmentQuestions() {
    if (MOCK) return mockQuestions;
    const { data } = await api.get('/assessment/start');
    return data;
  },
  async submitAssessment(responses: Record<number, string>) {
    if (MOCK) return { message: 'Assessment submitted', new_scores: mockTraitScores };
    const { data } = await api.post('/assessment/submit', { responses });
    return data;
  },
};
