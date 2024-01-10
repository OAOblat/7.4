let page;

afterEach(() => {
  page.close();
});

describe("Github team page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  test("The h1 header content", async () => {
    await page.setDefaultTimeout(10000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1.h0-mktg");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  });

  test("The first link attribute", async () => {
    await page.setDefaultTimeout(5000);
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    await page.setDefaultTimeout(7000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });
});

describe("Github header menu tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com");
  });

  test("Page title should be 'GitHub Actions'", async () => {
    await page.setDefaultTimeout(5000);
    const mainMenuSelector = await page.$("nav > ul > li:nth-child(1)");
    await mainMenuSelector.click();
    const subMenuSelector = await page.$(
      "li.open ul > li:nth-child(1) > a > div"
    );
    await subMenuSelector.click();
    await page.waitForSelector("h3.mb-3");
    const title2 = await page.title();
    expect(title2).toEqual("Features • GitHub Actions · GitHub");
  });

  test("Page title should be 'GitHub Packages'", async () => {
    await page.setDefaultTimeout(6000);
    const mainMenuSelector = await page.$("nav > ul > li:nth-child(1)");
    await mainMenuSelector.click();
    const subMenuSelector = await page.$(
      "li.open ul > li:nth-child(2) > a > div"
    );
    await subMenuSelector.click();
    await page.waitForSelector("h4.h6-mktg");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub Packages: Your packages, at home with their code · GitHub"
    );
  });

  test("Page title should be 'GitHub for Startups'", async () => {
    await page.setDefaultTimeout(5000);
    const mainMenuSelector = await page.$("nav > ul > li:nth-child(2)");
    await mainMenuSelector.click();
    const subMenuSelector = await page.$(
      "li.open div:nth-child(1) > ul > li:nth-child(3) > a"
    );
    await subMenuSelector.click();
    await page.waitForSelector("h1.h1-mktg");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for Startups: Build your startup on GitHub · GitHub"
    );
  });
});
