1. Clone the repo
2. npm i
3. Download the env from the mail sent and paste it inside the first folder with src and node_modules
4. Run the SQL queries in your local PostgreSQL database via PgAdmin from src/sql/queries.sql
5. npm run dev
6. Refer API doc to better understand how to run the API's in backend: https://documenter.getpostman.com/view/22921906/2sB2j3CsSg

Things to Remember 
1. After user signUp, user is set to inactive.Activate the user via verify-email endpoint
2. generate JWT token after hitting the verify-email endpoint
3. This JWT token has a validation of 1hr and need to be send in headers "Authorizaton" for all /products API's