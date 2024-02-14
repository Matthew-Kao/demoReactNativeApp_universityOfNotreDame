# React Native Expo App

This project is a React Native application built using Expo, depicting a User Profile Interface which provides the information of the User. The information include their Name, Email, Phone Number, Student ID and Avatar.

## Prerequisites

- Node.js (Recommended version: 16.13.0)
- npm (Node Package Manager)
- Expo CLI
- Xcode (for iOS Simulator) or Android Studio (for Android Emulator)

## Installation

1. Install Node.js:
   Download and install Node.js from nodejs.org. This project was developed with Node.js version 16.13.0.

2. Install Expo CLI:
   Install Expo CLI globally by running:
   npm install -g expo-cli

3. Clone the Repository:
   Clone this repository to your local machine by running:
   git clone https://github.com/Matthew-Kao/demoReactNativeApp_universityOfNotreDame.git

4. Install Dependencies:
   npm install

## Running the Project

After installing the prerequisites and dependencies, start the project with:
npm start
Then press i to launch the iOS Simulator, specifically tested on an iPhone 14 Pro Max simulator. Ensure Xcode is installed and the desired simulator is available.

## Known Issues and Fixes

Transform File Error: If encountering an error stating "Cannot read properties of undefined (reading 'transformFile')", ensure you're using Node.js version 16.13.0. Switch to this version using nvm (Node Version Manager) with:
nvm install 16.13.0

## Features

- The user would be able to change their profilePicture/Avatar by clicking the image. They would then get redirected to a page where they could choose from a list of images
- The user would also be able to change their Name, Phone Number, Email and Student ID by the arrow next to field. They would then get redirected to the EditScreen page. This page has validation checks according to the fields they want to edit.

## Submission

This project is submitted to The Lucy Family Institute. For any queries, contact Matthew Kao at matthewkao@berkeley.edu

Thank you for reviewing my project submission. Please feel free to contact me anytime if you have any questions regarding the project.
