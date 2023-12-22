### Angular CLI
npm install -D @nx/angular
npx nx g @nx/angular:app fe_ketoan
npm install @angular/material && npx nx g @angular/material:ng-add --project=fe_ketoan
npx nx g @nx/angular:setup-tailwind fe_ketoan
### package.json
  "scripts": {
    "start": "nx serve fe_ketoan",
    "build": "nx build fe_ketoan",
    "test": "nx test"
  },
### Git CLI
git add .
git commit -m "update"
git push