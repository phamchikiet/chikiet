const puppeteer = require('puppeteer');
const fs = require("fs");
const mysql = require('mysql');

const request = require('request');
function FieldsCreate(data)
{
    request.post({
      headers: {'content-type': 'application/json'},
      url: 'https://timona.edu.vn/index.php?option=com_timona&task=Lichhen.FieldsCreate&format=raw',
      form: data
  }, function(error, response, body){
    console.log(body)

  });

}
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation()
  page.setViewport({ width: 1280, height:720 });
  await page.goto('https://hoadondientu.gdt.gov.vn/', { waitUntil: 'networkidle2' });
  // await page.type('input[id="username"]', 'chikiet');
  // await page.type('input[id="password"]', '@hikiet88');
  // await page.click('button[id="loginbtn"]');
  await navigationPromise;
  await page.waitForSelector('.ant-modal-close');
  await page.click('.ant-modal-close');
  await page.waitForSelector(".home-header-menu-item");
  const elements = await page.$$('.home-header-menu-item');
  const lastElement = elements[elements.length - 1];
  lastElement.click();
  await page.waitForSelector('input[id="username"]');
  await page.waitForSelector('input[id="password"]');
  await page.waitForSelector('.home-tabs-login .bdtMvg');
  await page.type('input[id="username"]', '5900428904');
  await page.type('input[id="password"]', '@Hhp*2023')
  await page.waitForTimeout(10000)
  await page.click('.home-tabs-login .bdtMvg');
  // await page.waitForSelector('a[href="/tra-cuu/tra-cuu-hoa-don"]');
  await page.waitForTimeout(10000)
  await page.click('a[href="/tra-cuu/tra-cuu-hoa-don"]');

  document.querySelector('#tngay .ant-calendar-picker-input').click()
  document.querySelector('.ant-calendar-month-select').click()
  document.querySelector('td[title="Thg 01"]').click()
  document.querySelector('td[title="1 tháng 1 năm 2023"]').click()
  document.querySelector('#dngay .ant-calendar-picker-input').click()
  document.querySelector('.ButtonAnt__Button-sc-p5q16s-0').click()
  // const elements = document.querySelectorAll('.ant-select-selection__rendered')
  // const lastElement = elements[elements.length - 1];
  // lastElement.click()
  // const elements = document.querySelectorAll('li[unselectable="on"]')
  // const lastElement = elements[elements.length - 1];
  // lastElement.click()
  const elements = document.querySelectorAll('.ant-table-row');
  for (const element of elements) {
    // Access element content or perform actions on it
    console.log(element.textContent);
  }
  await page.evaluate(() => {
    const elements = document.querySelectorAll('.ant-table-row');
    for (const element of elements) {
      // Access element properties or manipulate them using Puppeteer methods
      console.log(element.querySelector('td').innerText);
    }
  });
  document.querySelector('.kgBiib').click()
  document.querySelectorAll('.day .di-value')
  document.querySelectorAll('.res-tb')
  // lastElement.click()

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