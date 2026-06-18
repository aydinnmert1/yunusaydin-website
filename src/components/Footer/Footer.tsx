import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        {/* Brand Section */}
        <div className={styles.brandSection}>
          <Link href="/" className={styles.logo}>
            Av. Yunus Aydın
          </Link>
          <p className={styles.description}>
            Profesyonel, güvenilir ve çözüm odaklı hukuki danışmanlık hizmetleri. 
            Müvekkillerimizin haklarını korumak önceliğimizdir.
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
              <span>Adalet Mahallesi, Hukuk Plaza No:1 Kat:3<br/>Merkez / Türkiye</span>
            </li>
            <li>
              <Phone size={18} className={styles.icon} />
              <a href="tel:+905551234567">+90 (555) 123 45 67</a>
            </li>
            <li>
              <Mail size={18} className={styles.icon} />
              <a href="mailto:info@yunusaydin.av.tr">info@yunusaydin.av.tr</a>
            </li>
            <li>
              <Clock size={18} className={styles.icon} />
              <span>Pzt - Cum: 09:00 - 18:00</span>
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
