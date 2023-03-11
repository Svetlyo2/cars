# Angular project for SoftUni course Angular April 2022

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Application Overview
This application was built with Angular that interacts with Firebase Database combined with Firebase Storage.

## Getting started

Make sure you have the Angular CLI installed globally.
Run ng serve for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Functionality overview
The application is a site called "MyCar" that allows users to publish and read ads for cars. An anonymous user should be able to access the home, register and login page.
A registered user can post, edit or delete his own ads.

## The general page breakdown looks like this:
### Anonymous users

•	**Home page**
![image](https://user-images.githubusercontent.com/41020366/224482289-4262788a-01e0-4984-8026-a5044ed58489.png)

•	**Sign in/Sign up pages**

Uses Firebase Authentication
![image](https://user-images.githubusercontent.com/41020366/224482344-2358e050-d1be-469a-a985-b341db979ad4.png)

### Registered users

•	**List All Ads**

Show a list of all ads, ordered by posting date, with links to display their details.
![image](https://user-images.githubusercontent.com/41020366/224482827-1aa81ab2-32dd-42cf-aca2-01e5dd91d8d6.png)

•	**Search**

When a user enters a search criteria, look in the database for partial matches and return a list of links to all ads, whose brand and model contains the input

•	**Details**

Load the ad from the database and display a page, containing its details and photos. Ad owner has the options to edit or delete the article.
![image](https://user-images.githubusercontent.com/41020366/224482896-beb4cb81-3242-4f0b-a7f2-3162ac4f024f.png)

•	**Sell my car**
Form for publishing a new add. The user becomes owner for the ad and the posting date is set to the current time.
![image](https://user-images.githubusercontent.com/41020366/224482990-802ae06d-1932-4846-b612-06eef2b10880.png)

•	**Edit / Delete**

An ad can be edited or deleted by its owner.

•	**My watchlist**

Users can add or remove ads on their own watchlist to easily find and review user's favorite ads later.

•	**My ads**

Displays all ads posted by the user.

## Features used:

•	Firebase Authentication

•	NGBootstrap for UI including responsive design

•	Firebase Storage for image storage

•	Page synchronization in realtime using subscription to Firebase Realtime Database

•	RxJS library operators (map, switchMap, combineLatest, finalize)

•	data sharing (multicasting) using Subject
