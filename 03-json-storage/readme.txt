HOW TO USE IT:
 - CREATE AN .env FILE FOLLOWING THE .env.example WITH THE REQUIRED FIELDS

 - RUN BUILD COMMAND => npm run build

 - RUN APP AS DEV => npm run dev

API DOCS:

ROUTE TO CREATE JSON FILE (REQUIRED: "demo_bucket" - name of folder, "hello" - name of file)
PUT: http://localhost:5000/demo_bucket/hello
  request: {"hello": "world"}
  
ROUTE TO READ CREATED FILE BY FOLDER + NAME (REQUIRED: "demo_bucket" - name of folder, "hello" - name of file)
GET: http://localhost:5000/demo_bucket/hello
  request: none
  response: {"hello": "world"}
