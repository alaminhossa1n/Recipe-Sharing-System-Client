# Recipe Sharing System - Client

Welcome to the client-side repository for the Recipe Sharing System.

## Overview

This application is a recipe sharing platform that allows users to browse, share, and purchase recipes. Built using React and Firebase for authentication, it offers a seamless user experience with features like Google Login, coin-based recipe access, and the ability to add new recipes. Users can also buy additional coins to unlock more recipes.

## Live Link

Explore the live version of the site: [Recipe Sharing System](https://recipe-sharing-ah.netlify.app/)

## Repository

Access the codebase and contribute to the project: [GitHub Repository](https://github.com/alaminhossa1n/Recipe-Sharing-System-Client)

## Features

- **User Authentication**: Google Authentication via Firebase.
- **Recipe Browsing**: Public access to view available recipes.
- **Recipe Details**: Users can view detailed recipes by spending coins.
- **Add Recipes**: Authenticated users can add new recipes and earn coins.
- **Coin Management**: Users can buy coins and manage their balance.
- **User Reactions**: Logged in users can react to recipes.
- **Filtering and Search**: Filter recipes by category and country, and search by title.
- **Infinite Scrolling**: Continuously load more recipes as the user scrolls.
- **Suggestions**: Recipe suggestions based on category or country.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/alaminhossa1n/Recipe-Sharing-System-Client.git
   ```

2. Install dependencies:

   ```bash
   cd Recipe-Sharing-System-Client
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   This will start the development server, and you can access the application at [http://localhost:3000/](http://localhost:3000/).

## Scripts

- **Development Server**:

  ```bash
  npm run dev
  ```

- **Build**:

  ```bash
  npm run build
  ```

- **Linting**:

  ```bash
  npm run lint
  ```

- **Preview Build**:

  ```bash
  npm run preview
  ```

## Layout

The website is based on a traditional one-column layout. It features a Navbar at the top, route-based rendering in the middle, and a footer with contact information at the bottom.

### Navbar

The Navbar displays the website name/logo and navigation links, which vary based on the user's login status.

- **Before Login**:
  - Home
  - Recipes
  - Google Login

- **After Login**:
  - Home
  - Recipes
  - Add Recipes
  - Coins
  - User Image
  - Logout

### Footer

The footer includes links to social profiles and contact information.

## HomePage

### Banner

An attractive banner with a slogan and two buttons:
- "See recipes" - Redirects to the all-recipes route.
- "Add recipes" - Redirects to the Add recipes route or prompts Google login.

### Success Stories

Highlights the system's benefits with counters for recipes and users using [react-countup](https://www.npmjs.com/package/react-countup).

### Dev Info

Information about the developer, including educational background, experience, and technologies used.

## Login and Registration System

Users can log in or register using Google Authentication via Firebase. Successful login stores user information in the database with 50 default coins.

## Add Recipes

A private route where authenticated users can add recipes using a form with fields for:
- Recipe Name
- Recipe Image (via imgbb)
- Recipe Details
- Embedded YouTube Video Code
- Country
- Category

## All Recipes

Public route displaying all recipes in a card view, showing:
- Recipe Name
- Recipe Image
- Purchased By
- Creator Email
- Country
- "View The Recipe" Button

## Recipe Detail

A private route displaying all information about a specific recipe, including an embedded YouTube video.

## Purchase Coins

Users can purchase coins to unlock more recipes. Options include:
- 100 coins for 1 dollar
- 500 coins for 5 dollars
- 1000 coins for 10 dollars

## Security

- JWT-based authorization system for authenticated users.
- Secure API endpoints using middleware.

## Utilities

- **User Reaction System**: Add/remove reactions to recipes.
- **Filtering System**: Filter recipes by category and country.
- **Search System**: Search for recipes by title.
- **Infinite Scrolling System**: Load more recipes as the user scrolls.
- **Suggestion System**: Suggest recipes with the same category or country on the recipe detail page.

## Contributor

- [Al-Amin Hossain](https://www.linkedin.com/in/alaminhossa1n/)
  - LinkedIn: [Al-Amin Hossain](https://www.linkedin.com/in/alaminhossa1n/)
  - GitHub: [alaminhossa1n](https://github.com/alaminhossa1n)

Feel free to contribute and improve the Recipe Sharing System!

---

Happy cooking! 🍲