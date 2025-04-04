import { useRouter } from 'next/router';

const taxonomies = [
  { id: 'front', name: 'Front View', description: 'Training materials for front view analysis.' },
  { id: 'back', name: 'Back View', description: 'Training materials for back view analysis.' },
  { id: 'side', name: 'Side View', description: 'Training materials for side view analysis.' },
];

export default function TrainingIndex() {
  const router = useRouter();

  const goToTaxonomy = (id) => {
    router.push(`/training/${id}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Select a Taxonomy</h1>
      <div style={styles.grid}>
        {taxonomies.map((tax) => (
          <div key={tax.id} style={styles.card} onClick={() => goToTaxonomy(tax.id)}>
            <h3>{tax.name}</h3>
            <p>{tax.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    color: '#008080',
    marginBottom: '30px',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  card: {
    background: '#f0f0f0',
    borderRadius: '12px',
    padding: '20px',
    width: '250px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  hoverCard: {
    transform: 'scale(1.05)',
  },
};
