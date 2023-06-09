import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { FaPaperPlane } from 'react-icons/fa'
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import styles from './index.module.css'

const firebaseConfig = {
  apiKey: "AIzaSyCtgxi6nQKw5D0-zZ93gwmbqmmjgKmgJ8k",
  authDomain: "devconnect-15a52.firebaseapp.com",
  databaseURL: "https://devconnect-15a52-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "devconnect-15a52",
  storageBucket: "devconnect-15a52.appspot.com",
  messagingSenderId: "1097432069803",
  appId: "1:1097432069803:web:7f89ce599d2c631cd169ee"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

export default function FirebaseChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const chatroomRef = useRef(null)

  useEffect(() => {
    chatroomRef.current.scroll(0, chatroomRef.current.scrollHeight);
  }, [messages])

  useEffect(() => { 
      // Reference the "messages" node in the Firebase Realtime Database
      const messagesRef = ref(db, `chatrooms/chatroom${sessionStorage.getItem('project_id')}/messages`);
  
      // Listen for new messages in the Firebase Realtime Database
      const messagesListener = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMessages(Object.values(data));
        }
      });
  
      // Listen for changes to the signed-in user
      const authListener = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      // Sign in anonymously and save the UID to the database
      signInAnonymously(auth)
        .then((userCredential) => {
          const uid = userCredential.user.uid;
          console.log("Signed in anonymously with UID:", uid);
          console.log("Signed in anonymously with Username:", sessionStorage.getItem('username'));
  
          // Save the UID and username to the "users" node in the Firebase Realtime Database
          set(ref(db, `users/${uid}`), {
            uid: uid,
            username: sessionStorage.getItem('username')
          });
        })
        .catch((error) => {
          console.error("Error signing in anonymously:", error);
        });
  
      // Clean up the event listeners when the component unmounts
      return () => {
        // Detach the onValue listener
        messagesListener();
  
        // Detach the onAuthStateChanged listener
        authListener();
      };
  }, []);

  const handleNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault()
    // Check if the user is signed in
    if (user) {
      // Push the new message to the "messages" node in the Firebase Realtime Database
      push(ref(db, `chatrooms/chatroom${sessionStorage.getItem('project_id')}/messages`), {
        text: newMessage,
        timestamp: Date.now(),
        uid: user.uid,
        username: sessionStorage.getItem('username')
      });

      // Clear the input field
      setNewMessage("");
    } else {
      console.log("User is not signed in");
    }
  };

  return (
    <div className={styles['chatroom-container']}>
      <div className={styles["chatroom-inner-container"]} ref={chatroomRef}>
        <h1 className={styles['groupchat-name']}>Chat</h1>
          {messages.map((message) => (
            <div key={message.timestamp} className={styles[`sent-messages`]}>
              <div className={`${styles['sent-message']} ${styles[(sessionStorage.getItem('username')==message.username)?'me':'']}`}>
                <div className={styles["top-of-message"]}>
                  <p className={styles["date-time"]}>{new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  <p className={styles["user"]}>{message.username}</p>
                </div>
                <p className={styles["text-message"]}>{message.text}</p>
              </div>
            </div>
          ))}
      </div>
      <form className={styles['message-form']} onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={handleNewMessage}
          placeholder="Type your message here..."
        />
        <button type="submit"><FaPaperPlane className={styles['send-icon']} /></button>
      </form>
    </div>
  );
}
