![](https://github.com/nds-fsd/luma/blob/main/docs/LOGO%20(2).png)

## Overview:

Welcome to our **Lumatic** repo! This project is the result of our master project, where we have developed an event website using the MERN stack.

## Core Business:

Welcome to **Lumatic**, your ultimate destination for discovering and managing events! Whether you're looking for concerts, workshops, conferences, or local meetups, our platform provides a seamless experience to explore and book your favorite events. With personalized recommendations, easy-to-use filters, and secure ticketing options, Lumatic ensures you never miss out on the fun. Join our community today and start experiencing events like never before!

## Key Features: 

Here are the key features of the Lumatic website:

- **Event Discovery**: Browse a wide variety of events including concerts, workshops, conferences, and local meetups.
- **Personalized Recommendations**: Receive event suggestions tailored to your interests and past activities.
- **User Accounts**: Create and manage personal accounts to track event history and preferences.
- **Event Listings**: Detailed descriptions, schedules, and locations for each event, including user reviews and ratings.
- **Notifications and Alerts**: Get notifications for upcoming events, ticket availability, and personalized event alerts.
- **Mobile Friendly**: Access the website and manage your events easily from any device.
  
These features ensure a comprehensive and user-friendly experience for event discovery and management.

## Main Implemented Libraries:

*	React [Javascript Library]
*	Jest/Supertest [Javascript Testing]
*	JsonWebToken [Secure data exchange]
*	Mongoose [MongoDB object modeling tool]
*	Node.js 
*	Express [Node.js framework]
*	Cloudinary [Image and Video API Platform]

## UI

## Home Page: 

At this page we have the main browser to discover the latest events. 
The header displays the navigation links, and access to the profile.

![](https://github.com/nds-fsd/luma/blob/main/docs/home.png)
 
## “Explorar Eventos” Page:

Our event exploration page is organized by cities, showcasing the latest events specific to each location. Additionally, you will have access to the "Featured Calendars" section, where the most popular events from all cities will be displayed.

- **Featured Calendars**:

This page provides a curated selection of events that have been highlighted due to their popularity, significance, or relevance. 
This section serves as a convenient way for users to discover and explore high-profile events across various categories and locations. Featured Calendars" ensures users stay informed about noteworthy events that align with their interests and preferences.

![](https://github.com/nds-fsd/luma/blob/main/docs/screencapture-localhost-3000-discoverevents-2024-07-13-19_38_29.png)


## Cities Event Page:
On this page, we've designed a space to showcase an iconic photo of the city alongside a map for precise city localization. Additionally, we provide the current local time for added convenience.
Furthermore, you'll find a comprehensive list of all events taking place in that same city. This list details a variety of events, from concerts and exhibitions to conferences and community events, ensuring that users can explore and actively participate in activities that interest them most in real-time.

![](https://github.com/nds-fsd/luma/blob/main/docs/screencapture-localhost-3000-city-66512b1570004594642af1b0-2024-07-13-19_39_41.png)


## Event Detail Page:

This page displays the specific event with the following features:
* Organization
*	Social media icons
*	Description
*	Time
*	Price
* Subscription box
  
![](https://github.com/nds-fsd/luma/blob/main/docs/Evento.png)

## Login:

If you are already registered in Lumatic, here you can login directly to check your subscribed events or your events.

![](https://github.com/nds-fsd/luma/blob/main/docs/screencapture-localhost-3000-login-2024-07-13-19_39_02.png)

## Registration:

This page has been meticulously crafted with both frontend and backend technologies to provide a seamless and secure registration experience.

![](https://github.com/nds-fsd/luma/blob/main/Register.png)
## Administrator page:

On this page you will find your central hub for managing and overseeing all your event-related activities. Here, you can easily navigate between events you've subscribed to and those you've organized.



## Event Create:

On this page, you can create an event directly to be uploaded to Lumatic for other users to view.
To create your first event, you must first be properly registered on the website.

![](https://github.com/nds-fsd/luma/blob/main/docs/screencapture-localhost-3000-eventcreate-2024-07-13-19_40_03.png)

## Installation:

-Install Dependencies:
Once you are inside the project directory, you need to install the project dependencies. Run the following command:
```bash
  npm install

```

- Create and configure the environment variables in the .env file
`MONGO_URL`

- Run the project in the terminal with the following command:
```bash
  npm run dev

```
- Navigate to `[https://lumatic.netlify.app/]` to view the application.
