const puppeteer = require("puppeteer");
const fs = require("fs");
const mysql = require("mysql");
const axios = require("axios");

const request = require("request");
function CrateData(item) {
  let data = JSON.stringify({
    Title: item,
  });

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
  await page.waitForTimeout(12000);
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
  await page.waitForTimeout(1000);
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
      await page.waitForTimeout(1000);
      row.click();
      await page.waitForSelector(".kgBiib");
      await page.click(".kgBiib");
      await page.waitForTimeout(1000);
      await page.waitForSelector(".ant-modal-close");
      await page.click(".ant-modal-close");
      await page.waitForTimeout(1000);
    }
    const NutNexts = await page.$$(".ButtonAnt__Button-sc-p5q16s-0");
    const NutNext = NutNexts[NutNexts.length - 1];
    NutNext.click();
    await page.waitForTimeout(1000);
  }

  // const elements = document.querySelectorAll('.ant-table-row');
  // for (const element of elements) {
  //   // Access element content or perform actions on it
  //   console.log(element.textContent);
  // }
  // await page.evaluate(() => {
  //   const elements = document.querySelectorAll('.ant-table-row');
  //   for (const element of elements) {
  //     // Access element properties or manipulate them using Puppeteer methods
  //     console.log(element.querySelector('td').innerText);
  //   }
  // });
  // document.querySelector('.kgBiib').click()
  // document.querySelectorAll('.day .di-value')
  // document.querySelectorAll('.res-tb')

  // const elements = await page.evaluate(() => Array.from(document.querySelectorAll(".home-header-menu-item")));
  // const lastElement = elements[elements.length - 1];
  // console.log(lastElement);
  // const elements = await page.querySelectorAll('.home-header-menu-item');
  // const lastElement = elements[elements.length - 1];
  // console.log(lastElement);
  // const menuItems = document.querySelectorAll(".home-header-menu-item");
  // const element = await page.evaluate(() => {
  //   return document.querySelector(".my-element");
  // });
  // const lastMenuItem = menuItems[menuItems.length - 1];
  // setInterval(() => {
  //   page.reload();
  // },10 * 60 * 1000);
  //   await page.waitForSelector('a[data-search="theo ngay"]');
  //   await page.click('a[data-search="theo ngay"]');

  //   await navigationPromise;

  //   await page.waitForSelector('#ScheduleStatus');
  //   await page.click('#ScheduleStatus');

  //   await page.waitForSelector('#cbbAppoinmentStatus div[data-value="6"]');
  //   await page.click('#cbbAppoinmentStatus div[data-value="6"]');

  //   await page.waitForSelector('#date');
  //   await page.click('#date');

  //   //await page.waitForSelector('.flatpickr-prev-month');
  //   //await page.click('.flatpickr-prev-month');

  //   await page.waitForSelector('span[aria-label="November 23, 2020"]');
  //   await page.click('span[aria-label="November 23, 2020"]');
  //   await page.waitForSelector('#date');
  //   await page.click('#date');
  //   await page.waitForSelector('span[aria-label="November 23, 2020"]');
  //   await page.click('span[aria-label="November 23, 2020"]');
  //   await page.waitForSelector('span[aria-label="November 23, 2020"]');
  //   await page.click('span[aria-label="November 23, 2020"]');

  //   await page.waitForSelector('#ScheduleStatus');
  //   await page.click('#ScheduleStatus');

  //   await page.waitForSelector('#cbbAppoinmentStatus div[data-value="8"]');
  //   await page.click('#cbbAppoinmentStatus div[data-value="8"]');

  //   await page.waitForSelector('#dtContentAppointmentByDayListBody tr');
  //   const lhs = await page.evaluate(() => {
  //     let trs = document.querySelectorAll("#dtContentAppointmentByDayListBody tr");
  //     let links = [];
  //     let links2 = [];
  //     trs.forEach(item => {
  //       var links1 = [];
  //         let tds= item.querySelectorAll('td');
  //           tds.forEach(function(value, index) {
  //             switch(index) {
  //               case 4:
  //                 links1.push('"field6":"'+value.querySelector('span:first-child').textContent.trim()+'"');
  //                    break;
  //               case 6:
  //                 links1.push('"field1":"'+value.textContent.trim()+'"');
  //                 break;
  //               case 8:
  //                 let value1 = value.querySelector('span:first-child');
  //                 let value2 = value.querySelector('span:last-child');
  //                 links1.push('"field2":"'+value1.textContent.trim()+'"');
  //                 links1.push('"field3":"'+value2.textContent.trim()+'"');
  //                 break;
  //               case 9:
  //                 links1.push('"field4":"'+value.textContent.trim()+'"');
  //                   break;
  //                case 11:
  //                 links1.push('"field5":"'+value.querySelector('span:first-child').textContent.trim()+'"');
  //                    break;
  //               default:
  //                 // code block
  //             }
  //           }
  //         )
  //       links.push('{'+links1+'}');
  //     });
  //     //links2.push('['+links+']');
  //     return links;
  //   });

  //   // await fs.writeFile(`dulieu.json`, lhs, function(err) {
  //   //   if (err) throw err;
  //   //   console.log("Luu Thanh Cong");
  //   // });
  //   //console.log(lhs);
  //   lhs.forEach(function(value, index){
  //       FieldsCreate(value);
  // });

  //  await browser.close();
})();
