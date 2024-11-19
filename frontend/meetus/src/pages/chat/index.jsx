import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Send, Smile, Search, MoreVertical } from 'lucide-react';

export const ChatViewWithSidebar = () => {
  const [chats, setChats] = useState([
    { id: 1, name: "John Doe", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Hey, how are you?", timestamp: "10:00 AM", unread: 2 },
    { id: 2, name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Can we meet tomorrow?", timestamp: "Yesterday", unread: 0 },
    { id: 3, name: "Team Project", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "The deadline is next week", timestamp: "2 days ago", unread: 5 },
  ]);
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John', content: 'Hey, how are you?', timestamp: '10:00 AM' },
    { id: 2, sender: 'You', content: 'I\'m doing great, thanks! How about you?', timestamp: '10:02 AM' },
    { id: 3, sender: 'John', content: 'Pretty good! Did you finish the project?', timestamp: '10:03 AM' },
    { id: 4, sender: 'You', content: 'Yes, I just submitted it. How about yours?', timestamp: '10:05 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-full mx-auto border rounded-lg overflow-hidden w-full">
      {/* Sidebar */}
      <div className="w-1/3 border-r bg-background">
        <div className="p-4 border-b">
          <Input
            placeholder="Search chats..."
            className="w-full"
          />
        </div>
        <ScrollArea className="h-[calc(600px-65px)]">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted ${
                activeChat.id === chat.id ? 'bg-muted' : ''
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <Avatar>
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold truncate">{chat.name}</h3>
                  <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {chat.unread}
                </span>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex flex-row items-center gap-3 p-4">
          <Avatar>
            <AvatarImage src={activeChat.avatar} alt={activeChat.name} />
            <AvatarFallback>{activeChat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{activeChat.name}</h2>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">More options</span>
          </Button>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-4">
          <ScrollArea className="h-full pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'You'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-50 mt-1 block">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex w-full items-center gap-2"
          >
            <Button type="button" size="icon" variant="ghost">
              <Paperclip className="h-5 w-5" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow"
            />
            <Button type="button" size="icon" variant="ghost">
              <Smile className="h-5 w-5" />
              <span className="sr-only">Insert emoji</span>
            </Button>
            <Button type="submit" size="icon">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};
