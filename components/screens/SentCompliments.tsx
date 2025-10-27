import { useState } from 'react';
import { Lock, Unlock, Coins, Send as SendIcon, MessageCircle, ChevronRight } from 'lucide-react';
import { Header } from '../whaledone/Header';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '../ui/alert-dialog';

interface Reply {
  id: string;
  content: string;
  date: string;
  locked: boolean;
}

interface SentMessage {
  id: string;
  content: string;
  recipientName: string;
  date: string;
  replies: Reply[];
}

interface SentComplimentsProps {
  onNavigate: (screen: string, data?: any) => void;
  t: any;
}

export function SentCompliments({ onNavigate, t }: SentComplimentsProps) {
  const [points, setPoints] = useState(1200);
  const [selectedMessage, setSelectedMessage] = useState<SentMessage | null>(null);
  const [selectedReply, setSelectedReply] = useState<Reply | null>(null);
  const [showUnlockDialog, setShowUnlockDialog] = useState(false);
  const [showInsufficientPoints, setShowInsufficientPoints] = useState(false);
  const [replyToUnlock, setReplyToUnlock] = useState<Reply | null>(null);
  
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([
    {
      id: '1',
      content: '항상 팀 미팅에서 긍정적인 에너지를 전달해주셔서 감사해요!',
      recipientName: 'Sarah Kim',
      date: '2일 전',
      replies: [
        { id: 'r1', content: '정말 감사합니다! 이런 말씀 들으니 힘이 나네요.', date: '1일 전', locked: true },
      ],
    },
    {
      id: '2',
      content: '어제 프로젝트 도와주셔서 감사합니다. 전문성 덕분에 큰 도움이 되었어요.',
      recipientName: 'Mike Chen',
      date: '5일 전',
      replies: [
        { id: 'r2', content: '천만에요! 함께 작업할 수 있어서 저도 좋았습니다.', date: '4일 전', locked: false },
        { id: 'r3', content: '앞으로도 잘 부탁드립니다!', date: '4일 전', locked: true },
      ],
    },
    {
      id: '3',
      content: '브레인스토밍 세션에서의 창의적인 아이디어는 항상 영감을 줍니다!',
      recipientName: 'Emily Park',
      date: '1주일 전',
      replies: [],
    },
    {
      id: '4',
      content: '명확하게 설명하는 데 시간을 할애해주셔서 정말 감사해요.',
      recipientName: 'John Doe',
      date: '2주일 전',
      replies: [
        { id: 'r4', content: '도움이 되었다니 기쁩니다!', date: '1주일 전', locked: true },
      ],
    },
  ]);

  const unlockCost = 100;

  const handleReplyClick = (reply: Reply, message: SentMessage) => {
    if (reply.locked) {
      if (points >= unlockCost) {
        setReplyToUnlock(reply);
        setSelectedMessage(message);
        setShowUnlockDialog(true);
      } else {
        setShowInsufficientPoints(true);
      }
    } else {
      setSelectedReply(reply);
    }
  };

  const handleUnlock = () => {
    if (replyToUnlock && selectedMessage) {
      setPoints(prev => prev - unlockCost);
      setSentMessages(prev => prev.map(msg => {
        if (msg.id === selectedMessage.id) {
          return {
            ...msg,
            replies: msg.replies.map(r => 
              r.id === replyToUnlock.id ? { ...r, locked: false } : r
            ),
          };
        }
        return msg;
      }));
      setSelectedReply(replyToUnlock);
      setReplyToUnlock(null);
      setSelectedMessage(null);
    }
    setShowUnlockDialog(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title={t.sent.title}
        showBack
        onBack={() => onNavigate('home')}
      />
      
      <div className="p-4 space-y-4">
        {/* Send New Compliment Button */}
        <Button
          onClick={() => onNavigate('send')}
          className="w-full h-12 rounded-xl bg-primary hover:bg-[#2563EB] text-primary-foreground"
        >
          <SendIcon className="w-5 h-5 mr-2" />
          {t.sent.sendNewCompliment}
        </Button>

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

        {/* Summary */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t.sent.totalSent}</p>
              <p className="text-2xl text-foreground">{sentMessages.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">{t.sent.totalReplies}</p>
              <p className="text-2xl text-foreground">
                {sentMessages.reduce((acc, msg) => acc + msg.replies.length, 0)}
              </p>
            </div>
          </div>
        </Card>

        {/* Sent Messages List */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {t.sent.sentCompliments}
          </p>

          {sentMessages.map(message => (
            <Card key={message.id} className="p-4">
              <div className="space-y-3">
                {/* Message Info */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-primary">{t.sent.to} {message.recipientName}</p>
                    <p className="text-xs text-muted-foreground">{message.date}</p>
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">{message.content}</p>
                </div>

                {/* Replies Section */}
                {message.replies.length > 0 && (
                  <div className="pt-3 border-t border-border space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        {message.replies.length} {message.replies.length > 1 ? t.sent.replies : t.sent.reply}
                      </p>
                    </div>
                    {message.replies.map(reply => (
                      <div
                        key={reply.id}
                        onClick={() => handleReplyClick(reply, message)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          reply.locked 
                            ? 'bg-muted/50 border border-dashed border-muted-foreground/30 hover:border-primary/50' 
                            : 'bg-accent/20 hover:bg-accent/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {reply.locked ? (
                                <Lock className="w-3 h-3 text-muted-foreground" />
                              ) : (
                                <Unlock className="w-3 h-3 text-primary" />
                              )}
                              <p className="text-xs text-muted-foreground">{reply.date}</p>
                            </div>
                            <p className="text-sm text-foreground">
                              {reply.locked ? t.sent.lockedReply : reply.content}
                            </p>
                            {reply.locked && (
                              <p className="text-xs text-primary mt-1">
                                {unlockCost} {t.inbox.unlockCost}
                              </p>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {message.replies.length === 0 && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center py-2">
                      {t.sent.noRepliesYet}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Unlock Reply Dialog */}
      <AlertDialog open={showUnlockDialog} onOpenChange={setShowUnlockDialog}>
        <AlertDialogContent className="max-w-[340px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.sent.unlockReplyTitle}</AlertDialogTitle>
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

      {/* Reply View Dialog */}
      <Dialog open={selectedReply !== null} onOpenChange={() => setSelectedReply(null)}>
        <DialogContent className="max-w-[340px]">
          <DialogHeader>
            <DialogTitle>{t.sent.replyFromRecipient}</DialogTitle>
            <DialogDescription>
              {selectedReply?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-foreground leading-relaxed">{selectedReply?.content}</p>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setSelectedReply(null)}
              variant="outline"
              className="w-full rounded-xl"
            >
              {t.common.close}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
