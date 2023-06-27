import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Inbox() {
  const [inboxMessages, setInboxMessages] = useState([]);

  useEffect(() => {
    // Fetch inbox messages
    const fetchInboxMessages = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/gmail/v1/users/me/messages', {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          },
          params: {
            labelIds: 'INBOX',
          },
        });

        setInboxMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching inbox messages:', error);
      }
    };

    fetchInboxMessages();
  }, []);

  return (
    <div>
      <h1>Inbox</h1>
      <ul>
        {inboxMessages.map((message) => (
          <li key={message.id}>{message.subject}</li>
        ))}
      </ul>
    </div>
  );
}

export default Inbox;
