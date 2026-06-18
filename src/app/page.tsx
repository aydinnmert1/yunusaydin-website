import Link from "next/link";
import { ArrowRight, Scale, BookOpen, ShieldCheck } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  const practiceAreas = [
    {
      id: 1,
      title: "Ceza Hukuku",
      description: "Soruşturma ve kovuşturma aşamalarında etkin ve çözüm odaklı avukatlık hizmeti.",
      icon: <Scale size={32} />
    },
    {
      id: 2,
      title: "Ticaret ve Şirketler Hukuku",
      description: "Şirket kuruluşları, sözleşmeler ve ticari uyuşmazlıklarda hukuki danışmanlık.",
      icon: <BookOpen size={32} />
    },
    {
      id: 3,
      title: "Aile Hukuku",
      description: "Boşanma, nafaka, velayet ve mal paylaşımı davalarında hassas ve gizlilik odaklı yaklaşım.",
      icon: <ShieldCheck size={32} />
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Güvenilir Hukuki Çözümler</span>
            <h1 className={styles.heroTitle}>Haklarınızın <br/><span className={styles.heroHighlight}>Güçlü Savunucusu</span></h1>
            <p className={styles.heroDescription}>
              Avukat Yunus Aydın, hukuki uyuşmazlıklarda profesyonel, şeffaf ve sonuç odaklı danışmanlık ve avukatlık hizmetleri sunmaktadır.
            </p>
            <div className={styles.heroActions}>
              <Link href="/iletisim" className="btn-primary">
                Hemen Danışın
              </Link>
              <Link href="/uzmanlik-alanlari" className="btn-outline">
                Uzmanlık Alanları
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className={`section ${styles.aboutPreview}`}>
        <div className={`container ${styles.aboutGrid}`}>
          <div className={styles.aboutImageWrapper}>
            <div className={styles.aboutImagePlaceholder}>
              {/* Replace with actual image later */}
              <span>Av. Yunus Aydın</span>
            </div>
            <div className={styles.experienceBadge}>
              <span className={styles.expNumber}>10+</span>
              <span className={styles.expText}>Yıllık Tecrübe</span>
            </div>
          </div>
          <div className={styles.aboutText}>
            <h2 className={styles.sectionTitle}>Adalete Giden Yolda <br/>Yanınızdayız</h2>
            <p className={styles.sectionDesc}>
              Hukuki süreçlerin karmaşıklığı içinde kaybolmayın. Müvekkillerimize sadece hukuki destek değil, aynı zamanda güven veren bir rehberlik sunuyoruz. 
              Deneyimimiz ve çözüm odaklı yaklaşımımızla haklarınızı en iyi şekilde koruyoruz.
            </p>
            <ul className={styles.featureList}>
              <li>Geniş Kapsamlı Hukuki Analiz</li>
              <li>Şeffaf ve Düzenli Bilgilendirme</li>
              <li>Hızlı ve Etkili Çözüm Odaklılık</li>
            </ul>
            <Link href="/hakkimda" className={styles.linkWithIcon}>
              Daha Fazla Bilgi <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Practice Areas Preview */}
      <section className={`section ${styles.practiceAreas}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Uzmanlık Alanlarımız</h2>
            <p className={styles.sectionSubtitle}>
              Farklı hukuk dallarında edindiğimiz tecrübe ile ihtiyaç duyduğunuz alanda yanınızdayız.
            </p>
          </div>

          <div className={styles.areasGrid}>
            {practiceAreas.map((area) => (
              <div key={area.id} className={styles.areaCard}>
                <div className={styles.areaIcon}>{area.icon}</div>
                <h3 className={styles.areaTitle}>{area.title}</h3>
                <p className={styles.areaDesc}>{area.description}</p>
                <Link href={`/uzmanlik-alanlari#${area.id}`} className={styles.areaLink}>
                  İncele <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
          
          <div className={styles.viewAllBtn}>
            <Link href="/uzmanlik-alanlari" className="btn-primary">
              Tüm Alanları Gör
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaContainer}`}>
          <h2>Hukuki Desteğe mi İhtiyacınız Var?</h2>
          <p>Dosyanızın incelenmesi ve detaylı bilgi almak için bizimle iletişime geçin.</p>
          <Link href="/iletisim" className="btn-primary" style={{ backgroundColor: '#fff', color: 'var(--color-primary)' }}>
            İletişime Geçin
          </Link>
        </div>
      </section>
    </>
  );
}
