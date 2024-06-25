import styles from '@/components/ui/organisms/icons/loading-dots.module.css';

const LoadingDots = ({ color = 'hsl(var(--foreground))' }: { color?: string }) => {
  return (
    <span className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;
