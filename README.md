# Pawsome

# How to Seed Firestore:

node seed/populate.js ./seed/{NAME OF COLLECTION JSON}.json set {COLLECTION NAME}
https://www.youtube.com/watch?v=I11O0UVp8PQ

# Getting Started
Fork and clone this repo. Then, npm install.

Create a Firebase config file:

````git
mkdir src/firebaseSpecs && touch src/firebaseSpecs/config.js
````

Add your Firebase configuration into src/firebaseSpecs/config.js:

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
