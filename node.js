const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://hoadondientu.gdt.gov.vn:30000/query/invoices/detail?nbmst=5900428904&khhdon=C23THP&shdon=6144&khmshdon=1',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1OTAwNDI4OTA0IiwidHlwZSI6MiwiZXhwIjoxNzAyODAyMzU1LCJpYXQiOjE3MDI3MTU5NTV9.-Bc3TfvRa9evaMYtUDOF_TL1ze2GwQoBbhrVCDk8_cBhPmxUH1kV_yHNGGjAgAvRUHFKF4xIU8QSRDYP62ED9w', 
    'Cookie': 'TS01c977ee=01dc12c85e1e23d86a5d67774d6757de0544c811ab2f947d972ed8743cc388697a41a41e8b39ecb6ef16222e6e769689b19529e947'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
