const fs = require('fs');

async function createPages() {
  try {
    // 1. Get Login Cookies
    console.log("Logging in...");
    const loginRes = await fetch("http://panel.yunusaydin.av.tr/wp-login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "log=admin&pwd=TPY%24b%25%244PK&wp-submit=Log+In&redirect_to=%2Fwp-admin%2F&testcookie=1",
      redirect: "manual"
    });
    
    const cookies = loginRes.headers.get("set-cookie");
    if (!cookies || !cookies.includes("wordpress_logged_in")) {
      throw new Error("Failed to get login cookies");
    }
    
    const cookieString = cookies.split(', ').map(c => c.split(';')[0]).join('; ');
    console.log("Logged in successfully. Cookies acquired.");

    // 2. Get Nonce
    const adminRes = await fetch("http://panel.yunusaydin.av.tr/wp-admin/", {
      headers: { "Cookie": cookieString }
    });
    const adminHtml = await adminRes.text();
    const nonceMatch = adminHtml.match(/"wp-api"\s*:\s*\{"root".*?"nonce"\s*:\s*"([a-z0-9]+)"\}/);
    
    if (!nonceMatch) {
      throw new Error("Failed to get REST API nonce");
    }
    const nonce = nonceMatch[1];
    console.log("Nonce acquired:", nonce);

    // 3. Create Pages
    const pages = [
      { title: "Hakkımda", slug: "hakkimda", status: "publish" },
      { title: "İletişim", slug: "iletisim", status: "publish" },
      { title: "Uzmanlık Alanları", slug: "uzmanlik-alanlari", status: "publish" }
    ];

    for (const page of pages) {
      console.log(`Creating page: ${page.title}...`);
      const createRes = await fetch("http://panel.yunusaydin.av.tr/wp-json/wp/v2/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookieString,
          "X-WP-Nonce": nonce
        },
        body: JSON.stringify(page)
      });
      
      if (createRes.ok) {
        console.log(`Page '${page.title}' created successfully.`);
      } else {
        const err = await createRes.json();
        if (err.code === "rest_post_invalid_id" || err.code === "term_exists") {
           console.log(`Page '${page.title}' already exists.`);
        } else {
           console.error(`Failed to create '${page.title}':`, err);
        }
      }
    }
    
  } catch (error) {
    console.error("Error:", error);
  }
}

createPages();
