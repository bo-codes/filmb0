# Welcome to filmb0

Check out a live version of filmb0 here: [filmb0](https://filmb0.herokuapp.com/images)

filmb0 is a clone of the website flickr, a photo sharing and archive application. The backend of filmb0 is built on express with a PostgresQL database. Frontend rendering it handled with React. Redux architecture is used to manage the data on the frontend.

<img width="2544" alt="Screen Shot 2022-07-05 at 6 38 22 AM" src="https://user-images.githubusercontent.com/99310710/177345838-ff6aa761-3d7b-4a8e-827c-91ec6562dfbd.png">


## Features & Implementation

For a list of the features/app functionality , follow this link: [Feature List](https://github.com/bo-codes/film-b0/wiki/Feature-List)

### Single-Page-App

React router and components

filmb0 is a single page app. All 'pages' are rendered at a root url '/' by a collection of shuffling react components. The React router handles the logic associated with component navigation and updates an addendum to the root route. Re-rendering of child components is done through the React API.

Frontend and Backend Interaction

filmb0 server interactions are limited to retrieval of data from and modification of the database. The front end stores the necessary information for rendering upon site entry. Other requests are made on a “need to know” basis by various React components. This minimizes info passed between the frontend and backend and allows for speedy re-rendering handled by React.

### Authentication

Auth Page

<img width="2560" alt="Screen Shot 2022-07-05 at 7 03 50 AM" src="https://user-images.githubusercontent.com/99310710/177346362-6c04b5f9-fea9-4a0c-b89f-bc3e34c2ad26.png">


Normal Authentication

Users of the site are required to authenticate or sign up. Performing any key action in the website will require the user to log in or sign up before doing so. The user model requires a unique username and password (not necessarily unique) for sign up. Upon account creation, user passwords are digested using the B-Crypt gem before being stored. Authentication uses B-Crypt to match passwords to password digests.

### Image CRUD

Attributes

Images are the most important Models of filmb0. All app utility centers around them.

The Image table has columns for the ```title```,```imageUrl```, ```userId```, and ``content```. ```title``` and ```content``` are string identifiers for users in the application interface. The imageUrl stores a link to the image being posted to be utilized later when rendering the photo. The userId is a foreign key that points to the associated image creator/author(a user). 

CRUD and redux architecture

filmb0 lets users create, read, update, and delete images. React components exist for each corresponding action in the app. Information needed for all components or user actions performed on a subcomponent are managed with redux. Click the following link for more on this:[Store Shape](https://github.com/bo-codes/filmb0/wiki/Store-Shape)


### Comments

Besides storing images, filmb0 also lets users comment on images.

Comment Model

There is a table in the filmb0 database for comments. This table has columns for imageId because each comment pertains to a specific image that was posted, and a userId which ties the given comment with the creator of said comment. This table gives us the ability to populate our image page with comments that were made and tied with that specific image. The list of comments for the given image is updated as comments are deleted or added.

To view all tables implemented in the project click the following link: [dbSchema](https://github.com/bo-codes/film-b0/wiki/dbSchema)
