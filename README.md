### Angular CLI
npm install -D @nx/angular
npx nx g @nx/angular:app fe_portfolio
### package.json
  "scripts": {
    "start": "nx serve fe_portfolio",
    "build": "nx build fe_portfolio",
    "test": "nx test"
  },