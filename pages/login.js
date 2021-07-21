import React from 'react';
// Hook do NextJS
import { useRouter } from 'next/router';
import nookies from 'nookies';

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('omariosouto');

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        
      </div>
    </main>
  )
} 