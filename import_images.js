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

  // Import ACF Settings
  console.log("Importing ACF Images JSON...");
  await page.goto('https://panel.yunusaydin.av.tr/wp-admin/edit.php?post_type=acf-field-group&page=acf-tools');
  const fileInput = await page.$('input[type="file"][name="acf_import_file"]');
  if (fileInput) {
    await fileInput.setInputFiles(path.join(__dirname, 'acf-resimler.json'));
    await page.evaluate(() => document.querySelector('input[name="acf_import_file"]').closest('form').submit());
    await page.waitForLoadState('networkidle');
    console.log("ACF Import successful.");
  }

  await browser.close();
  console.log("All tasks completed successfully!");
})();
