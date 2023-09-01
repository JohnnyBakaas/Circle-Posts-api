import { useEffect, useRef, useState } from "react";
import styles from "./MessageContainter.module.css";

type MessageContainterProps = {};

const MessageContainter = () => {
  const [avatarOnly, setAvatarOnly] = useState(true);
  const [handleChatToDispaly, setHandleChatToDispaly] = useState();
  const [textInput, setTextInput] = useState("");
  const [messages, setMessages] = useState(messagesPlaceHolder);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSendNewMessage();
    }
  };

  const handleSendNewMessage = () => {
    if (textInput === "") return;
    sendMssage();
    setMessages((mess) => [...mess]);
    setTextInput("");
  };

  const sendMssage = () => {
    const temp = messages;
    if (temp[temp.length - 1].isYou) {
      temp[temp.length - 1].messages.push(textInput);
    } else {
      temp.push({
        isYou: true,
        userName: "",
        messages: [textInput],
      });
    }
  };

  const getChatFromHandle = () => {
    if (handleChatToDispaly == "KakeBaker") {
      setMessages(messagesPlaceHolder);
    }

    if (handleChatToDispaly == "Thomas") {
      setMessages(messagesPlaceHolderTwo);
    }
  };

  useEffect(() => {
    getChatFromHandle();
  }, [handleChatToDispaly]);

  return (
    <div className={styles.wrapper}>
      <section
        onMouseEnter={() => setAvatarOnly(false)}
        className={styles.friends}
        style={avatarOnly ? { minWidth: "80px" } : {}}
      >
        {userDisplayPlaceHolder.map((data, i) => (
          <UserDisplay
            key={i}
            avatarOnly={avatarOnly}
            avatar={data.avatar}
            displayName={data.displayName}
            handle={data.handle}
            lastMessage={data.lastMessage}
            setHandleChatToDispaly={setHandleChatToDispaly}
          />
        ))}
      </section>

      <section
        className={styles.messages}
        onMouseEnter={() => setAvatarOnly(true)}
      >
        <div className={styles.messageSenderWrapper}>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={handleSendNewMessage}>Send</button>
        </div>

        {messages
          .map((m, i) => (
            <Message
              key={i}
              isYou={m.isYou}
              userName={m.userName}
              messages={m.messages}
            />
          ))
          .reverse()}
      </section>
    </div>
  );
};

export default MessageContainter;

type MessageProps = {
  isYou: boolean;
  userName: string;
  messages: string[];
};

const Message = ({ userName, messages, isYou }: MessageProps) => {
  return (
    <div className={isYou ? styles.isYou : styles.notYou}>
      <h4>{isYou ? "Deg" : userName}</h4>
      {messages.map((message, i) => (
        <p key={i}>{message}</p>
      ))}
    </div>
  );
};

const messagesPlaceHolder: MessageProps[] = [
  {
    isYou: false,
    userName: "KakeBaker69",
    messages: ["Jeg sverger! Bot diff hvert game!", "ff 15"],
  },
  {
    isYou: true,
    userName: "Meg",
    messages: [
      "Det er ikke veldig locus of controll da",
      "OMG! Hva er denne Caten???",
      "du har rett...",
      "ff 15",
    ],
  },
  {
    isYou: false,
    userName: "KakeBaker69",
    messages: ["gg"],
  },
  {
    isYou: true,
    userName: "Meg",
    messages: [
      "Ok, det er faktisk håp her",
      "Top er 17/0 uten ganks",
      "Vi turner dette",
      "Bare spill rundt top",
      "Dude, bare splill safe",
    ],
  },
  {
    isYou: false,
    userName: "KakeBaker69",
    messages: ["Ait, ez W", "ff bot", "ff", "ff", "ff", "ff", "ff"],
  },
  {
    isYou: true,
    userName: "Meg",
    messages: ["Bruh..."],
  },
];

const messagesPlaceHolderTwo: MessageProps[] = [
  {
    isYou: false,
    userName: "Thomas the dank engine",
    messages: ["Jeg er lei av bf4"],
  },
  {
    isYou: true,
    userName: "Meg",
    messages: [
      "Damn that's crazy",
      "You want to know whats even crazyer?",
      "I dont remember asking",
    ],
  },
  {
    isYou: false,
    userName: "Thomas the dank engine",
    messages: ["Why are you like this?"],
  },
];

type UserDisplayProps = {
  avatarOnly: boolean;
  avatar: string;
  displayName: string;
  handle: string;
  lastMessage: string;
  setHandleChatToDispaly: (handel: any) => void;
};

const UserDisplay = ({
  avatarOnly,
  avatar,
  displayName,
  handle,
  lastMessage,
  setHandleChatToDispaly,
}: UserDisplayProps) => {
  return (
    <div
      onClick={() => {
        setHandleChatToDispaly(handle);
        console.log("kake");
      }}
    >
      <img
        className={styles.avatar}
        src={avatar}
        alt={avatar}
        style={{ width: "80px", height: "80px" }}
      />
      <span
        style={avatarOnly ? { display: "none" } : {}}
        className={avatarOnly ? "" : styles.displayMoreThenAvatar}
      >
        <h6>{displayName}</h6>
        <h4>{handle}</h4>
        <p>{lastMessage}</p>
      </span>
    </div>
  );
};

const userDisplayPlaceHolder: UserDisplayProps[] = [
  {
    avatar:
      "https://yt3.googleusercontent.com/ytc/AOPolaQ2iMmw9cWFFjnwa13nBwtZQbl-AqGYkkiTqNaTLg=s900-c-k-c0x00ffffff-no-rj",
    displayName: "KakeBaker69",
    handle: "KakeBaker",
    lastMessage: "Bruh...",
    avatarOnly: false,
    setHandleChatToDispaly: () => {},
  },
  {
    avatar:
      "https://acclaimmag.com/wp-content/uploads/2014/03/thomasfeatured.jpg",
    displayName: "Thomas the dank engine",
    handle: "Thomas",
    lastMessage: "Reeeee",
    avatarOnly: false,
    setHandleChatToDispaly: () => {},
  },
];
