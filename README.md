# Pawsome

# How to Seed Firestore:

node seed/populate.js ./seed/{NAME OF COLLECTION JSON}.json set {COLLECTION NAME}
https://www.youtube.com/watch?v=I11O0UVp8PQ

# To start app in simulator:

npm install
npm run start
or
npm run ios (for iPhone)
npm run android (for Android)

# Creators:

Anna Vaigast
Brenda Wong
Rebekkah Jou
McKenna Warren

# Docs:

Boilerplate:
https://github.com/instamobile/react-native-firebase

Firebase:
https://firebase.google.com/docs/firestore/query-data/get-data

# Descriptive fields:

Users:

- ownedPetId : pets user owns
- caredPetId : pets user is caretaker for
- caretakers : caretakers who take care of user's pets
- sitterForUser : other users for whose pets this user acts as caretaker for
- coOwners : other owners of the same pet who can assign pet chores and edit pet

Pets:

- caretakerId : ids of users who act as caretakers for this pet
- ownerId : ids of users who own this pet
