### Angular CLI
npm install -D @nx/angular
npx nx g @nx/angular:app fe_portfolio
npx nx g @angular/material:ng-add --project=fe_portfolio
npx nx g @nx/angular:setup-tailwind fe_portfolio
### package.json
  "scripts": {
    "start": "nx serve fe_portfolio",
    "build": "nx build fe_portfolio",
    "test": "nx test"
  },
### Git
git add .
git commit -m "update"
git push