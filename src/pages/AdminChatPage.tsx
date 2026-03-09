import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useGetAllUserChatsQuery, useGetChatMessagesQuery, useSendMessageMutation, useMarkAsReadMutation } from '@/store/chatApi';
import { MessageCircle, Send, Users, User } from 'lucide-react';

export const AdminChatPage = () => {
  const { toast } = useToast();
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { data: userChatsData, refetch: refetchUserChats } = useGetAllUserChatsQuery();
  const { data: messagesData, refetch: refetchMessages } = useGetChatMessagesQuery(selectedUserId, {
    skip: !selectedUserId
  });
  const [sendMessage, { isLoading: sending }] = useSendMessageMutation();
  const [markAsRead] = useMarkAsReadMutation();

  const userChats = userChatsData?.data || [];
  const messages = messagesData?.data || [];
  const selectedUser = userChats.find(chat => chat.userId === selectedUserId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Poll for new messages every 3 seconds
    const interval = setInterval(() => {
      refetchUserChats();
      if (selectedUserId) {
        refetchMessages();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [refetchUserChats, refetchMessages, selectedUserId]);

  useEffect(() => {
    if (selectedUserId) {
      markAsRead({ userId: selectedUserId });
    }
  }, [selectedUserId, markAsRead]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedUserId) return;

    try {
      await sendMessage({ message, userId: selectedUserId }).unwrap();
      setMessage('');
      refetchMessages();
      refetchUserChats();
    } catch (error: any) {
      toast({
        title: "Failed to send message",
        description: error.data?.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chat Management</h1>
          <p className="text-muted-foreground">Manage user conversations</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {userChats.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No conversations yet</p>
                </div>
              ) : (
                userChats.map((chat: any) => (
                  <div
                    key={chat.userId}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                      selectedUserId === chat.userId ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedUserId(chat.userId)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {chat.user.firstName?.[0]}{chat.user.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">
                            {chat.user.firstName} {chat.user.lastName}
                          </p>
                          {chat.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {chat.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(chat.lastMessageTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {selectedUser ? `${selectedUser.user.firstName} ${selectedUser.user.lastName}` : 'Select a conversation'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {!selectedUserId ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select a user to start chatting</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
                  {messages.map((msg: any) => (
                    <div
                      key={msg._id}
                      className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-2 max-w-xs ${msg.sender === 'admin' ? 'flex-row-reverse' : ''}`}>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={msg.sender === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
                            {msg.sender === 'admin' ? 'A' : selectedUser?.user.firstName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`rounded-lg p-3 ${
                          msg.sender === 'admin' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender === 'admin' 
                              ? 'text-primary-foreground/70' 
                              : 'text-muted-foreground'
                          }`}>
                            {new Date(msg.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    disabled={sending}
                  />
                  <Button type="submit" disabled={sending || !message.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};