import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { siteData } from '@/lib/data';

const Impressum = () => {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = atob(siteData.profile.social.email);
    window.location.href = `mailto:${email}`;
  };

  const getDecodedEmail = () => {
    return atob(siteData.profile.social.email);
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back to profile</span>
        </Link>

        <h1 className="text-4xl font-bold text-text-primary mb-8">
          Impressum
        </h1>

        <div className="prose prose-invert max-w-none space-y-8">
          {/* Angaben gemäß § 5 DDG */}
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Angaben gemäß § 5 DDG
            </h2>
            <div className="text-text-secondary space-y-2">
              <p className="font-medium text-text-primary">Dr. Marco Blumendorf</p>
              <p>
                Adresse auf Anfrage
                <br />
                Deutschland
              </p>
            </div>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Kontakt
            </h2>
            <div className="text-text-secondary space-y-2">
              <p>
                E-Mail:{' '}
                <a
                  href="#"
                  onClick={handleEmailClick}
                  className="text-accent hover:underline"
                >
                  {getDecodedEmail()}
                </a>
              </p>
              <p>
                Website:{' '}
                <a
                  href="https://blumendorf.info"
                  className="text-accent hover:underline"
                >
                  https://blumendorf.info
                </a>
              </p>
            </div>
          </section>

          {/* Verantwortlich für den Inhalt */}
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <div className="text-text-secondary">
              <p>Dr. Marco Blumendorf</p>
            </div>
          </section>

          {/* Haftungsausschluss */}
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Haftungsausschluss
            </h2>

            <h3 className="text-xl font-medium text-text-primary mb-2 mt-4">
              Haftung für Inhalte
            </h3>
            <p className="text-text-secondary">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind
              wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach
              den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind
              wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
              Inhalte umgehend entfernen.
            </p>

            <h3 className="text-xl font-medium text-text-primary mb-2 mt-4">
              Haftung für Links
            </h3>
            <p className="text-text-secondary">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich. Die verlinkten Seiten wurden zum
              Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
              erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
              Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
              nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
              derartige Links umgehend entfernen.
            </p>

            <h3 className="text-xl font-medium text-text-primary mb-2 mt-4">
              Urheberrecht
            </h3>
            <p className="text-text-secondary">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
              Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
              Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
              gekennzeichnet. Sollten Sie trotzdem auf eine
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>

          {/* Datenschutz */}
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Datenschutz
            </h2>
            <p className="text-text-secondary">
              Die Nutzung unserer Webseite ist in der Regel ohne Angabe
              personenbezogener Daten möglich. Soweit auf unseren Seiten
              personenbezogene Daten (beispielsweise Name, Anschrift oder
              E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
              auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
              Zustimmung nicht an Dritte weitergegeben.
            </p>
            <p className="text-text-secondary mt-4">
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B.
              bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann.
              Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
              nicht möglich.
            </p>
          </section>

          {/* Online Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Streitbeilegung
            </h2>
            <p className="text-text-secondary">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              .
            </p>
            <p className="text-text-secondary mt-4">
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
