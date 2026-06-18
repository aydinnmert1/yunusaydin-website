import { notFound } from 'next/navigation';
import { getArticleData, getSortedArticlesData } from '@/lib/articles';
import Link from 'next/link';
import { Calendar, ChevronLeft, Tag } from 'lucide-react';
import styles from './page.module.css';

type Props = {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getSortedArticlesData();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const article = await getArticleData(resolvedParams.slug);
  
  if (!article) {
    return {
      title: 'Makale Bulunamadı',
    };
  }
  
  // Strip HTML tags from excerpt for meta description
  const cleanDescription = article.excerpt.replace(/<[^>]+>/g, '').trim();
  const cleanTitle = article.title.replace(/<[^>]+>/g, '').trim();
  
  return {
    title: `${cleanTitle} | Avukat Yunus Aydın`,
    description: cleanDescription,
  };
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = await getArticleData(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.pageWrapper}>
      <article className={styles.articleContainer}>
        <div className={`container ${styles.innerContainer}`}>
          <Link href="/makaleler" className={styles.backLink}>
            <ChevronLeft size={16} /> Makalelere Dön
          </Link>
          
          <header className={styles.header}>
            <div className={styles.meta}>
              <span className={styles.category}>
                <Tag size={14} /> {article.category}
              </span>
              <span className={styles.date}>
                <Calendar size={14} /> 
                {new Date(article.date).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            {/* Title may contain HTML entities */}
            <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: article.title }} />
          </header>

          <div 
            className={`wp-content ${styles.content}`}
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />
        </div>
      </article>
    </div>
  );
}
