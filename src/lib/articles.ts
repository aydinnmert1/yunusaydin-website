// WordPress'ten dönecek makale verisi için tipler
export type WPArticle = {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  // WP API'sinden gelen diğer alanlar buraya eklenebilir
};

export type ArticleMetadata = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  category: string;
};

export type Article = ArticleMetadata & {
  content: string;
};

// API URL'sini çevresel değişkenlerden alıyoruz
const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://yunusaydin.av.tr/wp-json/wp/v2/posts';

/**
 * Tüm makaleleri WP REST API'den çeker ve kendi veri formatımıza çevirir.
 */
export async function getSortedArticlesData(): Promise<ArticleMetadata[]> {
  try {
    // Sadece gerekli alanları çekmek için performansı artırıyoruz
    const res = await fetch(`${WP_API_URL}?_fields=id,date,slug,title,excerpt&per_page=12`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch articles from WordPress API');
    }

    const posts: WPArticle[] = await res.json();

    return posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title.rendered,
      date: post.date,
      // WordPress excerpt HTML etiketleri ile döndüğü için basitçe temizliyoruz veya olduğu gibi alıyoruz.
      // Ekranda gösterirken dangerouslySetInnerHTML kullanacağımız için HTML kalsın.
      excerpt: post.excerpt.rendered,
      category: 'Hukuk' // Eğer kategori bilgisini çekmek isterseniz ?_embed parametresi ile kategorileri de fetch edebilirsiniz. Şimdilik sabit tutulmuştur.
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

/**
 * Belirli bir makaleyi (slug bazında) WP REST API'den çeker.
 */
export async function getArticleData(slug: string): Promise<Article | null> {
  try {
    // Slug üzerinden sorgu atıyoruz
    const res = await fetch(`${WP_API_URL}?slug=${slug}&_fields=id,date,slug,title,excerpt,content`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch article with slug: ${slug}`);
    }

    const posts: WPArticle[] = await res.json();

    // API bir dizi döndüğü için ilk elemanı alıyoruz
    if (posts.length === 0) {
      return null;
    }

    const post = posts[0];

    return {
      id: post.id,
      slug: post.slug,
      title: post.title.rendered,
      date: post.date,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      category: 'Hukuk'
    };
  } catch (error) {
    console.error(`Error fetching article [${slug}]:`, error);
    return null;
  }
}
