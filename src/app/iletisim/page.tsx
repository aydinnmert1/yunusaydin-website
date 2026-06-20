import { MapPin, Phone, Mail, Clock } from "lucide-react";
import styles from "./page.module.css";

export const metadata = {
  title: "İletişim | Avukat Yunus Aydın",
  description: "Hukuki danışmanlık için Avukat Yunus Aydın ile iletişime geçin.",
};

async function getIletisimData() {
  try {
    const res = await fetch(`http://panel.yunusaydin.av.tr/wp-json/wp/v2/pages?slug=iletisim&_fields=acf`, { cache: 'no-store' });
    const pages = await res.json();
    if (pages && pages.length > 0 && pages[0].acf) {
      return pages[0].acf;
    }
  } catch (error) {
    console.error("Error fetching iletisim data:", error);
  }
  return null;
}

// Global data (from homepage) for phone, email, address
async function getGlobalData() {
  try {
    const res = await fetch(`http://panel.yunusaydin.av.tr/wp-json/wp/v2/pages?slug=ana-sayfa&_fields=acf`, { cache: 'no-store' });
    const pages = await res.json();
    if (pages && pages.length > 0 && pages[0].acf) {
      return pages[0].acf;
    }
  } catch (error) {
    console.error("Error fetching global data:", error);
  }
  return null;
}

export default async function ContactPage() {
  const acfData = await getIletisimData();
  const globalData = await getGlobalData();

  const sayfaAltYazi = acfData?.iletisim_alt_yazisi || "Hukuki sorunlarınızla ilgili detaylı bilgi almak ve randevu oluşturmak için bize ulaşın.";
  const formUstu = acfData?.iletisim_form_ustu || "Acil hukuki destek veya danışmanlık talepleriniz için aşağıdaki iletişim kanallarından bize ulaşabilirsiniz.";

  const telefon = globalData?.telefon_numarasi || "+90 (555) 123 45 67";
  const email = globalData?.eposta_adresi || "info@yunusaydin.av.tr";
  const adres = globalData?.acik_adres || "Adalet Mahallesi, Hukuk Plaza No:1 Kat:3 Merkez / Türkiye";
  const saatler = globalData?.calisma_saatleri || "Pazartesi - Cuma: 09:00 - 18:00";

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>İletişim</h1>
          <p className={styles.pageSubtitle}>
            {sayfaAltYazi}
          </p>
        </div>
      </div>

      <section className="section">
        <div className={`container ${styles.contactGrid}`}>
          {/* Info Side */}
          <div className={styles.infoSide}>
            <h2 className={styles.heading}>Bize Ulaşın</h2>
            <p className={styles.desc}>
              {formUstu}
            </p>

            <ul className={styles.contactList}>
              <li>
                <div className={styles.iconWrapper}><MapPin size={24} /></div>
                <div className={styles.infoContent}>
                  <h3>Adres</h3>
                  <p>{adres}</p>
                </div>
              </li>
              <li>
                <div className={styles.iconWrapper}><Phone size={24} /></div>
                <div className={styles.infoContent}>
                  <h3>Telefon</h3>
                  <p><a href={`tel:${telefon.replace(/\s+/g, '')}`}>{telefon}</a></p>
                </div>
              </li>
              <li>
                <div className={styles.iconWrapper}><Mail size={24} /></div>
                <div className={styles.infoContent}>
                  <h3>E-posta</h3>
                  <p><a href={`mailto:${email}`}>{email}</a></p>
                </div>
              </li>
              <li>
                <div className={styles.iconWrapper}><Clock size={24} /></div>
                <div className={styles.infoContent}>
                  <h3>Çalışma Saatleri</h3>
                  <p>{saatler}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form Side */}
          <div className={styles.formSide}>
            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Adınız Soyadınız</label>
                <input type="text" id="name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">E-posta Adresiniz</label>
                <input type="email" id="email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Telefon Numaranız</label>
                <input type="tel" id="phone" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Konu</label>
                <input type="text" id="subject" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Mesajınız</label>
                <textarea id="message" rows={5} required></textarea>
              </div>
              <button type="button" className="btn-primary" style={{ width: '100%' }}>
                Mesaj Gönder
              </button>
              <p className={styles.formDisclaimer}>
                * Form aracılığıyla paylaştığınız bilgiler mesleki sır kapsamında gizli tutulmaktadır.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className={styles.mapPlaceholder}>
          <p>Google Haritalar Entegrasyonu</p>
        </div>
      </section>
    </div>
  );
}
