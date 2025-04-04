import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { signInWithGoogle } from '@/firebase/auth';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <img src="/logo.png" alt="Cashify Logo" style={styles.logo} />
      <h1 style={styles.title}>Welcome to Cashify Training Portal</h1>
      <button onClick={handleLogin} style={styles.button}>
        Sign in with Google
      </button>
      <p style={{ marginTop: 16, fontSize: 14, color: '#888' }}>
        Or continue without signing in
      </p>
      <button onClick={() => router.push('/dashboard')} style={styles.skip}>
        Skip Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    padding: '20px',
  },
  logo: {
    width: '120px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#008080',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  skip: {
    marginTop: '10px',
    padding: '8px 20px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};
