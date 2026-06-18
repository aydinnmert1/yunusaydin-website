import { Award, BookOpen, Scale } from "lucide-react";
import styles from "./page.module.css";

export const metadata = {
  title: "Hakkımda | Avukat Yunus Aydın",
  description: "Avukat Yunus Aydın'ın özgeçmişi, eğitimi ve hukuki vizyonu.",
};

export default function AboutPage() {
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
            <div className={styles.imagePlaceholder}>
              Av. Yunus Aydın
            </div>
          </div>

          {/* Text Side */}
          <div className={styles.textSide}>
            <h2 className={styles.heading}>Avukat Yunus Aydın</h2>
            <p className={styles.lead}>
              Hukukun üstünlüğüne inanan, müvekkil odaklı ve çözüm üreten bir hukuk bürosu.
            </p>
            
            <div className={styles.bio}>
              <p>
                Avukat Yunus Aydın, kariyeri boyunca sayısız hukuki uyuşmazlığın çözümünde rol almış, 
                şeffaflık ve güven ilkelerinden ödün vermeden mesleğini icra etmektedir. 
                Ceza Hukuku, Aile Hukuku ve Ticaret Hukuku başta olmak üzere geniş bir yelpazede danışmanlık hizmeti sunmaktadır.
              </p>
              <p>
                Amacımız; müvekkillerimizin hukuki sorunlarını en kısa sürede, en az maliyetle ve 
                en etkili şekilde çözüme kavuşturmaktır. Her dosya için özel bir strateji belirleyerek, 
                sürecin her aşamasında müvekkillerimizi bilgilendirmeyi ilke ediniyoruz.
              </p>
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}><Scale size={24} /></div>
                <div className={styles.statValue}>10+</div>
                <div className={styles.statLabel}>Yıllık Tecrübe</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}><Award size={24} /></div>
                <div className={styles.statValue}>500+</div>
                <div className={styles.statLabel}>Başarılı Dava</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}><BookOpen size={24} /></div>
                <div className={styles.statValue}>50+</div>
                <div className={styles.statLabel}>Yayımlanmış Makale</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
