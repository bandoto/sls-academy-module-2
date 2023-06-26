HOW TO USE IT:
 - CREATE AN .env FILE FOLLOWING THE .env.example WITH THE REQUIRED FIELDS

 - RUN BUILD COMMAND => npm run build

 - RUN APP AS DEV => npm run dev

API DOCS:

ROUTE TO GET LOCATION FROM IP:
http://localhost:5000/location => 
  request: {"ip": "95.46.157.0"}
  response: {"success":true,"data":{"country":"Ukraine","from":"95.46.157.0","to":"95.46.157.255"}}

ROUTE TO GET YOUR IP:
http://localhost:5000/my_location || https://ngrok-link.ngrok-free.app/my_location
  request: none
  response: {"success":true,"data":{"country":"Ukraine","from":"95.46.157.0","to":"95.46.157.255"}}

  !IMPORTANT: If you run the server locally, then for the correct display of the ip, configure the program "Ngrok".
    RUN NGROK SERVER: ngrok http 5000
    
