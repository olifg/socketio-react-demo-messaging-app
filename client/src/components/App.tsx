import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Dashboard } from './Dashboard/Main';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import { Login } from './Login';


function App() {
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <SocketProvider userId={id}>
      <ContactsProvider>
        <ConversationsProvider userId={id}>
          <Dashboard userId={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    <div className="App">
      {(id ?
        dashboard :
        <Login
          onIdSubmit={setId}
        />)}
    </div>
  )
}

export default App
