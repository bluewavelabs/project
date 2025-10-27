import { useState } from 'react';
import { Send, CreditCard, ShieldCheck } from 'lucide-react';
import { Header } from '../whaledone/Header';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from '../ui/alert-dialog';

interface ThankYouReplyProps {
  onNavigate: (screen: string) => void;
  messageId?: string;
  t: any;
}

export function ThankYouReply({ onNavigate, messageId, t }: ThankYouReplyProps) {
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const maxChars = 300;
  const hasError = message.length > maxChars;
  const paymentAmount = 300;

  const handleSend = () => {
    if (message.trim().length === 0 || hasError) return;
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onNavigate('inbox');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title={t.thank.title}
        showBack
        onBack={() => onNavigate('inbox')}
      />
      
      <div className="p-4 space-y-4">
        {/* Info Card */}
        <Card className="p-4 bg-accent/30">
          <p className="text-sm text-foreground">
            {t.thank.infoMessage}
          </p>
        </Card>

        {/* Text Area */}
        <div className="space-y-2">
          <label className="text-foreground">{t.thank.yourMessage}</label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.thank.placeholder}
            className={`min-h-[200px] rounded-xl resize-none ${
              hasError ? 'border-destructive focus:border-destructive' : ''
            }`}
          />
          <div className="flex items-center justify-between text-sm">
            <span className={hasError ? 'text-destructive' : 'text-muted-foreground'}>
              {message.length} / {maxChars}
            </span>
            {hasError && (
              <span className="text-destructive">{t.thank.charLimit}</span>
            )}
          </div>
        </div>

        {/* Payment Card */}
        <Card className="p-4 border-2 border-primary/20">
          <div className="flex items-start gap-3">
            <CreditCard className="w-6 h-6 text-primary mt-1" />
            <div className="flex-1">
              <h3 className="text-foreground mb-1">{t.thank.paymentRequired}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t.thank.paymentMessage}{paymentAmount}{t.thank.paymentMessageEnd}
              </p>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-foreground">{t.thank.amount}</span>
                <span className="text-primary">₩{paymentAmount}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Anonymous Badge */}
        <div className="flex items-center gap-2 p-4 bg-accent/30 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <p className="text-sm text-foreground">
            {t.thank.anonymous}
          </p>
        </div>

        {/* Send Button */}
        <Button 
          onClick={handleSend}
          disabled={message.trim().length === 0 || hasError}
          className="w-full h-12 rounded-xl bg-primary hover:bg-[#2563EB] text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5 mr-2" />
          {t.thank.sendButton}
        </Button>

        {/* How it works */}
        <Card className="p-4">
          <h4 className="text-foreground mb-2">{t.thank.howItWorks}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">1.</span>
              <span>{t.thank.step1}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">2.</span>
              <span>{t.thank.step2}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">3.</span>
              <span>{t.thank.step3}</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="max-w-[340px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.thank.successTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.thank.successMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
