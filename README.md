### Angular CLI
npm install -D @nx/angular
npx nx g @nx/angular:app fe_chikiet
npm install @angular/material && npx nx g @angular/material:ng-add --project=fe_chikiet
npx nx g @nx/angular:setup-tailwind fe_chikiet
### package.json
  "scripts": {
    "start": "nx serve fe_chikiet",
    "build": "nx build fe_chikiet",
    "test": "nx test"
  },
### Git CLI
git add .
git commit -m "update"
git push