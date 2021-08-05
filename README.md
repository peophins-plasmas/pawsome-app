![Pawsome Logo](/assets/pawsome_logo.png)

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
* Add pets: Add detailed information about your pets
* Take photos: Take photos of yourself and of your pets
* Calendar: View tasks for each day, clearly labeled with the name of the pet the task is for, organized by time due 
* Assign tasks: Assign pet care tasks to any or all of your pets' caregivers, with date, time, and task description

## Technical Features
* Registration with email and password
* Read and write to Firestore
* Navigate with nested stack, drawer, and bottom navigators
* Take pictures with Expo Image picker
* Store pictures on Cloudinary
* Validate form data with Yup Validation
* Navigate between dates with CalendarStrip

![Pawprint](/assets/apple-touch-icon.png)

# Getting Started
## How to Seed Firestore:

node seed/populate.js ./seed/{NAME OF COLLECTION JSON}.json set {COLLECTION NAME}
https://www.youtube.com/watch?v=I11O0UVp8PQ

## To start app in simulator:

npm install
npm run start
or
npm run ios (for iPhone)
npm run android (for Android)


![Pawprint](/assets/apple-touch-icon.png)

# Creators:

Anna Vaigast
Brenda Wong
Rebekkah Jou
McKenna Warren

![Pawprint](/assets/apple-touch-icon.png)

# Docs:

Boilerplate:
https://github.com/instamobile/react-native-firebase

Firebase:
https://firebase.google.com/docs/firestore/query-data/get-data

