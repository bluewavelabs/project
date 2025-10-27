import { useState } from 'react';
import { Bell, Heart, Users, TrendingUp, MessageCircle, Gift } from 'lucide-react';
import { Header } from '../whaledone/Header';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface Notification {
  id: string;
  type: 'compliment' | 'thank_you' | 'milestone' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
  iconColor: string;
}

interface NotificationsProps {
  onNavigate: (screen: string, data?: any) => void;
  t: any;
}

export function Notifications({ onNavigate, t }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'compliment',
      title: t.notifications.newCompliment,
      message: t.notifications.receivedCompliment,
      time: '5분 전',
      read: false,
      icon: Heart,
      iconColor: 'text-primary',
    },
    {
      id: '2',
      type: 'compliment',
      title: t.notifications.newCompliment,
      message: t.notifications.receivedCompliment,
      time: '2시간 전',
      read: false,
      icon: Heart,
      iconColor: 'text-primary',
    },
    {
      id: '3',
      type: 'thank_you',
      title: t.notifications.thankYouReceived,
      message: t.notifications.someoneThankYou,
      time: '5시간 전',
      read: false,
      icon: Gift,
      iconColor: 'text-accent-foreground',
    },
    {
      id: '4',
      type: 'milestone',
      title: t.notifications.milestone,
      message: t.notifications.reached10Compliments,
      time: '1일 전',
      read: true,
      icon: TrendingUp,
      iconColor: 'text-green-500',
    },
    {
      id: '5',
      type: 'compliment',
      title: t.notifications.newCompliment,
      message: t.notifications.receivedCompliment,
      time: '2일 전',
      read: true,
      icon: Heart,
      iconColor: 'text-primary',
    },
    {
      id: '6',
      type: 'system',
      title: t.notifications.pointsAdded,
      message: t.notifications.receivedPoints,
      time: '3일 전',
      read: true,
      icon: MessageCircle,
      iconColor: 'text-blue-500',
    },
  ]);

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => prev.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    ));

    // Navigate based on notification type
    if (notification.type === 'compliment') {
      onNavigate('inbox');
    } else if (notification.type === 'thank_you') {
      onNavigate('inbox');
    } else if (notification.type === 'milestone') {
      onNavigate('stats');
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title={t.notifications.title}
        showBack
        onBack={() => onNavigate('home')}
      />
      
      <div className="p-4 space-y-4">
        {/* Header with Mark All as Read */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground">
              {unreadCount > 0 ? (
                <>
                  {t.notifications.unreadNotifications.replace('{count}', unreadCount.toString())}
                </>
              ) : (
                t.notifications.allCaughtUp
              )}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleMarkAllAsRead}
            >
              {t.notifications.markAllRead}
            </Button>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <Card className="p-8 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground mb-1">{t.notifications.noNotifications}</p>
            <p className="text-sm text-muted-foreground">{t.notifications.noNotificationsDesc}</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {notifications.map(notification => {
              const Icon = notification.icon;
              return (
                <Card
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 cursor-pointer hover:shadow-md transition-all ${
                    notification.read ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${
                      !notification.read ? 'ring-2 ring-primary ring-offset-2' : ''
                    }`}>
                      <Icon className={`w-5 h-5 ${notification.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-foreground">{notification.title}</p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
