# chef-online
Help people to search over 1,000,000 recipes. Depending on Edamam API, you can surf for more than 1 million recipes.
(https://ahmedmunir.github.io/chef-online/)
## Technologies Used:
-HTML/HTML5  
-CSS/CSS3  
-SVG  
-Vanilla Javascript  
-Webpack  
-babel  
-NPM  
-[Edamam API](https://developer.edamam.com/edamam-docs-recipe-api)

## Installation:
if you want to run this application locally, you need to install [NodeJS](https://nodejs.org/en/) to run [NPM](https://www.npmjs.com/) scripts.

## For locally development:
open [git](https://git-scm.com/) bash scripting and move to the directory of project.
```bash
npm install #to install all dependancies you need to run the project and you need to download devdependancies too.
npm run start #to run the project on local server which mostly will be http://localhost:8080/
```
## APP_key & APP_ID:
inside **src/js/modals**, you need to provide your own app_id & app_key after creating account on [Edamam](https://developer.edamam.com/edamam-recipe-api).

## Important Note:
you can clone the project and run it locally through index.html file, it will keep getting information from API without any problem, but you will face a problem at displaying SVG items, because SVG elements will not run without server (local or remote), so you need to install dependancies & devdepenancies to run local server to display SVG elements.

## To do in the Future:
Errors when enter wrong word, or server didn't respond.  
add Likes modal.
