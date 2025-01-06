import { Link } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';

const encodedEmail = 'bWFyY29AYmx1bWVuZG9yZi5pbmZv';

export default function Impressum() {
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
          <Link to="/privacy-policy" className="text-accent hover:text-accent-dark dark:hover:text-accent-light transition-colors">
            Datenschutzerklärung
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-12 text-accent dark:text-accent-light">Impressum</h1>

        <div className="space-y-12">
          <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-accent dark:text-accent-light">Angaben gemäß § 5 TMG</h2>
            <div className="prose dark:prose-invert">
              <p className="text-lg">
                Marco Blumendorf<br />
                Lange Strasse 6<br />
                12051 Berlin
              </p>
              <p className="mt-4 text-lg">
                USt-IdNr.: DE313487127
              </p>
            </div>
          </section>

          <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-accent dark:text-accent-light">Kontakt</h2>
            <div className="prose dark:prose-invert">
              <p className="text-lg">
                E-Mail: {atob(encodedEmail)}<br />
              </p>
            </div>
          </section>

          <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-accent dark:text-accent-light">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <div className="prose dark:prose-invert">
              <p className="text-lg">
                Marco Blumendorf<br />
                Warthestr. 25<br />
                12051 Berlin
              </p>
            </div>
          </section>

          <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-accent dark:text-accent-light">Haftungsausschluss</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Haftung für Inhalte</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Haftung für Links</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Urheberrecht</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>
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