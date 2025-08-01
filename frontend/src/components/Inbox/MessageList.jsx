import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestWrapper } from "../../utils/request_wrapper";
import { server } from "../../server";

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
  isLoading,
  inboxType,
}) => {
  //   console.log(data);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    const link =
      inboxType === "shop" ? `/inbox?${id}` : `/dashboard/messages?${id}`;
    navigate(link);
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  useEffect(() => {
    const userId = data.members.find((user) => user != me);

    const getUser = async () => {
      const res = await requestWrapper(
        `${server}/${inboxType}/get-info?id=${userId}`,
        {},
        "GET",
        "application/json"
      );
      if (res.status !== 200) {
        console.log(res.response.data.error);
        return;
      }
      setUser(res.data.data);
    };
    getUser();
  }, [me, data, inboxType]);

  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      }  cursor-pointer`}
      onClick={() =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={`${user?.avatar?.url}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <div
          className={`w-[12px] h-[12px] rounded-full absolute top-[2px] right-[2px] ${
            online ? "bg-green-400" : "bg-[#c7b9b9]"
          }`}
        />
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {!isLoading && data?.lastMessageId !== user?._id
            ? "You:"
            : user?.name?.split(" ")[0] + ": "}{" "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

export default MessageList;
