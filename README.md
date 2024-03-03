### Angular CLI
npm install -D @nx/angular
npx nx g @nx/angular:app fecsvc
npm install @angular/material && npx nx g @angular/material:ng-add --project=fecsvc
npx nx g @nx/angular:setup-tailwind fecsvc
### package.json
  "scripts": {
    "start": "nx serve fecsvc",
    "build": "nx build fecsvc",
    "test": "nx test"
  },
### Git CLI
git add .
git commit -m "update"
git push