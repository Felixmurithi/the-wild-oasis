# HOW

use react query and form hook to set up the datam
form hooks to

## REACT_QUERY

what react query does is to enable the handling the of remote state that is fetched from some server, react query is able to handle the fetching of this data- keep it in sync, through state time and invalidate queries after some time keeping it, allows for actions to be called after sucess or error of submiting the mutation action, this can alsow be done more than once check useXreateCabin and Creaedit Cabin fom to see example

### setting up react query

1. initializing react query"@tanstack/react-query": "^4.36.1".
2. wrap everything in a query client provider
3. use the ReactQueryDevtools as a sibling of other comonneets that are wrapped in the provider

## Form hook

forn hook automates many of the html attributes of forms such as submiting, validation disabliong fields, events and in react allows for the direct handling of fields withiut creating states and controlling each field to check for changes as controlled components. see createeditform.js

### STYLING- styled componenets

1. another way of writing css- writing vanilla css of an element and assigning a component name to the element and using and resuing it as you like.

## TO-DO

1. Toast library- App.jsx and its use in other files
2. React Routing - index replace
3. supabase settup
4. create a modal using resuable hook
5. clone element docs
6. UseClickOutside.js
7. reuse the modal menu clickoutside pattern- build in the same manner + without being reusable + vannilla js
8. form bug, making the validation of discount false sometimed
9. infinte query or infinite scroll with react query

## JS

1. string + undefined will never be an error

2. how destructuring from an empty object works and why does it work with an empty object but not not an undefined object
   function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
   const { id: editId, ...editValues } = cabinToEdit;
   vs
   function CreateCabinForm({ cabinToEdit , onCloseModal }) {
   const { id: editId, ...editValues } = cabinToEdit;
3. //js- cant use at() with images arrays (file lits) ??

## React

// children.props.id ??

## setting up SUPABASE

1. craete account- craete tables- use the foreign key to link a table to foreign key row
2. create policies to enable selecting, reading, deleting, updating data

### setting app vite -eslint

1. npm vite@4
2. enter name- chooose react and js
3. npm i
4. npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev
5. create .eslintrc.json- and add { "extends : "react-app"}- to add react rules to eslint lint
6. in vite.config.js add import eslint from "vite-plugin-eslint";
7. in the same file -plugins array invoke -eslint()
