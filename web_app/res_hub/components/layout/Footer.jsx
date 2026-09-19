function Footer() {
  return (
    <footer
      style={{
        padding: '1rem 2rem',
        textAlign: 'center',
        background: 'var(--color-navy)',
        color: '#fff',
      }}
    >
      &copy; {new Date().getFullYear()} ResHub by Marvel Dev Ops
    </footer>
  );
}

export default Footer;