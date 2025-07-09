import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Phone, Video, MoreHorizontal } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Messages = () => {
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: "Villa Romance Cocody",
      lastMessage: "Merci pour votre réservation !",
      time: "14:30",
      unread: 2,
      avatar: "/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png",
      online: true
    },
    {
      id: 2,
      name: "Suite Présidentielle",
      lastMessage: "La chambre sera prête à 15h",
      time: "12:45",
      unread: 0,
      avatar: "/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png",
      online: false
    },
    {
      id: 3,
      name: "Support Hotro",
      lastMessage: "Comment puis-je vous aider ?",
      time: "Hier",
      unread: 1,
      avatar: "/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png",
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "hotel",
      content: "Bonjour ! Merci pour votre réservation à la Villa Romance Cocody.",
      time: "14:25"
    },
    {
      id: 2,
      sender: "user",
      content: "Bonjour, à quelle heure puis-je arriver ?",
      time: "14:27"
    },
    {
      id: 3,
      sender: "hotel",
      content: "Vous pouvez arriver à partir de 15h. Avez-vous des demandes particulières ?",
      time: "14:28"
    },
    {
      id: 4,
      sender: "hotel",
      content: "Merci pour votre réservation !",
      time: "14:30"
    }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Logic to send message
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Messages</h1>
          <p className="text-muted-foreground">Communiquez avec vos hôtes</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 h-[600px]">
          {/* Conversations List */}
          <Card className="glass-morphism md:col-span-1">
            <CardContent className="p-0">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Conversations</h3>
              </div>
              
              <div className="space-y-2 p-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setActiveChat(conv.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      activeChat === conv.id ? 'bg-primary/10' : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={conv.avatar}
                          alt={conv.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {conv.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-foreground truncate">{conv.name}</h4>
                          <span className="text-xs text-muted-foreground">{conv.time}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                          {conv.unread > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="glass-morphism md:col-span-2 flex flex-col">
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src="/lovable-uploads/7166ae21-46de-4d2d-9098-e5e5e3128fb0.png"
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-foreground">Villa Romance Cocody</h4>
                      <p className="text-xs text-green-500">En ligne</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Tapez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Sélectionnez une conversation</h3>
                  <p className="text-muted-foreground">Choisissez une conversation pour commencer à discuter</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;