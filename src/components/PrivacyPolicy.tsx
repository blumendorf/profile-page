import { Link } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen text-gray-900 dark:text-gray-100">
      <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90" />
      <ParticleBackground />

      <div className="relative max-w-4xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-accent-dark dark:hover:text-accent-light transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Startseite
          </Link>
          <Link to="/impressum" className="text-accent hover:text-accent-dark dark:hover:text-accent-light transition-colors">
            Impressum
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-12 text-accent dark:text-accent-light">Datenschutzerklärung</h1>

        <div className="space-y-12">
          <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-accent dark:text-accent-light">Datenschutz auf einen Blick</h2>
            <div className="prose dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300">
                Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zwecke der Verarbeitung von personenbezogenen Daten auf dieser Webseite auf. Der Schutz Ihrer Daten ist uns ein wichtiges Anliegen. Ihre Daten werden im Einklang mit den gesetzlichen Vorschriften geschützt.
              </p>
            </div>
          </section>

          <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-accent dark:text-accent-light">Verantwortlicher</h2>
            <div className="prose dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300">
                Dr Marco Blumendorf<br />
                Lange Strasse 6<br />
                12051 Berlin<br />
                E-Mail: marco@blumendorf.info
              </p>
            </div>
          </section>

          <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-accent dark:text-accent-light">Ihre Rechte</h2>
            <div className="prose dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300">
                Sie haben jederzeit das Recht:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-700 dark:text-gray-300">
                <li>Auskunft über Ihre bei uns gespeicherten Daten zu erhalten</li>
                <li>Diese berichtigen oder löschen zu lassen</li>
                <li>Die Verarbeitung einschränken zu lassen</li>
                <li>Der Verarbeitung zu widersprechen</li>
                <li>Ihre Daten übertragen zu lassen</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-accent dark:text-accent-light">Analyse und Tracking</h2>
            <div className="prose dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300">
                Diese Website nutzt Google Analytics, einen Webanalysedienst der Google Inc. Google Analytics verwendet sog. "Cookies", Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Wir haben die IP-Anonymisierung aktiviert, sodass Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt wird.
              </p>
            </div>
          </section>

          <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-accent dark:text-accent-light">Cookies</h2>
            <div className="prose dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300">
                Diese Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Ihr Browser greift auf diese Dateien zu. Durch den Einsatz von Cookies erhöht sich die Benutzerfreundlichkeit und Sicherheit dieser Website.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Sie können in Ihren Browser-Einstellungen festlegen, ob Cookies gesetzt werden dürfen. Wenn Sie keine Cookies akzeptieren, kann dies die Funktionalität dieser Website einschränken.
              </p>
            </div>
          </section>


          <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-accent dark:text-accent-light">Server-Log-Files</h2>
            <div className="prose dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log Files, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-700 dark:text-gray-300">
                <li>Browsertyp/ Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Wir behalten uns vor, diese Daten nachträglich zu prüfen, wenn uns konkrete Anhaltspunkte für eine rechtswidrige Nutzung bekannt werden.
              </p>
            </div>
          </section>


          <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-accent dark:text-accent-light">Änderungen</h2>
            <div className="prose dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Stand: Januar 2025
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12">
          <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-accent-dark dark:hover:text-accent-light transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}