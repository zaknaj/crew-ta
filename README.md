### **DEMO: You can find this project running live [HERE](https://laughing-mahavira-43f205.netlify.app/)**

## Instructions

In the project directory, you can run:

### **`yarn start`**

Runs the app in the development mode.Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.

The page will reload if you make edits.You will also see any lint errors in the console.

### **`yarn build`**

Builds the app for production to the `build` folder.It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Features

Below are the additional features not mentioned in the coding assignment

- **Better search and filters:** You can search by tag, candidate name and/or job title. Only candidates that match all the filters are displayed.
- **Button to clear all the filters**
- 🔥 🔥 **Move multiple candidates:** When you click on a candidate picture, you can select them. Once one or more candidates are selected, a button appears that shows a menu. You can then click on the desired column and all the selected candidates will be moved there.
- **Load more:** In order to load more candidates from the back end, you have a button on the bottom of the page that allows you to fetch an additional batch of candidates and add them to the available ones. Filters are only applied on the currently loaded candidates (not all candidates in the server). If there are no more candidates to load, the button disappears.
- **Click on tag:** If you click on a tag in a candidate card, the filters are replaced by that tag.
- 🔥 🔥 **CTRL-Z to undo the last action (batch transfer or single transfer)**

## To do

Here are some of the improvements / additional features to add, were we to continue on this project for production.

- Close batch transfer menu when you click outside of it
- Scroll horizontally by grabbing background (Trello style)
- Show dummy cards for when candidates are initially loaded with animated background (Facebook loading style)
- When drag / dropping candidates, place them in the order where they are dropped (also possibility of reorganizing candidates order within same column)
- Lazy load images
- Optimize performance for large data
- Indicator for when CTRL+Z has been clicked (undo). Also an actual button for undoing visible on the screen.
- Keep a bigger history of actions for undo (currently only last action) as a stack. Pop for each undo.
