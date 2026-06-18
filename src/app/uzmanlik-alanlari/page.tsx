import { Scale, BookOpen, ShieldCheck, Briefcase, Users, Building2 } from "lucide-react";

export const metadata = {
  title: "Uzmanlık Alanları | Avukat Yunus Aydın",
  description: "Avukat Yunus Aydın'ın hukuki danışmanlık ve avukatlık hizmeti verdiği uzmanlık alanları.",
};

export default function PracticeAreasPage() {
  const areas = [
    {
      id: "ceza-hukuku",
      title: "Ceza Hukuku",
      icon: <Scale size={40} color="var(--color-secondary)" />,
      content: "Soruşturma ve kovuşturma evrelerinin tamamında, şüpheli, sanık, müşteki veya katılan vekili olarak hukuki destek sağlıyoruz. İfade alma, sorgu, tutuklamaya itiraz ve duruşma süreçlerinde müvekkillerimizin özgürlük ve haklarını en etkin şekilde savunuyoruz."
    },
    {
      id: "ticaret-hukuku",
      title: "Ticaret ve Şirketler Hukuku",
      icon: <Building2 size={40} color="var(--color-secondary)" />,
      content: "Şirket kuruluşları, ana sözleşme değişiklikleri, genel kurul toplantıları, birleşme ve devralmalar gibi kurumsal süreçlerde hukuki danışmanlık sunuyoruz. Ticari sözleşmelerin hazırlanması ve ticari uyuşmazlıkların çözümünde şirketlerin hukuki güvenliğini sağlıyoruz."
    },
    {
      id: "aile-hukuku",
      title: "Aile Hukuku",
      icon: <Users size={40} color="var(--color-secondary)" />,
      content: "Anlaşmalı ve çekişmeli boşanma davaları, nafaka, velayet, maddi ve manevi tazminat ile mal rejiminin tasfiyesi davalarında sürecin hassasiyetini gözeterek, müvekkillerimizin ve varsa çocukların menfaatlerini en üst düzeyde koruyoruz."
    },
    {
      id: "is-hukuku",
      title: "İş Hukuku",
      icon: <Briefcase size={40} color="var(--color-secondary)" />,
      content: "İşçi ve işveren arasındaki uyuşmazlıklarda, işe iade davaları, kıdem ve ihbar tazminatı, fazla mesai, yıllık izin alacakları gibi konularda hukuki danışmanlık ve dava vekilliği hizmeti veriyoruz."
    },
    {
      id: "gayrimenkul-hukuku",
      title: "Gayrimenkul Hukuku",
      icon: <BookOpen size={40} color="var(--color-secondary)" />,
      content: "Tapu iptal ve tescil davaları, müdahalenin men'i (el atmanın önlenmesi), ecrimisil, izale-i şüyu (ortaklığın giderilmesi) ile kiralayan ve kiracı arasındaki uyuşmazlıklarda (tahliye, kira tespiti) hukuki çözümler sunuyoruz."
    },
    {
      id: "tuketici-hukuku",
      title: "Tüketici Hukuku",
      icon: <ShieldCheck size={40} color="var(--color-secondary)" />,
      content: "Ayıplı mal ve hizmetlerden kaynaklanan uyuşmazlıklar, Tüketici Hakem Heyeti ve Tüketici Mahkemeleri nezdinde yürütülecek süreçlerde tüketicilerin haklarını savunuyoruz."
    }
  ];

  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'var(--color-primary)', color: '#fff', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>Uzmanlık Alanlarımız</h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Farklı hukuk dallarında edindiğimiz tecrübe ile ihtiyaç duyduğunuz alanda profesyonel destek sağlıyoruz.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {areas.map(area => (
              <div key={area.id} id={area.id} style={{ 
                backgroundColor: 'var(--color-surface)', 
                padding: '2.5rem', 
                borderRadius: 'var(--radius-lg)', 
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--color-border)',
                scrollMarginTop: '100px'
              }}>
                <div style={{ marginBottom: '1.5rem' }}>{area.icon}</div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{area.title}</h2>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>{area.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
