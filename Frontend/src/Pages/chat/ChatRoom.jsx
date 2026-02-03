import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from "../../Components/global/AppLayout";

export default function ChatRoom() {
  const { id } = useParams();

  return (
    <AppLayout>
      <div className="page-container" style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
        <h2>Chat with {id}</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>Start messaging! (Coming Soon)</p>
      </div>
    </AppLayout>
  );
}
