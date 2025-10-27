import { User, Bell, Settings, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onProfile?: () => void;
  onNotifications?: () => void;
  onSettings?: () => void;
  notificationCount?: number;
}

export function Header({ 
  title, 
  showBack, 
  onBack, 
  onProfile, 
  onNotifications, 
  onSettings,
  notificationCount = 0 
}: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          )}
          {title && <h1 className="text-foreground">{title}</h1>}
        </div>
        
        <div className="flex items-center gap-2">
          {onNotifications && (
            <button 
              onClick={onNotifications}
              className="p-2 hover:bg-muted rounded-lg transition-colors relative"
            >
              <Bell className="w-5 h-5 text-foreground" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              )}
            </button>
          )}
          {onSettings && (
            <button 
              onClick={onSettings}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-foreground" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
