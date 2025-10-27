import { useState, useEffect } from 'react';
import { Search, UserPlus, Check, X } from 'lucide-react';
import { Header } from '../whaledone/Header';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '../ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  registered: boolean;
  phone?: string;
  group?: string;
}

interface ContactSelectionProps {
  onNavigate: (screen: string, data?: any) => void;
  preselectedContact?: any;
  t: any;
}

export function ContactSelection({ onNavigate, preselectedContact, t }: ContactSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showFirstVisitPopup, setShowFirstVisitPopup] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Sarah Kim', role: 'Product Designer', company: 'Design Co', avatar: '👩‍💼', registered: true },
    { id: '2', name: 'Mike Chen', role: 'Developer', company: 'Tech Inc', avatar: '👨‍💻', registered: true },
    { id: '3', name: 'Emily Park', role: 'Marketing Manager', company: 'Brand Co', avatar: '👩‍💼', registered: true },
    { id: '4', name: 'John Doe', role: 'Sales Director', company: 'Sales Corp', avatar: '👨‍💼', registered: true },
    { id: '5', name: 'Lisa Wang', role: 'HR Manager', company: 'People Co', avatar: '👩', registered: false },
    { id: '6', name: 'Tom Brown', role: 'Engineer', company: 'Build Inc', avatar: '👨‍🔧', registered: false },
  ]);

  // Add contact form state
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactGroup, setNewContactGroup] = useState('');

  useEffect(() => {
    const hasVisited = localStorage.getItem('whaledone_visited');
    if (!hasVisited) {
      setShowFirstVisitPopup(true);
      localStorage.setItem('whaledone_visited', 'true');
    }
    
    if (preselectedContact) {
      const contact = contacts.find(c => c.name === preselectedContact.name);
      if (contact) {
        setSelectedContacts([contact.id]);
      }
    }
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.group && contact.group.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const registeredContacts = filteredContacts.filter(c => c.registered);
  const unregisteredContacts = filteredContacts.filter(c => !c.registered);

  const toggleContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleAddContact = () => {
    if (!newContactName.trim()) return;

    const newContact: Contact = {
      id: `new-${Date.now()}`,
      name: newContactName.trim(),
      role: '',
      company: newContactGroup || 'Unknown',
      avatar: '👤',
      registered: Math.random() > 0.5, // Randomly assign if registered for demo
      phone: newContactPhone.trim(),
      group: newContactGroup,
    };

    setContacts(prev => [...prev, newContact]);
    setSelectedContacts(prev => [...prev, newContact.id]);
    
    // Reset form
    setNewContactName('');
    setNewContactPhone('');
    setNewContactGroup('');
    setShowAddDialog(false);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header 
        title={t.contact.title}
        showBack
        onBack={() => onNavigate('home')}
      />
      
      <div className="p-4 space-y-4">
        {/* Add Manually Button - Moved to top */}
        <Button 
          onClick={() => setShowAddDialog(true)}
          variant="outline" 
          className="w-full h-12 rounded-xl border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          {t.contact.addManually}
        </Button>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t.contact.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl bg-input-background border-border"
          />
        </div>

        {/* Contact List */}
        <div className="space-y-4">
          {/* Registered Users */}
          {registeredContacts.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.contact.registeredUsers}</p>
              <div className="space-y-2">
                {registeredContacts.map(contact => (
                  <div
                    key={contact.id}
                    onClick={() => toggleContact(contact.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedContacts.includes(contact.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                        {contact.avatar}
                      </div>
                      <div>
                        <p className="text-foreground">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {contact.role || contact.group || contact.company}
                          {contact.company && contact.role && ` · ${contact.company}`}
                        </p>
                      </div>
                    </div>
                    {selectedContacts.includes(contact.id) && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Unregistered Contacts - Now selectable */}
          {unregisteredContacts.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.contact.notRegistered}</p>
              <div className="space-y-2">
                {unregisteredContacts.map(contact => (
                  <div
                    key={contact.id}
                    onClick={() => toggleContact(contact.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedContacts.includes(contact.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                        {contact.avatar}
                      </div>
                      <div>
                        <p className="text-foreground">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {contact.role || contact.group || contact.company}
                          {contact.company && contact.role && ` · ${contact.company}`}
                        </p>
                      </div>
                    </div>
                    {selectedContacts.includes(contact.id) && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Next Button */}
      <div className="fixed bottom-16 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent p-4 pb-2">
        <div className="max-w-[375px] mx-auto">
          <Button 
            onClick={() => {
              const selected = contacts.filter(c => selectedContacts.includes(c.id));
              onNavigate('write', { selectedContacts: selected });
            }}
            disabled={selectedContacts.length === 0}
            className="w-full h-12 rounded-xl bg-primary hover:bg-[#2563EB] text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.contact.next} ({selectedContacts.length} {t.contact.selected})
          </Button>
        </div>
      </div>

      {/* Add Contact Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-[340px]">
          <DialogHeader>
            <DialogTitle>{t.contact.addManually}</DialogTitle>
            <DialogDescription>
              {t.contact.addContactDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.contact.nameLabel}</Label>
              <Input
                id="name"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                placeholder={t.contact.namePlaceholder}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t.contact.phoneLabel}</Label>
              <Input
                id="phone"
                type="tel"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                placeholder={t.contact.phonePlaceholder}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group">{t.contact.groupLabel}</Label>
              <Select value={newContactGroup} onValueChange={setNewContactGroup}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder={t.contact.groupPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">{t.contact.groupMarketing}</SelectItem>
                  <SelectItem value="engineering">{t.contact.groupEngineering}</SelectItem>
                  <SelectItem value="sales">{t.contact.groupSales}</SelectItem>
                  <SelectItem value="hr">{t.contact.groupHR}</SelectItem>
                  <SelectItem value="design">{t.contact.groupDesign}</SelectItem>
                  <SelectItem value="finance">{t.contact.groupFinance}</SelectItem>
                  <SelectItem value="soccer">{t.contact.groupSoccer}</SelectItem>
                  <SelectItem value="book">{t.contact.groupBook}</SelectItem>
                  <SelectItem value="running">{t.contact.groupRunning}</SelectItem>
                  <SelectItem value="other">{t.contact.groupOther}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              {t.contact.cancel}
            </Button>
            <Button 
              onClick={handleAddContact}
              disabled={!newContactName.trim()}
              className="bg-primary hover:bg-[#2563EB] text-primary-foreground"
            >
              {t.contact.add}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* First Visit Popup */}
      <AlertDialog open={showFirstVisitPopup} onOpenChange={setShowFirstVisitPopup}>
        <AlertDialogContent className="max-w-[340px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.contact.welcomeTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.contact.welcomeMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowFirstVisitPopup(false)}>
              {t.contact.gotIt}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
