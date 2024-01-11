### Angular CLI
npm install -D @nx/angular
npx nx g @nx/angular:app fe_shop
npx nx g @angular/material:ng-add --project=fe_shop
npx nx g @nx/angular:setup-tailwind fe_shop
### package.json
  "scripts": {
    "start": "nx serve fe_shop",
    "build": "nx build fe_shop",
    "test": "nx test"
  },
### Git CLI
git add .
git commit -m "update"
git push