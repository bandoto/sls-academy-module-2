HOW TO USE IT:
 - CREATE AN .env FILE FOLLOWING THE .env.example WITH THE REQUIRED FIELDS

 - RUN BUILD COMMAND => npm run build

 - RUN APP AS DEV => npm run dev

API DOCS:

ROUTE TO CREATE SHORTLINK
POST: http://localhost:5000/short
  request: {"originalUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
  response: {"success": true,"data": "http://localhost:5000/NUE1g"}

ROUTE TO REDIRECT TO YOUR ORIGINAL LINK
GET: http://localhost:5000/NUE1g (short link of your link in post request)
  request: none
  response: none (you automatically redirect to a original link)

EXAMPLE: https://www.youtube.com/watch?v=dQw4w9WgXcQ === http://localhost:5000/NUE1g
