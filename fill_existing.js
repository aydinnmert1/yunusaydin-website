const { chromium } = require('playwright');

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

  // --- Hakkımda (ID: 47) ---
  console.log("Filling Hakkımda...");
  await page.goto('https://panel.yunusaydin.av.tr/wp-admin/post.php?post=47&action=edit');
  try {
    await page.waitForSelector('.acf-field', { timeout: 15000 });
    await page.fill('input[name="acf[field_hakkimda_alt_baslik]"]', 'Hukukun üstünlüğüne inanan, müvekkil odaklı ve çözüm üreten bir hukuk bürosu.');
    await page.fill('textarea[name="acf[field_hakkimda_p1]"]', 'Avukat Yunus Aydın, kariyeri boyunca sayısız hukuki uyuşmazlığın çözümünde rol almış, şeffaflık ve güven ilkelerinden ödün vermeden mesleğini icra etmektedir. Ceza Hukuku, Aile Hukuku ve Ticaret Hukuku başta olmak üzere geniş bir yelpazede danışmanlık hizmeti sunmaktadır.');
    await page.fill('textarea[name="acf[field_hakkimda_p2]"]', 'Amacımız; müvekkillerimizin hukuki sorunlarını en kısa sürede, en az maliyetle ve en etkili şekilde çözüme kavuşturmaktır. Her dosya için özel bir strateji belirleyerek, sürecin her aşamasında müvekkillerimizi bilgilendirmeyi ilke ediniyoruz.');
    await page.fill('input[name="acf[field_deneyim]"]', '10+');
    await page.fill('input[name="acf[field_dava]"]', '500+');
    await page.fill('input[name="acf[field_makale]"]', '50+');
    
    // Click Update
    await page.evaluate(() => {
      const btn = document.querySelector('.editor-post-publish-button');
      if (btn) btn.click();
    });
    await page.waitForTimeout(3000);
    console.log("Hakkımda updated!");
  } catch (e) {
    console.log("Error Hakkımda:", e.message);
  }

  // --- İletişim (ID: 49) ---
  console.log("Filling İletişim...");
  await page.goto('https://panel.yunusaydin.av.tr/wp-admin/post.php?post=49&action=edit');
  try {
    await page.waitForSelector('.acf-field', { timeout: 15000 });
    await page.fill('textarea[name="acf[field_iletisim_ust]"]', 'Hukuki sorunlarınızla ilgili detaylı bilgi almak ve randevu oluşturmak için bize ulaşın.');
    await page.fill('textarea[name="acf[field_iletisim_form]"]', 'Acil hukuki destek veya danışmanlık talepleriniz için aşağıdaki iletişim kanallarından bize ulaşabilirsiniz.');
    
    await page.evaluate(() => {
      const btn = document.querySelector('.editor-post-publish-button');
      if (btn) btn.click();
    });
    await page.waitForTimeout(3000);
    console.log("İletişim updated!");
  } catch (e) {
    console.log("Error İletişim:", e.message);
  }

  // --- Uzmanlık Alanları (ID: 51) ---
  console.log("Filling Uzmanlık Alanları...");
  await page.goto('https://panel.yunusaydin.av.tr/wp-admin/post.php?post=51&action=edit');
  try {
    await page.waitForSelector('.acf-field', { timeout: 15000 });
    await page.fill('textarea[name="acf[field_uzmanlik_ust]"]', 'Farklı hukuk dallarında edindiğimiz tecrübe ile ihtiyaç duyduğunuz alanda yanınızdayız.');
    await page.fill('input[name="acf[field_alan1_baslik]"]', 'Ceza Hukuku');
    await page.fill('textarea[name="acf[field_alan1_aciklama]"]', 'Soruşturma ve kovuşturma aşamalarında etkin ve çözüm odaklı avukatlık hizmeti.');
    await page.fill('input[name="acf[field_alan2_baslik]"]', 'Ticaret ve Şirketler Hukuku');
    await page.fill('textarea[name="acf[field_alan2_aciklama]"]', 'Şirket kuruluşları, sözleşmeler ve ticari uyuşmazlıklarda hukuki danışmanlık.');
    await page.fill('input[name="acf[field_alan3_baslik]"]', 'Aile Hukuku');
    await page.fill('textarea[name="acf[field_alan3_aciklama]"]', 'Boşanma, nafaka, velayet ve mal paylaşımı davalarında hassas ve gizlilik odaklı yaklaşım.');
    
    await page.evaluate(() => {
      const btn = document.querySelector('.editor-post-publish-button');
      if (btn) btn.click();
    });
    await page.waitForTimeout(3000);
    console.log("Uzmanlık Alanları updated!");
  } catch (e) {
    console.log("Error Uzmanlık Alanları:", e.message);
  }

  // --- Ana Sayfa (Global Info - ID: 10) ---
  console.log("Filling Ana Sayfa (Global Info)...");
  await page.goto('https://panel.yunusaydin.av.tr/wp-admin/post.php?post=10&action=edit');
  try {
    await page.waitForSelector('.acf-field', { timeout: 15000 });
    await page.fill('input[name="acf[field_telefon]"]', '+90 (555) 123 45 67');
    await page.fill('input[name="acf[field_eposta]"]', 'info@yunusaydin.av.tr');
    await page.fill('textarea[name="acf[field_adres]"]', 'Adalet Mahallesi, Hukuk Plaza No:1 Kat:3 Merkez / Türkiye');
    await page.fill('input[name="acf[field_saatler]"]', 'Pazartesi - Cuma: 09:00 - 18:00');
    await page.fill('textarea[name="acf[field_footer_hakkinda]"]', 'Profesyonel, güvenilir ve çözüm odaklı hukuki danışmanlık hizmetleri. Müvekkillerimizin haklarını korumak önceliğimizdir.');

    await page.evaluate(() => {
      const btn = document.querySelector('.editor-post-publish-button');
      if (btn) btn.click();
    });
    await page.waitForTimeout(3000);
    console.log("Ana Sayfa updated!");
  } catch (e) {
    console.log("Error Ana Sayfa:", e.message);
  }

  await browser.close();
  console.log("Bütün sayfalar başarıyla dolduruldu!");
})();
