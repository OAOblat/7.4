let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com");
});

afterEach(() => {
  page.close();
});

describe("Github team page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1.h0-mktg");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  }, 6000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 2000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 3000);
});

test("Page title should be 'GitHub Actions'", async () => {
  const mainMenuSelector = await page.$("nav > ul > li:nth-child(1)");
  await mainMenuSelector.click();
  const subMenuSelector = await page.$(
    "li.open ul > li:nth-child(1) > a > div"
  );
  await subMenuSelector.click();
  await page.waitForSelector("h3.mb-3");
  const title2 = await page.title();
  expect(title2).toEqual("Features • GitHub Actions · GitHub");
}, 6000);

test("Page title should be 'GitHub Packages'", async () => {
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
}, 4000);

test("Page title should be 'GitHub for Startups'", async () => {
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
}, 4000);
