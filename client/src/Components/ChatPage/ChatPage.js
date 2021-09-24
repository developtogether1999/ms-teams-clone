import { useRef, useState, useEffect } from "react";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
// import Header from "../UI/Header/Header";
import "./ChatPage.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatFeed from './ChatFeed'
import ReactSearchBox from 'react-search-box'

const ChatPage = (props) => {
  const didMountRef = useRef(false);
  let user = props.user;
  const history = useHistory();
  // console.log(props);
  const [CHAT_ENGINE_PROJECT_ID, setCHAT_ENGINE_PROJECT_ID] = useState("");
  const [newChatUsername, setNewChatUsername] = useState('')
  const [users, setUsers] = useState([])

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

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "/chat/getUsernames",
    }).then((res) => {
        if(res.data != users) {
          setUsers(res.data)
        }
    });
  }, []);

  const createDirectChat = (creds) => {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [newChatUsername] },
			() => setNewChatUsername('')
		)
	}

  const renderChatForm = (creds) => {
		
    return (
      <ReactSearchBox
        placeholder="Username"
        data={users}
        onSelect={() => createDirectChat(creds)}
        onFocus={() => {
          console.log('This function is called when is focused')
        }}
        onChange={(value) => setNewChatUsername(value)}
        fuseConfigs={{
          threshold: 0.05,
        }}
        // value={(console.log(newChatUsername) && true) && newChatUsername}
      />
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
