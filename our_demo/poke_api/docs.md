GET /pokemon
    respond with all pokemon and their associated region name

GET /pokemon/:id
    respond with specified pokemon, the associated origin and any associated trainers
    errors - 
        404 if pokemon not found

POST /pokemon
    respond with the newly created pokemon
    errors - 
        400 if user input is missing/invalid


PUT /pokemon/:id
    respond with the updated pokemon
    errors - 
        404 if pokemon not found
        400 if user input is invalid

DELETE /pokemon/:id
    respond with a message indicating successful deletion has occurred
    errors - 
        404 if pokemon not found