# How to run the project

### To run the project use these tools versions:

Node v18 (18.20.3)
XCode >= 14.3.
Ruby 3.3.3
JDK 17

### To run the project use these commands

`npm install` - to install node modules

`cd ios && pod install` - to install pods

`react-native run-ios` - to run project to ios simulator

`react-native run-android` - to run projecto on android simular

# What can be added / improved in the future?

##### Api Url

Api url should be placed inside .env files and used from there. To simplify the work and convenience, this url was placed in config.ts. (only because it's test task).

##### Implement similar functionality as demonstrated in the reference.

https://sw-app-gilt.vercel.app/ - reference

Search functionality can be added. Global state such as Redux also can be added. To persist favorite character data across app closures or reloads, we can store this information in AsyncStorage.

Since this was **not a requirement** in the task file, it was not added.
