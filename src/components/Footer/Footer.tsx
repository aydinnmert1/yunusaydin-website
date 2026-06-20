import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import styles from "./Footer.module.css";

// Global data (from homepage) for phone, email, address
async function getGlobalData() {
  try {
    const res = await fetch(`http://panel.yunusaydin.av.tr/wp-json/wp/v2/pages?slug=ana-sayfa&_fields=acf`, { cache: 'no-store' });
    const pages = await res.json();
    if (pages && pages.length > 0 && pages[0].acf) {
      return pages[0].acf;
    }
  } catch (error) {
    console.error("Error fetching global data for footer:", error);
  }
  return null;
}

export default async function Footer() {
  const globalData = await getGlobalData();

  const telefon = globalData?.telefon_numarasi || "+90 (555) 123 45 67";
  const email = globalData?.eposta_adresi || "info@yunusaydin.av.tr";
  const adres = globalData?.acik_adres || "Adalet Mahallesi, Hukuk Plaza No:1 Kat:3 Merkez / Türkiye";
  const saatler = globalData?.calisma_saatleri || "Pazartesi - Cuma: 09:00 - 18:00";
  const hakkinda = globalData?.footer_hakkinda_yazisi || "Profesyonel, güvenilir ve çözüm odaklı hukuki danışmanlık hizmetleri. Müvekkillerimizin haklarını korumak önceliğimizdir.";

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        {/* Brand Section */}
        <div className={styles.brandSection}>
          <Link href="/" className={styles.logo}>
            Av. Yunus Aydın
          </Link>
          <p className={styles.description}>
            {hakkinda}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={styles.footerHeading}>Hızlı Bağlantılar</h3>
          <ul className={styles.linkList}>
            <li><Link href="/hakkimda">Hakkımda</Link></li>
            <li><Link href="/uzmanlik-alanlari">Uzmanlık Alanları</Link></li>
            <li><Link href="/makaleler">Makaleler</Link></li>
            <li><Link href="/iletisim">İletişim</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className={styles.footerHeading}>İletişim</h3>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={18} className={styles.icon} />
              <span>{adres}</span>
            </li>
            <li>
              <Phone size={18} className={styles.icon} />
              <a href={`tel:${telefon.replace(/\s+/g, '')}`}>{telefon}</a>
            </li>
            <li>
              <Mail size={18} className={styles.icon} />
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              <Clock size={18} className={styles.icon} />
              <span>{saatler}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomBarContent}`}>
          <p>&copy; {new Date().getFullYear()} Av. Yunus Aydın. Tüm hakları saklıdır.</p>
          <p className={styles.disclaimer}>
            Bu web sitesindeki bilgiler genel bilgilendirme amaçlıdır. Hukuki tavsiye niteliği taşımaz.
          </p>
        </div>
      </div>
    </footer>
  );
}
