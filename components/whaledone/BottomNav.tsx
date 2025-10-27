import { Home, Send, Mail, BarChart3, Settings } from 'lucide-react';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  t: any;
}

export function BottomNav({ activeScreen, onNavigate, t }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: t.nav.home },
    { id: 'sent', icon: Send, label: t.nav.sent },
    { id: 'inbox', icon: Mail, label: t.nav.inbox },
    { id: 'stats', icon: BarChart3, label: t.nav.stats },
    { id: 'settings', icon: Settings, label: t.nav.settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg">
      <div className="max-w-[375px] mx-auto flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center gap-1 px-2 py-2 transition-colors flex-1"
            >
              <Icon 
                className={`w-5 h-5 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`} 
              />
              <span 
                className={`text-[10px] ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
