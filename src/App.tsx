import { AudioNotes } from './components/AudioNotes';
import { Capabilities } from './components/Capabilities';
import { Connect } from './components/Connect';
import { Cover } from './components/Cover';
import { FeatureIndex } from './components/FeatureIndex';
import { Header } from './components/Header';
import { Roaming } from './components/Roaming';
import { SelectedFiles } from './components/SelectedFiles';
import { Signals } from './components/Signals';
import { useLanguage } from './hooks/useLanguage';

export default function App() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <>
      <Header language={language} onToggleLanguage={toggleLanguage} />
      <main className="site-shell">
        <Cover language={language} />
        <FeatureIndex language={language} />
        <SelectedFiles language={language} />
        <Signals language={language} />
        <AudioNotes language={language} />
        <Capabilities language={language} />
        <Roaming language={language} />
        <Connect language={language} />
      </main>
    </>
  );
}
