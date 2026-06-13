import {
  audioNotes,
  brand,
  capabilities,
  features,
  roamingNotes,
  selectedFiles,
  signals,
  socialLinks,
} from './content';

export default function App() {
  return (
    <main className="site-shell">
      <header>
        <p>{brand.titleZh}</p>
        <h1>{brand.title}</h1>
        <p>{brand.tagline.en}</p>
        <p>{brand.identity.en}</p>
        <p>{brand.intro.en}</p>
      </header>

      <section aria-labelledby="feature-index-title">
        <h2 id="feature-index-title">Feature Index</h2>
        {features.map((feature) => (
          <article key={feature.id}>
            <p>{feature.number}</p>
            <p>{feature.title.en}</p>
            <p>{feature.summary.en}</p>
            <a href={feature.href}>Open {feature.title.en}</a>
          </article>
        ))}
      </section>

      <section id="files" aria-labelledby="files-title">
        <h2 id="files-title">Selected Files</h2>
        {selectedFiles.map((file) => (
          <article key={file.id}>
            <p>{file.number}</p>
            <h3>{file.title.en}</h3>
            <p>{file.meaning.en}</p>
            <p>{file.platform}</p>
            <a href={file.href}>Open file</a>
          </article>
        ))}
      </section>

      <section id="signals" aria-labelledby="signals-title">
        <h2 id="signals-title">AI Signals</h2>
        {signals.map((signal) => (
          <article key={signal.id}>
            <p>{signal.number}</p>
            <h3>{signal.title.en}</h3>
            <p>{signal.body.en}</p>
          </article>
        ))}
      </section>

      <section id="audio" aria-labelledby="audio-title">
        <h2 id="audio-title">Audio Notes</h2>
        {audioNotes.map((audio) => (
          <article key={audio.id}>
            <h3>{audio.title.en}</h3>
            <p>{audio.positioning.en}</p>
            <p>{audio.recommendedEpisode.en}</p>
            <a href={audio.href}>Listen</a>
          </article>
        ))}
      </section>

      <section aria-labelledby="capabilities-title">
        <h2 id="capabilities-title">Capabilities</h2>
        {capabilities.map((capability) => (
          <article key={capability.id}>
            <h3>{capability.title.en}</h3>
            <p>{capability.proof.en}</p>
          </article>
        ))}
      </section>

      <section id="roaming" aria-labelledby="roaming-title">
        <h2 id="roaming-title">Roaming</h2>
        {roamingNotes.map((note) => (
          <article key={note.id}>
            <p>{note.meta}</p>
            <h3>{note.place.en}</h3>
            <p>{note.caption.en}</p>
          </article>
        ))}
      </section>

      <footer id="connect" aria-labelledby="connect-title">
        <h2 id="connect-title">Connect</h2>
        <ul>
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </footer>
    </main>
  );
}
