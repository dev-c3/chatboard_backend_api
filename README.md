## Before using the backend for any application please do the following.

1. Connect your ./db/knexfile.js to the database of your choosing.

2. Use ``` npm run migrate, npm run rollback``` to clear the tables or migrate the current schemas as defined in the ./db/migrations folder.

3.  Change the session secret and the salt rounds for inside ```./index.js``` and ```./routes/user/userController.js line 21 ```

#### Important details.

In the frontend you should be querying "localhost:8080/channels/" with a get method every 3-5 seconds in order to be refreshing the messages in each channel.


