const puppeteer = require("puppeteer");
const fs = require("fs");
const mysql = require("mysql");
const axios = require("axios");
const request = require("request");

function CrateData(item) {
  let data = JSON.stringify(item);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3100/hoadonbanra",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();
  page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://hoadondientu.gdt.gov.vn/", {
    waitUntil: "networkidle2",
  });
  // await page.type('input[id="username"]', 'chikiet');
  // await page.type('input[id="password"]', '@hikiet88');
  // await page.click('button[id="loginbtn"]');
  await navigationPromise;
  await page.waitForSelector(".ant-modal-close");
  await page.click(".ant-modal-close");
  await page.waitForSelector(".home-header-menu-item");
  const elements = await page.$$(".home-header-menu-item");
  const lastElement = elements[elements.length - 1];
  lastElement.click();
  await page.waitForSelector('input[id="username"]');
  await page.waitForSelector('input[id="password"]');
  await page.waitForSelector(".home-tabs-login .bdtMvg");
  await page.type('input[id="username"]', "5900428904");
  await page.type('input[id="password"]', "@Hhp*2023");
  await page.waitForTimeout(10000);
  await page.click(".home-tabs-login .bdtMvg");
  await page.waitForSelector(".eItfNu");
  const tracuus = await page.$$(".eItfNu");
  const tracuu = tracuus[tracuus.length - 1];
  tracuu.click();

  await page.waitForSelector('a[href="/tra-cuu/tra-cuu-hoa-don"]');
  await page.click('a[href="/tra-cuu/tra-cuu-hoa-don"]');

  await page.waitForSelector("#tngay .ant-calendar-picker-input");
  await page.click("#tngay .ant-calendar-picker-input");

  await page.waitForSelector(".ant-calendar-month-select");
  await page.click(".ant-calendar-month-select");

  await page.waitForSelector('td[title="Thg 01"]');
  await page.click('td[title="Thg 01"]');

  await page.waitForSelector('td[title="1 tháng 1 năm 2023"]');
  await page.click('td[title="1 tháng 1 năm 2023"]');

  await page.waitForSelector(".ButtonAnt__Button-sc-p5q16s-0");
  await page.click(".ButtonAnt__Button-sc-p5q16s-0");

  await page.waitForTimeout(1000);
  const Soluongs = await page.$$('div[role="combobox"]');
  const Soluong = Soluongs[Soluongs.length - 1];
  Soluong.click();
  await page.waitForTimeout(3000);
  const ChonSoluongs = await page.$$('li[unselectable="on"]');
  const ChonSoluong = ChonSoluongs[ChonSoluongs.length - 1];
  ChonSoluong.click();
  await page.waitForTimeout(1000);
  const regex = /\d+/g;
  const TextSoTrang = await page.$eval(
    ".styles__PageIndex-sc-eevgvg-3",
    (element) => element.textContent
  );
  const SoTrang = TextSoTrang.match(regex)[1];
  console.log(SoTrang);
  await page.waitForTimeout(1000);
  const rows = await page.$$(".ant-table-row");
  for (const i = 1; i <= SoTrang; i++) {
    for (const row of rows) {
      const data = {}
      row.click();
      await page.waitForSelector(".kgBiib");
      await page.click(".kgBiib");
      await page.waitForTimeout(1000);
      const Hoadon = await page.$$('.bkEVUw');
      await page.waitForTimeout(1000);
      const elements = await page.$$('.bkEVUw .di-value');
        let Ngay =0
        let Thang =0
        let Nam =0
        for (let index = 0; index < elements.length; index++) {
          const element = elements[index];
          const text = await page.evaluate(element=>element.textContent,element)
            switch (index) {
              case 1: Thang = text
                break;
              case 2: Nam = text
                break;
              default: Ngay = text
                break;
            }
        }
        data.NgaytaoHD   = Nam+'-'+Thang+'-'+Ngay
        const MCCQTS = await page.$$('.cdheZW .di-value');
        for (let index = 0; index < MCCQTS.length; index++) {
          const MCCQT = MCCQTS[index];
          const text = await page.evaluate(MCCQT=>MCCQT.textContent,MCCQT)
          if(index==0)
          {
            data.MCCQT = text
          }
        }
      
      const tables = await page.$$('.res-tb');
      const listItem = await tables[0].$$('tbody tr');
      for (const item of listItem) {
        await page.waitForTimeout(1000);
        data.Tinhchat = await item.$eval("td:nth-child(2)",(element) => element.textContent);
        await page.waitForTimeout(1000);
        data.TenHH = await item.$eval("td:nth-child(3)",(element) => element.textContent);
        await page.waitForTimeout(1000);
        data.Donvitinh = await item.$eval("td:nth-child(4)",(element) => element.textContent);
        await page.waitForTimeout(1000);
        data.Soluong = await item.$eval("td:nth-child(5)",(element) => element.textContent);
        await page.waitForTimeout(1000);
        data.Dongia = await item.$eval("td:nth-child(6)",(element) => element.textContent);
        await page.waitForTimeout(1000);
        data.Chietkhau = await item.$eval("td:nth-child(7)",(element) => element.textContent);
        await page.waitForTimeout(1000);
        data.Thuesuat = await item.$eval("td:nth-child(8)",(element) => element.textContent);
        await page.waitForTimeout(1000);
        data.Thanhtienchuathue = await item.$eval("td:nth-child(9)",(element) => element.textContent);
        CrateData(data)
        await page.waitForTimeout(1000);
      //   console.log(data);
      }
      await page.waitForSelector(".ant-modal-close");
      await page.click(".ant-modal-close");
      await page.waitForTimeout(1000);
    }
    const NutNexts = await page.$$(".ButtonAnt__Button-sc-p5q16s-0");
    const NutNext = NutNexts[NutNexts.length - 1];
    NutNext.click();
    await page.waitForTimeout(1000);
  }
})();
