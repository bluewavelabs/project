import { useState, useEffect } from 'react';
import { BottomNav } from './components/whaledone/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { ContactSelection } from './components/screens/ContactSelection';
import { WriteMessage } from './components/screens/WriteMessage';
import { Inbox } from './components/screens/Inbox';
import { SentCompliments } from './components/screens/SentCompliments';
import { InsightStats } from './components/screens/InsightStats';
import { ThankYouReply } from './components/screens/ThankYouReply';
import { Settings } from './components/screens/Settings';
import { Notifications } from './components/screens/Notifications';
import { Login } from './components/screens/Login';
import { SignUp } from './components/screens/SignUp';
import { Language, getTranslation } from './utils/translations';

type ScreenType = 'login' | 'signup' | 'home' | 'send' | 'write' | 'inbox' | 'sent' | 'thank' | 'stats' | 'settings' | 'notifications';

interface NavigationData {
  selectedContacts?: any;
  preselectedContact?: any;
  messageId?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [navigationData, setNavigationData] = useState<NavigationData>({});
  
  // ⭐️ 수정 1: useState 초기값을 서버에서 안전한 기본값('ko')으로 설정합니다.
  const [language, setLanguage] = useState<Language>('ko');

  const t = getTranslation(language);

  // ⭐️ 수정 2: 브라우저가 로드된 후에만 localStorage에서 언어 설정을 읽어옵니다.
  useEffect(() => {
    // typeof window !== 'undefined'로 브라우저 환경인지 확인합니다.
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('whaledone_language');
        if (saved) {
            setLanguage(saved as Language);
        }
    }
  }, []); // 빈 배열은 마운트(클라이언트 렌더링) 시 단 한 번 실행을 의미합니다.


  // ⭐️ 수정 3: 언어가 변경될 때 localStorage에 저장하는 로직도 안전하게 수정합니다.
  useEffect(() => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('whaledone_language', language);
    }
  }, [language]);


  const handleNavigate = (screen: string, data?: any) => {
    setCurrentScreen(screen as ScreenType);
    if (data) {
      setNavigationData(data);
    } else {
      setNavigationData({});
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <Login onNavigate={handleNavigate} t={t} />;
      case 'signup':
        return <SignUp onNavigate={handleNavigate} t={t} />;
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} t={t} />;
      case 'send':
        return (
          <ContactSelection 
            onNavigate={handleNavigate} 
            preselectedContact={navigationData.preselectedContact}
            t={t}
          />
        );
      case 'write':
        return (
          <WriteMessage 
            onNavigate={handleNavigate} 
            selectedContacts={navigationData.selectedContacts}
            t={t}
          />
        );
      case 'inbox':
        return <Inbox onNavigate={handleNavigate} t={t} />;
      case 'sent':
        return <SentCompliments onNavigate={handleNavigate} t={t} />;
      case 'notifications':
        return <Notifications onNavigate={handleNavigate} t={t} />;
      case 'thank':
        return (
          <ThankYouReply 
            onNavigate={handleNavigate} 
            messageId={navigationData.messageId}
            t={t}
          />
        );
      case 'stats':
        return <InsightStats onNavigate={handleNavigate} t={t} />;
      case 'settings':
        return (
          <Settings 
            onNavigate={handleNavigate} 
            t={t}
            language={language}
            onLanguageChange={setLanguage}
          />
        );
      default:
        return <HomeScreen onNavigate={handleNavigate} t={t} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container - 375px max width */}
      <div className="max-w-[375px] mx-auto relative bg-background min-h-screen shadow-xl">
        {renderScreen()}
        {currentScreen !== 'login' && currentScreen !== 'signup' && (
          <BottomNav activeScreen={currentScreen} onNavigate={handleNavigate} t={t} />
        )}
      </div>
    </div>
  );
}
