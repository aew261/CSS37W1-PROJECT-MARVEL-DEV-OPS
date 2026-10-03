function FullPageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--color-navy)',
        fontWeight: 600,
      }}
    >
      Loading...
    </div>
  );
}

export default FullPageLoader;