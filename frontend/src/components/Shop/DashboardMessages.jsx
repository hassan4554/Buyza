import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { server } from "../../server";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { requestWrapper } from "../../utils/request_wrapper";
import { ENDPOINT } from "../../server";
import { toast } from "react-toastify";
import SellerInbox from "../Inbox/SellerInbox";
import MessageList from "../Inbox/MessageList";

const DashboardMessages = () => {
  const { seller, isLoading } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  //eslint-disable-next-line
  const [images, setImages] = useState(null);
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
      console.log("Socket connected successfully");
      setSocketId(socket);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("getMessage", (data) => {
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
        `${server}/conversation/get-seller-conversations`,
        {},
        "GET",
        "application/json"
      );
      if (res.status === 200) {
        setConversations(res.data.data);
      }
    };
    getConversation();
  }, [seller, messages]);

  useEffect(() => {
    if (seller && socketId) {
      const sellerId = seller?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller, socketId]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
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
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member.id !== seller._id
    );

    if (socketId) {
      socketId.emit("sendMessage", {
        senderId: seller._id,
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
    if (socketId) {
      socketId.emit("updateLastMessage", {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      });
    }

    const res = await requestWrapper(
      `${server}/conversation/update-last-message`,
      {
        conversationId: currentChat._id,
        lastMessage: newMessage,
        lastMessageId: seller._id,
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
      (member) => member !== seller._id
    );

    if (socketId) {
      socketId.emit("sendMessage", {
        senderId: seller._id,
        receiverId,
        images: e,
      });
    }

    const res = await requestWrapper(
      `${server}/message/create`,
      {
        images: e,
        sender: seller._id,
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
        lastMessageId: seller._id,
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
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={seller._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
                isLoading={isLoading}
                inboxType={"user"}
              />
            ))}
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          setMessages={setMessages}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

export default DashboardMessages;
