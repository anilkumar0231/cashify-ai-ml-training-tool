import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Optionally redirect if login becomes mandatory later
  }, [user]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Dashboard</h1>

      {user ? (
        <div style={styles.card}>
          <p><strong>User:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button style={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      ) : (
        <div style={styles.card}>
          <p>You are browsing as <strong>Guest</strong></p>
        </div>
      )}

      <div style={styles.links}>
        <button style={styles.navBtn} onClick={() => router.push('/training')}>
          Go to Training
        </button>
        <button style={styles.navBtn} onClick={() => router.push('/documents')}>
          View Documents
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '20px',
    color: '#008080',
  },
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
  },
  logoutBtn: {
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  navBtn: {
    backgroundColor: '#008080',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
