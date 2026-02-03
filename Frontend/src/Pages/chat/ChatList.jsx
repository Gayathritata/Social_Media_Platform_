import React from 'react';
import AppLayout from "../../Components/global/AppLayout";

export default function ChatList() {
  return (
    <AppLayout>
      <div className="page-container" style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
        <h2>Messages</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>Your conversations will appear here. (Coming Soon)</p>
      </div>
    </AppLayout>
  );
}
