import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import { server, ENDPOINT } from "../server";
import SellerInbox from "../components/Inbox/SellerInbox";
import MessageList from "../components/Inbox/MessageList";
import { requestWrapper } from "../utils/request_wrapper";
import { toast } from "react-toastify";
import io from "socket.io-client";

const UserInbox = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  //eslint-disable-next-line
  const [images, setImages] = useState();
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const [socketId, setSocketId] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    const socket = io(ENDPOINT, {
      transports: ["polling", "websocket"],
      timeout: 20000,
      forceNew: true,
    });

    socket.on("connect", () => {
      setSocketId(socket);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("getMessage", (data) => {
      console.log("Received message via socket:", data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      const res = await requestWrapper(
        `${server}/conversation/get-user-conversations`,
        {},
        "GET",
        "application/json"
      );
      if (res.status === 200) {
        setConversations(res.data.data);
      }
    };
    getConversation();
  }, [user, messages]);

  useEffect(() => {
    if (user && socketId) {
      const sellerId = user?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user, socketId]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = Object.keys(onlineUsers).find(
      (user) => user === chatMembers
    );

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      const response = await requestWrapper(
        `${server}/message/get-all?id=${currentChat?._id}`,
        {},
        "GET",
        "application/json"
      );
      if (response.status !== 200) {
        console.log(response.response.data.error);
        return;
      }
      setMessages(response.data.data);
    };
    getMessage();
  }, [currentChat]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    if (socketId) {
      console.log("Sending message via socket:", {
        senderId: user?._id,
        receiverId,
        text: newMessage,
      });
      socketId.emit("sendMessage", {
        senderId: user?._id,
        receiverId,
        text: newMessage,
      });
    }

    try {
      if (newMessage !== "") {
        const res = await requestWrapper(
          `${server}/message/create`,
          message,
          "POST",
          "application/json"
        );

        if (res.status !== 200) {
          toast.error(res.response.data.error);
          return;
        }
        const data = [...messages];
        setMessages([...data, res.data.data]);
        updateLastMessage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    // Note: updateLastMessage event is not implemented in socket server
    // This is handled by the backend API instead

    const res = await requestWrapper(
      `${server}/conversation/update-last-message`,
      {
        conversationId: currentChat._id,
        lastMessage: newMessage,
        lastMessageId: user._id,
      },
      "PATCH",
      "application/json"
    );

    if (res.status !== 200) {
      console.log(res.response.data.error);
      return;
    }
    setNewMessage("");
  };

  const handleImageUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendingHandler = async (e) => {
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    if (socketId) {
      console.log("Sending image via socket:", {
        senderId: user._id,
        receiverId,
        images: e,
      });
      socketId.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        images: e,
      });
    }

    const res = await requestWrapper(
      `${server}/message/create`,
      {
        images: e,
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      },
      "POST",
      "application/json"
    );

    if (res.status !== 200) {
      toast.error(res.response.data.error);
      return;
    }
    setImages();
    const data = [...messages];
    setMessages([...data, res.data.data]);
    updateLastMessageForImage();
  };

  const updateLastMessageForImage = async () => {
    const res = await requestWrapper(
      `${server}/conversation/update-last-message`,
      {
        conversationId: currentChat._id,
        lastMessage: "Photo",
        lastMessageId: user._id,
      },
      "PATCH",
      "application/json"
    );
    if (res.status !== 200) {
      console.log(res.response.data.error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  return (
    <div className="w-full bg-[var(--color-background)]">
      {!open && (
        <>
          <Header />
          <h1 className="text-center text-[30px] py-3 font-Poppins bg-[var(--color-background)]">
            All Messages
          </h1>
          {/* All messages list */}
          {conversations.length ? (
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={user?._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
                loading={loading}
                inboxType={"shop"}
              />
            ))
          ) : (
            <div className="text-center bg-[var(--color-background)] font-semibold flex items-center justify-center absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 text-[20px] font-Poppins">
              No messages found
            </div>
          )}
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={user._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

export default UserInbox;
