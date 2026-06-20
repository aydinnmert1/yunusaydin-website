import { Award, BookOpen, Scale } from "lucide-react";
import styles from "./page.module.css";

export const metadata = {
  title: "Hakkımda | Avukat Yunus Aydın",
  description: "Avukat Yunus Aydın'ın özgeçmişi, eğitimi ve hukuki vizyonu.",
};

async function getHakkimdaData() {
  try {
    const res = await fetch(`http://panel.yunusaydin.av.tr/wp-json/wp/v2/pages?slug=hakkimda&_fields=acf`, { cache: 'no-store' });
    const pages = await res.json();
    if (pages && pages.length > 0 && pages[0].acf) {
      return pages[0].acf;
    }
  } catch (error) {
    console.error("Error fetching hakkimda data:", error);
  }
  return null;
}

export default async function AboutPage() {
  const acfData = await getHakkimdaData();

  const altBaslik = acfData?.hakkimda_alt_baslik || "Hukukun üstünlüğüne inanan, müvekkil odaklı ve çözüm üreten bir hukuk bürosu.";
  const p1 = acfData?.birinci_paragraf || "Avukat Yunus Aydın, kariyeri boyunca sayısız hukuki uyuşmazlığın çözümünde rol almış, şeffaflık ve güven ilkelerinden ödün vermeden mesleğini icra etmektedir. Ceza Hukuku, Aile Hukuku ve Ticaret Hukuku başta olmak üzere geniş bir yelpazede danışmanlık hizmeti sunmaktadır.";
  const p2 = acfData?.ikinci_paragraf || "Amacımız; müvekkillerimizin hukuki sorunlarını en kısa sürede, en az maliyetle ve en etkili şekilde çözüme kavuşturmaktır. Her dosya için özel bir strateji belirleyerek, sürecin her aşamasında müvekkillerimizi bilgilendirmeyi ilke ediniyoruz.";
  const deneyim = acfData?.deneyim_yili || "10+";
  const dava = acfData?.basarili_dava_sayisi || "500+";
  const makale = acfData?.makale_sayisi || "50+";
  const aboutImage = acfData?.about_page_image; // optional

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Hakkımda</h1>
        </div>
      </div>

      <section className="section">
        <div className={`container ${styles.aboutGrid}`}>
          {/* Image Side */}
          <div className={styles.imageSide}>
            <div 
              className={styles.imagePlaceholder}
              style={aboutImage ? { backgroundImage: `url('${aboutImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
              {!aboutImage && "Av. Yunus Aydın"}
            </div>
          </div>

          {/* Text Side */}
          <div className={styles.textSide}>
            <h2 className={styles.heading}>Avukat Yunus Aydın</h2>
            <p className={styles.lead}>
              {altBaslik}
            </p>
            
            <div className={styles.bio}>
              <p>{p1}</p>
              <p>{p2}</p>
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}><Scale size={24} /></div>
                <div className={styles.statValue}>{deneyim}</div>
                <div className={styles.statLabel}>Yıllık Tecrübe</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}><Award size={24} /></div>
                <div className={styles.statValue}>{dava}</div>
                <div className={styles.statLabel}>Başarılı Dava</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}><BookOpen size={24} /></div>
                <div className={styles.statValue}>{makale}</div>
                <div className={styles.statLabel}>Yayımlanmış Makale</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
