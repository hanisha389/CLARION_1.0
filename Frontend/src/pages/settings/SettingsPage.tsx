import React, { useState, useEffect } from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [nlpEnabled, setNlpEnabled] = useState(true);
  const [questionLength, setQuestionLength] = useState('medium');
  const [reminders, setReminders] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('clarion_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('clarion_theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pt-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your preferences</p>
      </div>

      <Tabs defaultValue="appearance">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="ai">AI Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="mt-4">
          <SpotlightCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Dark Mode</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Toggle dark/light theme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </SpotlightCard>
        </TabsContent>

        <TabsContent value="security" className="mt-4 space-y-4">
          <SpotlightCard className="p-6">
            <div>
              <Label className="text-sm font-medium">Change Password</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Update your account password</p>
            </div>
            <button className="mt-4 px-4 py-2 rounded-xl bg-muted text-sm font-medium hover:bg-muted/80 transition-colors">
              Change Password
            </button>
          </SpotlightCard>
          <SpotlightCard className="p-6">
            <div>
              <Label className="text-sm font-medium">Logout All Sessions</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Sign out from all devices</p>
            </div>
            <button className="mt-4 px-4 py-2 rounded-xl bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors">
              Logout All
            </button>
          </SpotlightCard>
        </TabsContent>

        <TabsContent value="ai" className="mt-4 space-y-4">
          <SpotlightCard className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Enable NLP Analysis</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Use NLP for short answer scoring</p>
              </div>
              <Switch checked={nlpEnabled} onCheckedChange={setNlpEnabled} />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Preferred Question Length</Label>
              <Select value={questionLength} onValueChange={setQuestionLength}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Assessment Reminders</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Get notified for daily evaluations</p>
              </div>
              <Switch checked={reminders} onCheckedChange={setReminders} />
            </div>
          </SpotlightCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
