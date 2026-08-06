const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    // Log API responses for debugging
    page.on('response', async (resp) => {
      try {
        if (resp.url().includes('/api/auth')) {
          const txt = await resp.text();
          console.log('API RESP:', resp.url(), resp.status(), txt);
        }
      } catch (e) {
        console.log('API RESP READ ERROR', resp.url(), e.message);
      }
    });

    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));

    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'Admin123!');
    await Promise.all([
      page.waitForNavigation({ timeout: 5000 }).catch(() => null),
      page.click('button[type=submit]'),
    ]);

    const url = page.url();
    console.log('URL after submit:', url);

    // Check session endpoint from the browser context so cookies are included
    const body = await page.evaluate(async () => {
      const resp = await fetch('/api/auth/session', { credentials: 'include' });
      return await resp.text();
    });
    console.log('Session endpoint returned:', body);

    // Also log cookies visible to the page
    const browserCookies = await page.context().cookies();
    console.log('Browser cookies:', JSON.stringify(browserCookies));

    if (body && body !== 'null') {
      console.log('Sign-in appears successful.');
      process.exit(0);
    } else {
      console.error('Sign-in did not create a session.');
      process.exit(2);
    }
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
