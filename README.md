# SOST4Website
This is the repo for the Techpoint SOS Challenge - Telehealth Team 4.
We are ConnecTech, a team of innovators who aim to connect and process existing health solutions into one friendly platform.
Our main product is myHealthRadar, a platform designed to integrate with many popular health devices and wearables from companies such as Dexcom, Fitbit, Omron, and more. We strive to deliver the best user experience while working closely with our customers to continually improve our products. 

We also strive to offer providers analytical tools to properly evaluate patient health. This is accomplished with myHealthInsights--a library of functions that run in the background to notify patients and providers of any concerning health trends. These models are developed around documented research and what data we are given by health device companies.

You can checkout our project at [sosth4.web.app](https://sosth4.web.app/) although it will eventually be taken down.

## Navigating the project

The **Website** folder contains the node project for the myHealthRadar website. A .env file will be required and an example is included in the folder. Note that you will need to add an example users' credentials as we do an automatic login for demo purposes.
Run `npm install` and `npm start`in the directory to run. 

The **HealthAnalytics** folder contains Python functions (as a .ipynb or .py) that would have been used to notify patients and providers for certain health events as well as to process health data to generate a report. Each folder has a readme and citations to explain what is going on.

The **Backend** folder contains an intialized project for Cloud Functions, but should be disregarded.

## Packages used

Recompose
Material-UI
DX React Chart

## Sources
[Robin Wieruch's Firebase Authentication for React Tutorial](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial)

