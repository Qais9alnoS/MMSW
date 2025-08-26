import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { 
  Mail, 
  Send, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  Reply,
  User,
  Phone,
  Mail as MailIcon,
  Calendar
} from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'pending' | 'replied' | 'read';
  createdAt: string;
  repliedAt?: string;
  reply?: string;
}

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    try {
      const response = await fetch(`/api/messages/${selectedMessage.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: replyText })
      });

      if (response.ok) {
        setMessages(prev => prev.map(msg => 
          msg.id === selectedMessage.id 
            ? { ...msg, status: 'replied', reply: replyText, repliedAt: new Date().toISOString() }
            : msg
        ));
        setSelectedMessage(prev => prev ? { ...prev, status: 'replied', reply: replyText, repliedAt: new Date().toISOString() } : null);
        setReplyText('');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">قيد الانتظار</Badge>;
      case 'read':
        return <Badge variant="outline" className="text-blue-600">مقروء</Badge>;
      case 'replied':
        return <Badge className="bg-green-600 text-white">تم الرد</Badge>;
      default:
        return null;
    }
  };

  const pendingMessages = messages.filter(m => m.status === 'pending');
  const repliedMessages = messages.filter(m => m.status === 'replied');
  const allMessages = messages;

  return (
    <AdminLayout pageTitle="الرسائل">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            إدارة الرسائل
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            إدارة رسائل الزوار والرد عليها
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>الرسائل الواردة</CardTitle>
            <CardDescription>
              إجمالي الرسائل: {messages.length} | غير المقروءة: {messages.filter(m => m.status === 'pending').length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MessagesList 
              messages={messages} 
              onSelect={setSelectedMessage} 
            />
          </CardContent>
        </Card>
      </div>

      <MessageDialog 
        message={selectedMessage} 
        onClose={() => setSelectedMessage(null)}
        replyText={replyText}
        onReplyTextChange={setReplyText}
        onReply={handleReply}
      />
    </AdminLayout>
  );
};

const MessagesList: React.FC<{
  messages: Message[];
  onSelect: (message: Message) => void;
}> = ({ messages, onSelect }) => {
  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Mail className="w-12 h-12 mx-auto text-slate-400 mb-4" />
            <p className="text-slate-500">لا توجد رسائل</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map(message => (
        <Card 
          key={message.id} 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onSelect(message)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-slate-100 dark:bg-slate-700">
                    {message.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold">{message.name}</h3>
                    {message.status === 'pending' && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">جديد</Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{message.subject}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {message.message}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {format(new Date(message.createdAt), 'PPpp', { locale: ar })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                {message.status === 'pending' ? (
                  <Clock className="w-5 h-5 text-yellow-500" />
                ) : message.status === 'replied' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const MessageDialog: React.FC<{
  message: Message | null;
  onClose: () => void;
  replyText: string;
  onReplyTextChange: (text: string) => void;
  onReply: () => void;
}> = ({ message, onClose, replyText, onReplyTextChange, onReply }) => {
  if (!message) return null;

  return (
    <Dialog open={!!message} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>تفاصيل الرسالة</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6 p-4">
            {/* Sender Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">معلومات المرسل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-slate-500" />
                  <span className="font-medium">{message.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MailIcon className="w-4 h-4 text-slate-500" />
                  <span>{message.email}</span>
                </div>
                {message.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span>{message.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>تم الإرسال: {format(new Date(message.createdAt), 'PPpp', { locale: ar })}</span>
                </div>
              </CardContent>
            </Card>

            {/* Message Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">الموضوع: {message.subject}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{message.message}</p>
              </CardContent>
            </Card>

            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">الحالة:</span>
              <div>
                {message.status === 'pending' && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">قيد الانتظار</Badge>
                )}
                {message.status === 'read' && (
                  <Badge variant="outline" className="text-blue-600">مقروء</Badge>
                )}
                {message.status === 'replied' && (
                  <Badge className="bg-green-600 text-white">تم الرد</Badge>
                )}
              </div>
            </div>

            {/* Reply Section */}
            {message.status !== 'replied' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reply">الرد</Label>
                  <Textarea
                    id="reply"
                    placeholder="اكتب ردك هنا..."
                    value={replyText}
                    onChange={(e) => onReplyTextChange(e.target.value)}
                    rows={4}
                    className="mt-2"
                  />
                </div>
                <Button 
                  onClick={onReply} 
                  disabled={!replyText.trim()}
                  className="w-full"
                >
                  <Send className="w-4 h-4 ml-2" />
                  إرسال الرد
                </Button>
              </div>
            )}

            {/* Previous Reply */}
            {message.reply && (
              <Card className="bg-green-50 dark:bg-green-900/20">
                <CardHeader>
                  <CardTitle className="text-lg">الرد السابق</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{message.reply}</p>
                  {message.repliedAt && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      تم الرد في: {format(new Date(message.repliedAt), 'PPpp', { locale: ar })}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AdminMessages;