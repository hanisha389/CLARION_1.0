import React from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, BookOpen, Target } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  const profileData = {
    age: 28,
    education_level: 'Masters',
    field_of_study: 'Cognitive Science',
    current_role: 'Product Analyst',
    career_goal: 'Head of Strategy',
    primary_environment: 'Corporate',
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pt-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Profile</h2>
        <p className="text-sm text-muted-foreground mt-1">Your account information</p>
      </div>

      <SpotlightCard className="p-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
            {user?.full_name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user?.full_name}</h3>
            <p className="text-sm text-muted-foreground">@{user?.username}</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: Mail, label: 'Email', value: user?.email },
            { icon: User, label: 'Age', value: profileData.age },
            { icon: BookOpen, label: 'Education', value: `${profileData.education_level} — ${profileData.field_of_study}` },
            { icon: Target, label: 'Current Role', value: profileData.current_role },
            { icon: Target, label: 'Career Goal', value: profileData.career_goal },
          ].map(({ icon: Icon, label, value }, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
              <Icon className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>

      <div className="flex gap-3">
        <button className="flex-1 py-2.5 rounded-xl bg-muted text-sm font-medium hover:bg-muted/80 transition-colors">
          Edit Profile
        </button>
        <button className="flex-1 py-2.5 rounded-xl bg-muted text-sm font-medium hover:bg-muted/80 transition-colors">
          Change Password
        </button>
        <button className="px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
