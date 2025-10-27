import { User, Bell, CreditCard, FileText, Shield, LogOut, ChevronRight, Languages } from 'lucide-react';
import { Header } from '../whaledone/Header';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Language } from '../../utils/translations';

interface SettingsProps {
  onNavigate: (screen: string) => void;
  t: any;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Settings({ onNavigate, t, language, onLanguageChange }: SettingsProps) {
  const userProfile = {
    name: 'Alex Johnson',
    department: 'Product Design',
    career: '3 years experience',
    avatar: '👤',
  };

  const paymentInfo = {
    points: 1200,
    subscriptionStatus: t.settings.freePlan,
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title={t.settings.title}
        showBack
        onBack={() => onNavigate('home')}
      />
      
      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <Card className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
              {userProfile.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-foreground mb-1">{userProfile.name}</h3>
              <p className="text-sm text-muted-foreground">{userProfile.department}</p>
              <p className="text-sm text-muted-foreground">{userProfile.career}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => alert('Edit profile feature coming soon!')}
            >
              {t.settings.edit}
            </Button>
          </div>
        </Card>

        {/* Language Settings */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Languages className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">{t.settings.language}</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.settings.selectLanguage}</p>
              <Select value={language} onValueChange={(value) => onLanguageChange(value as Language)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ko">{t.settings.korean}</SelectItem>
                  <SelectItem value="en">{t.settings.english}</SelectItem>
                  <SelectItem value="zh">{t.settings.chinese}</SelectItem>
                  <SelectItem value="ja">{t.settings.japanese}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">{t.settings.notifications}</h3>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground">{t.settings.notificationToggle}</p>
              <p className="text-sm text-muted-foreground">{t.settings.notificationDesc}</p>
            </div>
            <Switch defaultChecked />
          </div>
        </Card>

        {/* Payment Info */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">{t.settings.payment}</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">{t.settings.pointBalance}</p>
                <p className="text-foreground">{paymentInfo.points} {t.inbox.points}</p>
              </div>
              <Button 
                size="sm"
                onClick={() => alert('Recharge feature coming soon!')}
              >
                {t.settings.recharge}
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">{t.settings.currentPlan}</p>
                <p className="text-foreground">{paymentInfo.subscriptionStatus}</p>
              </div>
              <Button 
                size="sm"
                variant="outline"
                onClick={() => alert('Upgrade feature coming soon!')}
              >
                {t.settings.upgrade}
              </Button>
            </div>
            
            <button 
              className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => alert('Payment history feature coming soon!')}
            >
              <span className="text-foreground">{t.settings.paymentHistory}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </Card>

        {/* Legal & Privacy */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">{t.settings.legalPrivacy}</h3>
          </div>
          
          <div className="space-y-2">
            <button 
              className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => alert('Terms of Service will open here')}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{t.settings.terms}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <button 
              className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => alert('Privacy Policy will open here')}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{t.settings.privacy}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <button 
              className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => alert('About will open here')}
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{t.settings.about}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </Card>

        {/* Account Actions */}
        <Card className="p-4">
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigate('login')}
            >
              <LogOut className="w-5 h-5 mr-2" />
              {t.settings.logout}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={() => alert('Delete account feature coming soon!')}
            >
              <User className="w-5 h-5 mr-2" />
              {t.settings.deleteAccount}
            </Button>
          </div>
        </Card>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">{t.settings.version}</p>
        </div>
      </div>
    </div>
  );
}