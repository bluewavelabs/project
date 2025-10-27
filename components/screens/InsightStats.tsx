import { TrendingUp, Award, Lock } from 'lucide-react';
import { Header } from '../whaledone/Header';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '../ui/alert-dialog';
import { useState } from 'react';

interface InsightStatsProps {
  onNavigate: (screen: string) => void;
  t: any;
}

export function InsightStats({ onNavigate, t }: InsightStatsProps) {
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const isSubscriber = false;

  const keywordData = [
    { keyword: '도움이 되는', count: 12 },
    { keyword: '창의적인', count: 9 },
    { keyword: '긍정적인', count: 8 },
    { keyword: '전문적인', count: 6 },
    { keyword: '친절한', count: 5 },
  ];

  const timelineData = [
    { month: '1월', count: 5 },
    { month: '2월', count: 8 },
    { month: '3월', count: 12 },
    { month: '4월', count: 15 },
    { month: '5월', count: 18 },
    { month: '6월', count: 22 },
  ];

  const totalCompliments = timelineData.reduce((sum, item) => sum + item.count, 0);
  const growthRate = 23;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title={t.stats.title}
        showBack
        onBack={() => onNavigate('home')}
      />
      
      <div className="p-4 space-y-4">
        {/* Positivity Index Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/30">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t.stats.positivityIndex}</p>
              <h2 className="text-foreground">{totalCompliments}</h2>
              <p className="text-sm text-muted-foreground">{t.stats.totalCompliments}</p>
            </div>
            <div className="bg-primary/20 p-3 rounded-full">
              <Award className="w-6 h-6 text-primary" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 p-3 bg-white/50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            <p className="text-sm text-foreground">
              <span className="text-primary">+{growthRate}%</span> {t.stats.fromLastMonth}
            </p>
          </div>
        </Card>

        {/* Top Keywords Chart */}
        <Card className="p-4">
          <h3 className="text-foreground mb-4">{t.stats.topKeywords}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={keywordData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="keyword" 
                tick={{ fontSize: 12 }}
                stroke="#6B7280"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#6B7280"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Timeline */}
        <Card className="p-4">
          <h3 className="text-foreground mb-4">{t.stats.complimentHistory}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                stroke="#6B7280"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#6B7280"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Premium Feature Card */}
        <Card className="p-4 border-2 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg">
            {t.stats.premium}
          </div>
          <div className="flex items-start gap-3 mb-3">
            <Lock className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="text-foreground mb-1">{t.stats.detailedStats}</h3>
              <p className="text-sm text-muted-foreground">
                {t.stats.detailedStatsDesc}
              </p>
            </div>
          </div>
          
          {!isSubscriber && (
            <Button 
              onClick={() => setShowSubscriptionDialog(true)}
              className="w-full mt-3 bg-primary hover:bg-[#2563EB] text-primary-foreground rounded-xl"
            >
              {t.stats.viewDetailedStats}
            </Button>
          )}
        </Card>

        {/* Recent Highlights */}
        <Card className="p-4">
          <h3 className="text-foreground mb-3">{t.stats.recentHighlights}</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="text-sm text-foreground">{t.stats.mostCommon}</p>
                <p className="text-muted-foreground">"도움이 되는"</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-sm text-foreground">{t.stats.bestDay}</p>
                <p className="text-muted-foreground">6월 15일 - 5 {t.stats.compliments}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="text-sm text-foreground">{t.stats.currentStreak}</p>
                <p className="text-muted-foreground">7 {t.stats.daysReceiving}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Subscription Dialog */}
      <AlertDialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
        <AlertDialogContent className="max-w-[340px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.stats.upgradeTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.stats.upgradeMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.stats.maybeLater}</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowSubscriptionDialog(false);
              alert('Subscription feature coming soon!');
            }}>
              {t.stats.subscribeNow}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
