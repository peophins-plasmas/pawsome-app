![Pawsome Logo](https://res.cloudinary.com/dx5gk8aso/image/upload/v1628709527/Screen_Shot_2021-08-11_at_1.17.19_PM_lfz03x.png)


![Pawsome Mockup](https://user-images.githubusercontent.com/73001148/129080553-77b67864-db24-44e5-b634-dd4c91aa99ca.png)
<a href='https://www.freepik.com/photos/brush'>This mockup has been designed using resources from Freepik.com - www.freepik.com</a>


## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Creators](#creators)
- [Docs](#docs)

# Introduction
Pawsome is a collaborative pet-care app for iOS that allows you and all your pets' caregivers to work together to take the very best care of your pets. 

You can keep of your pets' important information (such as name, image, food brand, weight, medications, and vet information) in a single, convenient location. Assign pet care tasks to caregivers so those caregivers know what care your pets need and when to do them, and check to see what tasks you've been assigned on different days.

Watch our full 4-minute demo video [here](https://www.youtube.com/watch?v=fapWIlNX2Uc) or a short one-minute demo [here](https://www.youtube.com/watch?v=3prtDpbnqqY).

## Tech Stack
* React Native
* Firebase (Firestore & Authentication)
* Cloudinary
* Formik & Yup
* Expo (and Expo Image Picker)
* Node.js

![Pawprint](/assets/apple-touch-icon.png)

# Features
## App Features
* Persistent login: Log in and stay logged in with Firebase Authentication

* Create a profile: Create a profile with information about yourself, and information that applies to all your pets, such as your vet information

* View pets and caregivers: See all your own pets and the pets you care for, and see all the caregivers for your pets, making it easy to find the information you're looking for

![Pet and Caretaker View](https://media.giphy.com/media/peBwBV1V9eolvSOq4b/giphy.gif)

* Add pets: Add detailed information about your pets 

![Add Pets Demo](https://media.giphy.com/media/igakamNRqXJezsYF3p/giphy.gif)

* Take photos: Take photos of yourself and of your pets

* Calendar: View tasks for each day, clearly labeled with the name of the pet the task is for, organized by time due 
* Assign tasks: Assign pet care tasks to any or all of your pets' caregivers, with date, time, and task description

![Calendar and Task Demo](https://media.giphy.com/media/7C2i5yADe7Qjuuc9CA/giphy.gif)

## Technical Features
* Registration with email and password
* Read and write to Firestore
* Navigate with nested stack, drawer, and bottom navigators
* Take pictures with Expo Image picker
* Store pictures on Cloudinary
* Validate form data with Yup Validation
* Navigate between dates with CalendarStrip

![Pawprint](/assets/apple-touch-icon.png)

## Getting Started

Fork and clone this repo. Then, npm install.

Create a Firebase config file:

````git
mkdir src/firebase && touch src/firebase/config.js
````

Add your Firebase configuration into src/firebase/config.js:

````javascript
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

if (process.env.NODE_ENV !== "production") require("../../secrets");

const firebaseConfig = {
  apiKey: 'YOUR_KEY_HERE_AIzaSyAOWH',
  authDomain: 'your-auth-domain-b1234.firebaseapp.com',
  databaseURL: 'https://your-database-name.firebaseio.com',
  projectId: 'your-project-id-1234',
  storageBucket: 'your-project-id-1234.appspot.com',
  messagingSenderId: '12345-insert-yourse',
  appId: 'insert yours: 1:1234:web:ee873bd1234c0deb7eba61ce',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }
````
Run 
````git 
npm start
````
and pick your simulator (see package.json for scripts)


## How to Seed Firestore with our seed data setup:

````git
node seed/populate.js ./seed/{NAME OF COLLECTION JSON}.json set {COLLECTION NAME}
````
[Video for seeding Firestore](https://www.youtube.com/watch?v=I11O0UVp8PQ)

## To start app in simulator:

npm install
npm run start
or
npm run ios (for iPhone)
npm run android (for Android)


![Pawprint](/assets/apple-touch-icon.png)

# Next Steps
The next steps for Pawsome include notifications for tasks and choosing the frequency of each task you want to add. We are also working to assign pet-sitters to our users so that they can view all of the necessary pet information. Another stretch goal is to incorportate a messaging feature within the app so that users and pet-sitters can interact with one another.


# Creators:

* Anna Vaigast: [GitHub](https://github.com/av1082) | [LinkedIn](https://www.linkedin.com/in/anna-vaigast/)
* Brenda Wong: [GitHub](https://github.com/brendawon) | [LinkedIn](https://www.linkedin.com/in/brenda-wong-rd/)
* Rebekkah Jou: [GitHub](https://github.com/RebekkahJou) | [LinkedIn](https://www.linkedin.com/in/rebekkah-niles-jou/)
* McKenna Warren: [GitHub](https://github.com/mckennakayyy) | [LinkedIn](https://www.linkedin.com/in/mckenna-warren/)

![Pawprint](/assets/apple-touch-icon.png)

# Docs:

Boilerplate:
https://github.com/instamobile/react-native-firebase

Firebase:
https://firebase.google.com/docs/firestore/query-data/get-data

