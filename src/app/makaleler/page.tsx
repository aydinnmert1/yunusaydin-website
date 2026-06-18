import Link from 'next/link';
import { getSortedArticlesData } from '@/lib/articles';
import { Calendar, ChevronRight } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'Makaleler | Avukat Yunus Aydın',
  description: 'Hukuki konularda güncel makaleler ve bilgilendirmeler.',
};

export default async function ArticlesPage() {
  const articles = await getSortedArticlesData();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Hukuki Makaleler</h1>
          <p className={styles.pageSubtitle}>
            Güncel hukuki gelişmeler, önemli yargıtay kararları ve çeşitli hukuk dallarındaki bilgilendirici yazılarımız.
          </p>
        </div>
      </div>

      <section className="section">
        <div className={`container ${styles.articlesGrid}`}>
          {articles.length === 0 ? (
            <p className={styles.noArticles}>Henüz makale bulunmamaktadır veya API bağlantısında sorun oluştu.</p>
          ) : (
            articles.map(({ slug, title, date, excerpt, category }) => (
              <article key={slug} className={styles.articleCard}>
                <div className={styles.articleMeta}>
                  <span className={styles.category}>{category}</span>
                  <span className={styles.date}>
                    <Calendar size={14} />
                    {new Date(date).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <h2 className={styles.articleTitle}>
                  {/* WordPress title HTML entities içerebilir, bu yüzden dangerouslySetInnerHTML ile basmak en güvenlisidir. */}
                  <Link href={`/makaleler/${slug}`} dangerouslySetInnerHTML={{ __html: title }}></Link>
                </h2>
                {/* WordPress excerpt HTML formatında döner. */}
                <div 
                  className={styles.excerpt} 
                  dangerouslySetInnerHTML={{ __html: excerpt }} 
                />
                <Link href={`/makaleler/${slug}`} className={styles.readMore}>
                  Devamını Oku <ChevronRight size={16} />
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
