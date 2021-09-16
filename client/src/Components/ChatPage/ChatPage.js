import { useRef, useState, useEffect } from "react";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
// import Header from "../UI/Header/Header";
import "./ChatPage.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatFeed from './ChatFeed'

const ChatPage = (props) => {
  const didMountRef = useRef(false);
  let user = props.user;
  const history = useHistory();
  console.log(props);

  const [CHAT_ENGINE_PROJECT_ID, setCHAT_ENGINE_PROJECT_ID] = useState("");
  const [username, setUsername] = useState('')

  useEffect(() => {
    
    axios({
        method: "GET",
        withCredentials: true,
        url: "/chat/getChatEngineProjectID",
    }).then((res) => {
        if (res.data.redirect != '/') {
            props.history.push(`/auth/login`);
        }
        setCHAT_ENGINE_PROJECT_ID(res.data.CHAT_ENGINE_PROJECT_ID)
    });
  }, [CHAT_ENGINE_PROJECT_ID])

  useEffect(() => {
      if (!didMountRef.current) {
        didMountRef.current = true;

      if (!user || user === null) {
          history.push("/");
          return;
      }

    }
  }, [user, history]);

  const createDirectChat = (creds) => {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}


  const renderChatForm = (creds) => {
		return (
			<div>
				<input 
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button onClick={() => createDirectChat(creds)}>
					Create
				</button>
			</div>
		)
	}


  if (!user || user.username=='' || user.password=='') return "Loading..";

  return (
      <div className="chat-page" >
        {   (CHAT_ENGINE_PROJECT_ID != "")
              ? <ChatEngine
                  height="92vh"
                  projectID={CHAT_ENGINE_PROJECT_ID}
                  userName={user.username}
                  userSecret={user.password}
                  renderChatFeed = { (chatProps) => <ChatFeed {...chatProps}/> }
                  renderNewChatForm={(creds) => renderChatForm(creds)}
                />
              : null
        }
      </div>
  );
};

export default ChatPage;
