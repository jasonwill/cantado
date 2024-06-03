export default function AlbumsLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here for Albums e.g. a header or sidebar */}
        <nav>single album specific UI</nav>
        {children}
      </section>
    )
  }