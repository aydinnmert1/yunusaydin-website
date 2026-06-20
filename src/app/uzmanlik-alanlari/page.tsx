import Link from "next/link";
import { Scale, BookOpen, ShieldCheck, ArrowRight, Briefcase, FileText, Home as HomeIcon } from "lucide-react";
import styles from "./page.module.css";

export const metadata = {
  title: "Uzmanlık Alanları | Avukat Yunus Aydın",
  description: "Ceza, Aile, Ticaret Hukuku ve daha fazlasında uzman avukatlık hizmetleri.",
};

async function getUzmanlikData() {
  try {
    const res = await fetch(`http://panel.yunusaydin.av.tr/wp-json/wp/v2/pages?slug=uzmanlik-alanlari&_fields=acf`, { cache: 'no-store' });
    const pages = await res.json();
    if (pages && pages.length > 0 && pages[0].acf) {
      return pages[0].acf;
    }
  } catch (error) {
    console.error("Error fetching uzmanlik data:", error);
  }
  return null;
}

export default async function PracticeAreasPage() {
  const acfData = await getUzmanlikData();

  const sayfaAltYazi = acfData?.uzmanlik_alt_yazisi || "Farklı hukuk dallarında edindiğimiz tecrübe ile ihtiyaç duyduğunuz alanda yanınızdayız.";

  // Dynamic practice areas from ACF
  const practiceAreas = [
    {
      id: "ceza-hukuku",
      title: acfData?.alan_1_baslik || "Ceza Hukuku",
      description: acfData?.alan_1_aciklama || "Soruşturma ve kovuşturma aşamalarında etkin ve çözüm odaklı avukatlık hizmeti.",
      icon: <Scale size={48} className={styles.icon} />
    },
    {
      id: "ticaret-sirketler-hukuku",
      title: acfData?.alan_2_baslik || "Ticaret ve Şirketler Hukuku",
      description: acfData?.alan_2_aciklama || "Şirket kuruluşları, sözleşmeler ve ticari uyuşmazlıklarda hukuki danışmanlık.",
      icon: <Briefcase size={48} className={styles.icon} />
    },
    {
      id: "aile-hukuku",
      title: acfData?.alan_3_baslik || "Aile Hukuku",
      description: acfData?.alan_3_aciklama || "Boşanma, nafaka, velayet ve mal paylaşımı davalarında hassas ve gizlilik odaklı yaklaşım.",
      icon: <ShieldCheck size={48} className={styles.icon} />
    }
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Uzmanlık Alanlarımız</h1>
          <p className={styles.pageSubtitle}>
            {sayfaAltYazi}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className={styles.areasGrid}>
            {practiceAreas.map((area) => (
              <div key={area.id} id={area.id} className={styles.areaCard}>
                <div className={styles.iconWrapper}>
                  {area.icon}
                </div>
                <div className={styles.areaContent}>
                  <h2 className={styles.areaTitle}>{area.title}</h2>
                  <p className={styles.areaDesc}>{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Hukuki Desteğe mi İhtiyacınız Var?</h2>
            <p>Durumunuzu değerlendirmek ve size en uygun çözümü bulmak için bizimle iletişime geçin.</p>
            <Link href="/iletisim" className="btn-primary">
              Randevu Alın <ArrowRight size={18} style={{marginLeft: '8px'}}/>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
