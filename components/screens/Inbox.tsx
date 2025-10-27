import { useState } from 'react';
import { Lock, Unlock, Coins, Heart, MessageCircle, TrendingUp, Star, Smile } from 'lucide-react';
import { Header } from '../whaledone/Header';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '../ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface MessageStats {
  sentiment: 'positive' | 'very_positive';
  keywords: string[];
  length: number;
  category: string;
}

interface Message {
  id: string;
  preview: string;
  content: string;
  date: string;
  locked: boolean;
  read: boolean;
  stats: MessageStats;
  hasReplied: boolean;
}

interface InboxProps {
  onNavigate: (screen: string, data?: any) => void;
  t: any;
}

export function Inbox({ onNavigate, t }: InboxProps) {
  const [points, setPoints] = useState(1200);
  const [activeTab, setActiveTab] = useState('new');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      preview: '항상 긍정적인 에너지...', 
      content: '항상 팀 미팅에서 긍정적인 에너지를 전달해주셔서 감사해요!', 
      date: '2일 전', 
      locked: false, 
      read: false,
      stats: {
        sentiment: 'very_positive',
        keywords: ['긍정적', '에너지', '팀워크'],
        length: 28,
        category: '협업'
      },
      hasReplied: false
    },
    { 
      id: '2', 
      preview: '정말 감사합니다...', 
      content: '어제 프로젝트 도와주셔서 감사합니다. 전문성 덕분에 큰 도움이 되었어요.', 
      date: '5일 전', 
      locked: false, 
      read: false,
      stats: {
        sentiment: 'positive',
        keywords: ['전문성', '도움', '프로젝트'],
        length: 35,
        category: '업무'
      },
      hasReplied: false
    },
    { 
      id: '3', 
      preview: '문제 해결 방식이...', 
      content: '문제 해결 방식이 정말 우아합니다. 계속 멋진 모습 보여주세요!', 
      date: '1주일 전', 
      locked: false, 
      read: false,
      stats: {
        sentiment: 'very_positive',
        keywords: ['문제 해결', '우아함', '전문성'],
        length: 32,
        category: '업무'
      },
      hasReplied: true
    },
    { 
      id: '4', 
      preview: '누군가가 메시지를...', 
      content: '창의적인 솔루션은 항상 프로젝트에 새로운 관점을 제공합니다. 훌륭한 일입니다!', 
      date: '2주일 전', 
      locked: true, 
      read: false,
      stats: {
        sentiment: 'very_positive',
        keywords: ['창의성', '솔루션', '프로젝트'],
        length: 42,
        category: '업무'
      },
      hasReplied: false
    },
    { 
      id: '5', 
      preview: '새로운 메시지가...', 
      content: '세심한 디테일이 큰 차이를 만듭니다. 헌신에 감사드립니다!', 
      date: '3주일 전', 
      locked: true, 
      read: false,
      stats: {
        sentiment: 'positive',
        keywords: ['디테일', '헌신', '감사'],
        length: 30,
        category: '업무'
      },
      hasReplied: false
    },
  ]);
  
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showUnlockDialog, setShowUnlockDialog] = useState(false);
  const [showInsufficientPoints, setShowInsufficientPoints] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [messageToUnlock, setMessageToUnlock] = useState<Message | null>(null);

  const unlockCost = 100;
  
  const unreadMessages = messages.filter(m => !m.read);
  const allMessages = messages;

  const handleMessageClick = (message: Message) => {
    if (message.locked) {
      if (points >= unlockCost) {
        setMessageToUnlock(message);
        setShowUnlockDialog(true);
      } else {
        setShowInsufficientPoints(true);
      }
    } else {
      setSelectedMessage(message);
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      ));
    }
  };

  const handleUnlock = () => {
    if (messageToUnlock) {
      setPoints(prev => prev - unlockCost);
      setMessages(prev => prev.map(m => 
        m.id === messageToUnlock.id ? { ...m, locked: false, read: true } : m
      ));
      setSelectedMessage({ ...messageToUnlock, locked: false });
      setMessageToUnlock(null);
    }
    setShowUnlockDialog(false);
  };

  const handleSendReply = () => {
    if (replyMessage.trim() && selectedMessage) {
      // Mark as replied
      setMessages(prev => prev.map(m => 
        m.id === selectedMessage.id ? { ...m, hasReplied: true } : m
      ));
      setReplyMessage('');
      setShowReplyDialog(false);
      setSelectedMessage(null);
      // Show success message
      alert(t.inbox.replySent || '답장이 전송되었습니다!');
    }
  };

  const renderMessageCard = (message: Message) => (
    <Card
      key={message.id}
      onClick={() => handleMessageClick(message)}
      className={`p-4 cursor-pointer hover:shadow-md transition-all ${
        message.read ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {message.locked ? (
              <Lock className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Unlock className="w-4 h-4 text-primary" />
            )}
            <p className="text-sm text-muted-foreground">{message.date}</p>
            {message.hasReplied && !message.locked && (
              <Badge variant="secondary" className="text-xs">
                {t.inbox.replied}
              </Badge>
            )}
          </div>
          
          {message.locked ? (
            <>
              {/* Show stats preview for locked messages */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{t.inbox.lockedMessagePreview}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {message.stats.sentiment === 'very_positive' ? t.inbox.veryPositive : t.inbox.positive}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    {message.stats.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {message.stats.length} {t.inbox.characters}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {message.stats.keywords.slice(0, 3).map((keyword, idx) => (
                    <span key={idx} className="text-xs bg-accent/30 px-2 py-1 rounded">
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-primary mt-3">{unlockCost} {t.inbox.unlockCost}</p>
            </>
          ) : (
            <p className="text-foreground leading-relaxed">{message.content}</p>
          )}
        </div>
        {!message.read && (
          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
        )}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title={t.inbox.title}
        showBack
        onBack={() => onNavigate('home')}
      />
      
      <div className="p-4 space-y-4">
        {/* Points Balance */}
        <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">{t.inbox.pointBalance}</p>
                <p className="text-foreground">{points} {t.inbox.points}</p>
              </div>
            </div>
            <Button 
              onClick={() => alert('Recharge feature coming soon!')}
              size="sm"
              className="bg-primary hover:bg-[#2563EB] text-primary-foreground rounded-lg"
            >
              {t.inbox.recharge}
            </Button>
          </div>
        </Card>

        {/* Tabs for New Messages and All Compliments */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">{t.inbox.newMessages}</TabsTrigger>
            <TabsTrigger value="all">{t.inbox.allCompliments}</TabsTrigger>
          </TabsList>
          
          {/* New Messages Tab */}
          <TabsContent value="new" className="space-y-3 mt-4">
            <p className="text-sm text-muted-foreground">
              {unreadMessages.length} {t.inbox.unreadMessages}
            </p>
            
            {unreadMessages.length === 0 ? (
              <Card className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-foreground mb-2">{t.inbox.noNewCompliments}</p>
                <p className="text-sm text-muted-foreground mb-4">{t.inbox.noNewComplimentsDesc}</p>
                <Button 
                  onClick={() => setActiveTab('all')}
                  variant="outline"
                  className="mx-auto"
                >
                  {t.inbox.viewAll}
                </Button>
              </Card>
            ) : (
              unreadMessages.map(renderMessageCard)
            )}
          </TabsContent>
          
          {/* All Compliments Tab */}
          <TabsContent value="all" className="space-y-3 mt-4">
            <p className="text-sm text-muted-foreground">
              {allMessages.length} {t.inbox.totalComplimentsReceived}
            </p>
            
            {allMessages.map(renderMessageCard)}
          </TabsContent>
        </Tabs>
      </div>

      {/* Unlock Confirmation Dialog */}
      <AlertDialog open={showUnlockDialog} onOpenChange={setShowUnlockDialog}>
        <AlertDialogContent className="max-w-[340px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.inbox.unlockTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.inbox.unlockMessagePart1} {unlockCost} {t.inbox.unlockMessagePart2} {points} {t.inbox.points}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.inbox.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleUnlock}>
              {t.inbox.unlock}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Insufficient Points Dialog */}
      <AlertDialog open={showInsufficientPoints} onOpenChange={setShowInsufficientPoints}>
        <AlertDialogContent className="max-w-[340px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.inbox.insufficientTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.inbox.insufficientMessagePart1} {unlockCost} {t.inbox.insufficientMessagePart2 || t.inbox.points}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.inbox.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowInsufficientPoints(false);
              alert('Recharge feature coming soon!');
            }}>
              {t.inbox.recharge}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Message View Dialog */}
      <Dialog open={selectedMessage !== null && !showReplyDialog} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-[340px]">
          <DialogHeader>
            <DialogTitle>{t.inbox.anonymousCompliment}</DialogTitle>
            <DialogDescription>
              {selectedMessage?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-foreground leading-relaxed">{selectedMessage?.content}</p>
          </div>
          <DialogFooter className="flex-col gap-2">
            <Button 
              onClick={() => setShowReplyDialog(true)}
              className="w-full bg-primary hover:bg-[#2563EB] text-primary-foreground rounded-xl"
            >
              <Heart className="w-4 h-4 mr-2" />
              {t.inbox.sendThankYou}
            </Button>
            <Button
              onClick={() => setSelectedMessage(null)}
              variant="outline"
              className="w-full rounded-xl"
            >
              {t.common.close}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-[340px]">
          <DialogHeader>
            <DialogTitle>{t.inbox.replyTitle}</DialogTitle>
            <DialogDescription>
              {t.inbox.replyDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.inbox.originalMessage}</p>
              <p className="text-sm text-foreground">{selectedMessage?.content}</p>
            </div>
            <Textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder={t.inbox.replyPlaceholder}
              className="min-h-[120px] rounded-xl resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {t.inbox.replyNote}
            </p>
          </div>
          <DialogFooter className="flex-col gap-2">
            <Button 
              onClick={handleSendReply}
              disabled={!replyMessage.trim()}
              className="w-full bg-primary hover:bg-[#2563EB] text-primary-foreground rounded-xl"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {t.inbox.sendReply}
            </Button>
            <Button
              onClick={() => {
                setShowReplyDialog(false);
                setReplyMessage('');
              }}
              variant="outline"
              className="w-full rounded-xl"
            >
              {t.common.cancel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
