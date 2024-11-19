import React, { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Send, Smile, Search, MoreVertical } from 'lucide-react';
import {onSnapshot, doc, getDoc, collection, query, where, getDocs, setDoc, serverTimestamp, updateDoc, arrayUnion} from "firebase/firestore"
import {firestore} from "../../config/firebase/firebaseConfig"
import {useAuth} from "../../hooks/useAuth"

export const ChatViewWithSidebar = () => {
  
  const [chat, setChat] = useState();
  const [activeChat, setActiveChat] = useState(null);
  const {user} = useAuth()

  const messagesEndRef = useRef(null);

  const [findUsers, setFindUsers] = useState(null)
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState('')


  useEffect(()=> {
    console.log(user.uid)
    const unsub = onSnapshot(doc(firestore, "userchats", user.uid), async(res) => {
      const items = res.data().chats;
      const promises = items.map(async(item) => {
        const userDocRef = doc(firestore, "users", item.receiverId)
        const userDocSnap = await getDoc(userDocRef)

        const user = userDocSnap.data()

        return {...item, user}
      })

      const chatData = await Promise.all(promises)

      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
    })
    return ()=> {
      unsub()
    }
  }, [])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages]);

  const handleSearch = async(e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get("email")

    try {
      const userRef = collection(firestore, "users")

      const q = query(userRef, where("email", "==", email))

      const querySnapshot = await getDocs(q)

      if(!querySnapshot.empty) {
        setFindUsers(querySnapshot.docs[0].data())
      }
    } catch(e) {
      console.log(e)
    }
  }

  const handleAdd = async() => {

    const chatRef = collection(firestore, "chats")
    const userChatsRef = collection(firestore, "userchats")

    try {
      const newChatRef = doc(chatRef)

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      })

      await updateDoc(doc(userChatsRef, findUsers.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.uid,
          updatedAt:Date.now()
        })
      })

      await updateDoc(doc(userChatsRef, user.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: findUsers.id,
          updatedAt:Date.now()
        })
      })

    }catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!activeChat) return;
  
    const unSub = onSnapshot(doc(firestore, "chats", activeChat.chatId), (res) => {
      setChat(res.data());
    });
  
    return () => {
      unSub();
    };
  }, [activeChat]);

  const handleSelect = async (chat) => {
    setActiveChat(chat);
  }

  console.log(chat, "CHAT MESSAGE VIEWED")
  console.log(activeChat, "ACTIVE VIEWED")

  const handleSendMessage = async () => {
    if(newMessage == "") return;
    
    try {
      await updateDoc(doc(firestore, "chats", activeChat.chatId), {
        messages: arrayUnion({
          senderId: user.uid,
          text: newMessage,
          createdAt: new Date()
        })
      })

      const userIDs = [user.uid, activeChat.receiverId]

      userIDs.forEach(async(id) => {

        const userChatsRef = doc(firestore, "userchats", id)
        const userChatsSnapshot = await getDoc(userChatsRef)
  
        if(userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
  
          const chatIndex = userChatsData.chats.findIndex(c => c.chatId === activeChat.chatId)
  
          userChatsData.chats[chatIndex].lastMessage = newMessage
          userChatsData.chats[chatIndex].isSeen = id === user.uid ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now()
  
  
          await updateDoc(userChatsRef, {
            chats: userChatsData.chats
          })

        }
      })

    } catch(e){
      console.log(e)
    }
  }

  return (
    <div className="flex h-full mx-auto border rounded-lg w-full">
      {/* Sidebar */}
      <div className="w-1/3 border-r bg-background">
        <div className="p-4 border-b">
        <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Buscar chats...
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <form onSubmit={handleSearch} className="p-4">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Correo electrónico"
                    name="email"
                    className="flex-grow"
                  />
                  <Button type="submit">Buscar</Button>
                </div>
              </form>
              {findUsers && (
                <div className="p-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{findUsers.email}</span>
                    <Button variant="secondary" size="sm" onClick={handleAdd}>Agregar</Button>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <ScrollArea className="h-[calc(600px-65px)] rounded-md border">
          {chats.map((chat) => (
            <div
              key={chat.chatId}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted transition-colors ${
                activeChat?.chatId === chat.chatId ? 'bg-muted' : ''
              }`}
              onClick={() => handleSelect(chat)}
            >
              <Avatar>
                <AvatarImage src={chat.user.photoURL} alt={chat.user.nombre} />
                <AvatarFallback>{chat.user.nombre[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-semibold truncate">{chat.user.nombre}</h3>
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {(activeChat ? (
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex flex-row items-center gap-3 p-4">
            <div>
              <h2 className="text-lg font-semibold">{activeChat.user.nombre}</h2>
              <p className="text-sm text-muted-foreground">{activeChat.user.email}</p>
            </div>
          </CardHeader>
          <CardContent className="p-1 max-h-[725px] h-[725px] flex justify-center">
            <ScrollArea className="m-h-[98%] w-[98%] p-8">
              {chat?.messages.map((message, key) => (
                <div
                  key={key}
                  className={`flex mb-4 ${message.senderId === user.uid ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === user.uid
                        ? 'bg-slate-200 text-primary-foreground'
                        : 'bg-slate-500'
                    }`}
                  >
                    <p>{message.text || ""}</p>
                  </div>
                </div>
              ))}
              {/* Elemento invisible para el autoscroll */}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
                setNewMessage("")
              }}
              className="flex w-full items-center gap-2"
            >
              <Input
                placeholder="Escribe tu mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow"
              />
              {/* <Button type="button" size="icon" variant="ghost">
                <Smile className="h-5 w-5" />
              </Button> */}
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ): (
        <div className="flex-1 flex items-center justify-center bg-muted">
          <p className="text-muted-foreground">Selecciona un chat para comenzar</p>
        </div>
      ))}
    </div>
  );
};
