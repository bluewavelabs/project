import { useState } from 'react';
import { Send, Lightbulb, ShieldCheck, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Header } from '../whaledone/Header';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '../ui/alert-dialog';

interface Contact {
  id: string;
  name: string;
  role?: string;
  company?: string;
  group?: string;
}

interface WriteMessageProps {
  onNavigate: (screen: string, data?: any) => void;
  selectedContacts?: Contact[];
  t: any;
}

export function WriteMessage({ onNavigate, selectedContacts = [], t }: WriteMessageProps) {
  const [message, setMessage] = useState('');
  const [showExamples, setShowExamples] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showProfanityError, setShowProfanityError] = useState(false);
  const [showAllRecipients, setShowAllRecipients] = useState(false);

  const maxChars = 300;
  const hasError = message.length > maxChars;

  const handleSend = () => {
    if (message.trim().length === 0 || hasError) return;
    
    // Simple profanity check (mock)
    const profanityWords = ['bad', 'worse']; // Mock list
    const hasProfanity = profanityWords.some(word => 
      message.toLowerCase().includes(word)
    );
    
    if (hasProfanity) {
      setShowProfanityError(true);
      return;
    }
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onNavigate('home');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title={t.write.title}
        showBack
        onBack={() => onNavigate('send')}
      />
      
      <div className="p-4 space-y-4">
        {/* Selected Contacts Preview */}
        {selectedContacts.length > 0 && (
          <div className="p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">{t.write.sendingTo}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllRecipients(!showAllRecipients)}
                className="h-auto p-0 text-primary hover:text-primary/80"
              >
                {showAllRecipients ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    {t.write.hideAll}
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    {t.write.showAll}
                  </>
                )}
              </Button>
            </div>
            
            {showAllRecipients ? (
              <div className="flex flex-wrap gap-2">
                {selectedContacts.map(contact => (
                  <Badge 
                    key={contact.id} 
                    variant="secondary"
                    className="px-3 py-1.5 rounded-full text-sm"
                  >
                    {contact.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-foreground">
                {selectedContacts.length} {selectedContacts.length > 1 ? t.write.contacts : t.write.contact}
              </p>
            )}
          </div>
        )}

        {/* Text Area */}
        <div className="space-y-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.write.placeholder}
            className={`min-h-[200px] rounded-xl resize-none ${
              hasError ? 'border-destructive focus:border-destructive' : ''
            }`}
          />
          <div className="flex items-center justify-between text-sm">
            <span className={hasError ? 'text-destructive' : 'text-muted-foreground'}>
              {message.length} / {maxChars}
            </span>
            {hasError && (
              <span className="text-destructive">{t.write.charLimit}</span>
            )}
          </div>
        </div>

        {/* Show Examples Button */}
        <Button 
          onClick={() => setShowExamples(true)}
          variant="outline"
          className="w-full h-12 rounded-xl"
        >
          <Lightbulb className="w-5 h-5 mr-2" />
          {t.write.showExamples}
        </Button>

        {/* Anonymous Badge */}
        <div className="flex items-center gap-2 p-4 bg-accent/30 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <p className="text-sm text-foreground">{t.write.anonymous}</p>
        </div>

        {/* Send Button */}
        <Button 
          onClick={handleSend}
          disabled={message.trim().length === 0 || hasError}
          className="w-full h-12 rounded-xl bg-primary hover:bg-[#2563EB] text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5 mr-2" />
          {t.write.sendButton}
        </Button>
      </div>

      {/* Examples Dialog */}
      <Dialog open={showExamples} onOpenChange={setShowExamples}>
        <DialogContent className="max-w-[340px]">
          <DialogHeader>
            <DialogTitle>{t.write.examplesTitle}</DialogTitle>
            <DialogDescription>
              {t.write.examplesDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {t.examples.map((example: string, index: number) => (
              <div 
                key={index}
                onClick={() => {
                  setMessage(example);
                  setShowExamples(false);
                }}
                className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
              >
                <p className="text-sm text-foreground">{example}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="max-w-[340px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.write.successTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.write.successMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      {/* Profanity Error Dialog */}
      <AlertDialog open={showProfanityError} onOpenChange={setShowProfanityError}>
        <AlertDialogContent className="max-w-[340px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.write.errorTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.write.errorMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowProfanityError(false)}>
              {t.contact.gotIt}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
