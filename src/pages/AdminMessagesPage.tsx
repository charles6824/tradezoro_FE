import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Send, Users, User, Loader2, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useGetUsersQuery, useSendAdminMessageMutation } from '@/store/adminApi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const AdminMessagesPage = () => {
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [recipientMode, setRecipientMode] = useState<'all' | 'specific'>('specific');
  const [emailInput, setEmailInput] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  
  const { data: usersData, isLoading: isLoadingUsers } = useGetUsersQuery();
  const [sendMessage, { isLoading: isSending }] = useSendAdminMessageMutation();

  const allUsers = usersData?.data?.filter((u: any) => u.isActive) || [];

  const handleAddEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newEmail = emailInput.trim();
      
      if (newEmail) {
        // Basic email validation
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
          if (!selectedEmails.includes(newEmail)) {
            setSelectedEmails([...selectedEmails, newEmail]);
          }
          setEmailInput('');
        } else {
          toast({
            title: "Invalid Email",
            description: "Please enter a valid email address",
            variant: "destructive"
          });
        }
      }
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setSelectedEmails(selectedEmails.filter(email => email !== emailToRemove));
  };

  const handleSend = async () => {
    let targetEmails: string[] = [];
    
    if (recipientMode === 'all') {
      targetEmails = allUsers.map((u: any) => u.email);
    } else {
      targetEmails = [...selectedEmails];
      // Include any pending input if it looks like an email
      if (emailInput.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.trim()) && !targetEmails.includes(emailInput.trim())) {
        targetEmails.push(emailInput.trim());
      }
    }

    if (targetEmails.length === 0) {
      toast({
        title: "No Recipients",
        description: "Please specify at least one recipient",
        variant: "destructive"
      });
      return;
    }

    if (!subject.trim()) {
      toast({
        title: "Missing Subject",
        description: "Please enter a subject",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim() || content === '<p><br></p>') {
      toast({
        title: "Missing Content",
        description: "Please enter your message content",
        variant: "destructive"
      });
      return;
    }

    try {
      await sendMessage({
        emails: targetEmails,
        subject,
        html: content
      }).unwrap();

      toast({
        title: "Message Sent",
        description: `Successfully sent message to ${targetEmails.length} recipient(s).`
      });

      // Reset form
      setSubject('');
      setContent('');
      if (recipientMode === 'specific') {
        setSelectedEmails([]);
        setEmailInput('');
      }
    } catch (error: any) {
      toast({
        title: "Failed to Send",
        description: error.data?.message || "An error occurred while sending the message",
        variant: "destructive"
      });
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'clean']
    ]
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Send className="w-8 h-8 text-indigo-500" />
          Send Messages
        </h1>
      </div>

      <Card className="bg-card/50 backdrop-blur shadow-sm">
        <CardHeader>
          <CardTitle>Compose Message</CardTitle>
          <CardDescription>Send rich-text emails to platform users via Resend</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-3">
            <Label className="text-base">Recipients</Label>
            <div className="flex gap-4 mb-4">
              <Button 
                type="button"
                variant={recipientMode === 'specific' ? 'default' : 'outline'}
                className={recipientMode === 'specific' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
                onClick={() => setRecipientMode('specific')}
              >
                <User className="w-4 h-4 mr-2" />
                Specific Users
              </Button>
              <Button 
                type="button" 
                variant={recipientMode === 'all' ? 'default' : 'outline'}
                className={recipientMode === 'all' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
                onClick={() => setRecipientMode('all')}
              >
                <Users className="w-4 h-4 mr-2" />
                All Active Users ({isLoadingUsers ? '...' : allUsers.length})
              </Button>
            </div>

            {recipientMode === 'specific' && (
              <div className="space-y-2 border rounded-lg p-3 bg-muted/30">
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedEmails.map((email) => (
                    <Badge key={email} variant="secondary" className="px-3 py-1 bg-background border shadow-sm flex items-center gap-1">
                      <span className="text-foreground">{email}</span>
                      <button 
                        onClick={() => removeEmail(email)}
                        className="ml-1 text-muted-foreground hover:text-destructive rounded-full focus:outline-none"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Type email address and press Enter or comma..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={handleAddEmail}
                  className="bg-transparent border-0 shadow-none focus-visible:ring-0 px-1 text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground w-full px-1 flex items-center gap-1">
                  <Info className="w-3 h-3"/> Separate multiple emails with Enter or Comma
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-base">Subject</Label>
            <Input
              id="subject"
              placeholder="E.g. Platform update, Important notice..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base">Message Content</Label>
            <div className="bg-white text-slate-900 rounded-lg border overflow-hidden shadow-sm">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent}
                modules={quillModules}
                className="min-h-[300px] [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-base [&_.ql-toolbar]:border-x-0 [&_.ql-toolbar]:border-t-0 [&_.ql-toolbar]:bg-slate-50 [&_.ql-container]:border-x-0 [&_.ql-container]:border-b-0"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button 
              size="lg" 
              className="px-8 bg-indigo-600 hover:bg-indigo-700 shadow-sm"
              onClick={handleSend}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
