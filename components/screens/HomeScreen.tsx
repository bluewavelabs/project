import { Send, Mail, TrendingUp, Sparkles, UserPlus, Users } from 'lucide-react';
import { Header } from '../whaledone/Header';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  t: any;
}

export function HomeScreen({ onNavigate, t }: HomeScreenProps) {
  const unreadCount = 3;
  const todayCompliments = 2;
  const topKeywords = t.examples.slice(0, 3).map((ex: string) => ex.split(' ')[0]);
  
  // Mock data - in real app, this would come from user's contacts
  const hasRegisteredContacts = false; // Set to false to show empty state
  const registeredContacts = hasRegisteredContacts ? [
    { name: 'Sarah Kim', role: 'Product Designer', avatar: '👩‍💼' },
    { name: 'Mike Chen', role: 'Developer', avatar: '👨‍💻' },
  ] : [];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        onNotifications={() => onNavigate('notifications')}
        onSettings={() => onNavigate('settings')}
        notificationCount={unreadCount}
      />
      
      <div className="p-4 space-y-4">
        {/* Main CTA */}
        <Button 
          onClick={() => onNavigate('send')}
          className="w-full h-12 rounded-xl bg-primary hover:bg-[#2563EB] text-primary-foreground transition-colors"
        >
          <Send className="w-5 h-5 mr-2" />
          {t.home.sendCompliment}
        </Button>

        {/* Received Compliments Card */}
        <Card 
          className="p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate('inbox')}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-primary" />
                <h3 className="text-foreground">{t.home.receivedCompliments}</h3>
              </div>
              <p className="text-muted-foreground">
                {unreadCount} <span className="text-primary">{t.home.newCompliments}</span> {t.home.complimentsWaiting}
              </p>
            </div>
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">
              {unreadCount}
            </div>
          </div>
        </Card>

        {/* My Stats Card */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">{t.home.myStats}</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t.home.todayCompliments}</span>
              <span className="text-primary">{todayCompliments}</span>
            </div>
            
            <div>
              <p className="text-muted-foreground mb-2">{t.home.topKeywords}</p>
              <div className="flex flex-wrap gap-2">
                {topKeywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => onNavigate('stats')}
              variant="outline"
              className="w-full mt-2"
            >
              {t.home.viewDetailedStats}
            </Button>
          </div>
        </Card>

        {/* Recommended Contacts / Add Contacts */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">{t.home.tryComplimenting}</h3>
          </div>
          
          {hasRegisteredContacts ? (
            // Show registered contacts
            <div className="space-y-2">
              {registeredContacts.map((person, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => onNavigate('send', { preselectedContact: person })}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      {person.avatar}
                    </div>
                    <div>
                      <p className="text-foreground">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.role}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    {t.home.send}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            // Show empty state with add contacts CTA
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground mb-4">
                {t.home.noContactsMessage}
              </p>
              <Button 
                onClick={() => onNavigate('send')}
                className="w-full bg-primary hover:bg-[#2563EB] text-primary-foreground"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                {t.home.addContactsAndSend}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}