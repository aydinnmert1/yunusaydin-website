const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  console.log("Navigating to login page...");
  await page.goto('https://panel.yunusaydin.av.tr/wp-login.php');

  console.log("Filling credentials...");
  await page.fill('#user_login', 'admin');
  await page.fill('#user_pass', 'TPY$b%$4PK');
  await page.click('#wp-submit');
  
  await page.waitForLoadState('networkidle');
  console.log("Logged in!");

  // Step 1: Import ACF Settings
  console.log("Importing ACF JSON...");
  await page.goto('https://panel.yunusaydin.av.tr/wp-admin/edit.php?post_type=acf-field-group&page=acf-tools');
  const fileInput = await page.$('input[type="file"][name="acf_import_file"]');
  if (fileInput) {
    await fileInput.setInputFiles(path.join(__dirname, 'acf-ayarlar.json'));
    await page.evaluate(() => document.querySelector('input[name="acf_import_file"]').closest('form').submit());
    await page.waitForLoadState('networkidle');
    console.log("ACF Import successful.");
  } else {
    console.log("ACF Import file input not found, skipping...");
  }

  // Step 2: Create "Hakkımda" Page
  console.log("Creating Hakkımda page...");
  await page.goto('https://panel.yunusaydin.av.tr/wp-admin/post-new.php?post_type=page');
  // Wait for the Gutenberg editor or Classic editor
  try {
    // Check if Gutenberg
    await page.waitForSelector('.editor-post-title__input', { timeout: 5000 });
    await page.fill('.editor-post-title__input', 'Hakkımda');
    
    // Fill ACF fields for Hakkımda
    await page.fill('input[name="acf[field_hakkimda_alt_baslik]"]', 'Hukukun üstünlüğüne inanan, müvekkil odaklı ve çözüm üreten bir hukuk bürosu.');
    await page.fill('textarea[name="acf[field_hakkimda_p1]"]', 'Avukat Yunus Aydın, kariyeri boyunca sayısız hukuki uyuşmazlığın çözümünde rol almış, şeffaflık ve güven ilkelerinden ödün vermeden mesleğini icra etmektedir. Ceza Hukuku, Aile Hukuku ve Ticaret Hukuku başta olmak üzere geniş bir yelpazede danışmanlık hizmeti sunmaktadır.');
    await page.fill('textarea[name="acf[field_hakkimda_p2]"]', 'Amacımız; müvekkillerimizin hukuki sorunlarını en kısa sürede, en az maliyetle ve en etkili şekilde çözüme kavuşturmaktır. Her dosya için özel bir strateji belirleyerek, sürecin her aşamasında müvekkillerimizi bilgilendirmeyi ilke ediniyoruz.');
    await page.fill('input[name="acf[field_deneyim]"]', '10+');
    await page.fill('input[name="acf[field_dava]"]', '500+');
    await page.fill('input[name="acf[field_makale]"]', '50+');

    // Click Publish
    await page.click('.editor-post-publish-panel__toggle');
    await page.waitForTimeout(1000);
    await page.click('.editor-post-publish-button');
    await page.waitForLoadState('networkidle');
    console.log("Hakkımda published!");
  } catch (e) {
    console.log("Gutenberg not found or error:", e.message);
  }

  // Step 3: Create "İletişim" Page
  console.log("Creating İletişim page...");
  await page.goto('https://panel.yunusaydin.av.tr/wp-admin/post-new.php?post_type=page');
  try {
    await page.waitForSelector('.editor-post-title__input', { timeout: 5000 });
    await page.fill('.editor-post-title__input', 'İletişim');
    
    await page.fill('textarea[name="acf[field_iletisim_ust]"]', 'Hukuki sorunlarınızla ilgili detaylı bilgi almak ve randevu oluşturmak için bize ulaşın.');
    await page.fill('textarea[name="acf[field_iletisim_form]"]', 'Acil hukuki destek veya danışmanlık talepleriniz için aşağıdaki iletişim kanallarından bize ulaşabilirsiniz.');
    
    await page.click('.editor-post-publish-panel__toggle');
    await page.waitForTimeout(1000);
    await page.click('.editor-post-publish-button');
    await page.waitForLoadState('networkidle');
    console.log("İletişim published!");
  } catch (e) {
    console.log("Error:", e.message);
  }

  // Step 4: Create "Uzmanlık Alanları" Page
  console.log("Creating Uzmanlık Alanları page...");
  await page.goto('https://panel.yunusaydin.av.tr/wp-admin/post-new.php?post_type=page');
  try {
    await page.waitForSelector('.editor-post-title__input', { timeout: 5000 });
    await page.fill('.editor-post-title__input', 'Uzmanlık Alanları');
    
    await page.fill('textarea[name="acf[field_uzmanlik_ust]"]', 'Farklı hukuk dallarında edindiğimiz tecrübe ile ihtiyaç duyduğunuz alanda yanınızdayız.');
    await page.fill('input[name="acf[field_alan1_baslik]"]', 'Ceza Hukuku');
    await page.fill('textarea[name="acf[field_alan1_aciklama]"]', 'Soruşturma ve kovuşturma aşamalarında etkin ve çözüm odaklı avukatlık hizmeti.');
    await page.fill('input[name="acf[field_alan2_baslik]"]', 'Ticaret ve Şirketler Hukuku');
    await page.fill('textarea[name="acf[field_alan2_aciklama]"]', 'Şirket kuruluşları, sözleşmeler ve ticari uyuşmazlıklarda hukuki danışmanlık.');
    await page.fill('input[name="acf[field_alan3_baslik]"]', 'Aile Hukuku');
    await page.fill('textarea[name="acf[field_alan3_aciklama]"]', 'Boşanma, nafaka, velayet ve mal paylaşımı davalarında hassas ve gizlilik odaklı yaklaşım.');
    
    await page.click('.editor-post-publish-panel__toggle');
    await page.waitForTimeout(1000);
    await page.click('.editor-post-publish-button');
    await page.waitForLoadState('networkidle');
    console.log("Uzmanlık Alanları published!");
  } catch (e) {
    console.log("Error:", e.message);
  }

  // Step 5: Update "Ana Sayfa" (Global Info)
  console.log("Updating Ana Sayfa (post=10) with Global Info...");
  await page.goto('https://panel.yunusaydin.av.tr/wp-admin/post.php?post=10&action=edit');
  try {
    // Fill ACF fields for Global Contact Info
    await page.fill('input[name="acf[field_telefon]"]', '+90 (555) 123 45 67');
    await page.fill('input[name="acf[field_eposta]"]', 'info@yunusaydin.av.tr');
    await page.fill('textarea[name="acf[field_adres]"]', 'Adalet Mahallesi, Hukuk Plaza No:1 Kat:3 Merkez / Türkiye');
    await page.fill('input[name="acf[field_saatler]"]', 'Pazartesi - Cuma: 09:00 - 18:00');
    await page.fill('textarea[name="acf[field_footer_hakkinda]"]', 'Profesyonel, güvenilir ve çözüm odaklı hukuki danışmanlık hizmetleri. Müvekkillerimizin haklarını korumak önceliğimizdir.');

    // Click Update
    await page.click('.editor-post-publish-button');
    await page.waitForLoadState('networkidle');
    console.log("Ana Sayfa updated!");
  } catch (e) {
    console.log("Error:", e.message);
  }

  await browser.close();
  console.log("All tasks completed successfully!");
})();
