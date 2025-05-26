# Refined prompts

They are structured in this way:

1. Subtitle is the tag from the repository
2. Then it comes the actual prompt
3. Finally, a section to follow up with verification of the results (if any)

## recipe-card

I want this to be the frontend of an application that is about sharing recipes.
The backend is an API system based on laravel.
This frontend is part of the laravel start up project with breeze and laravel sail.
This frontend is working with React and nextJS.
It uses tailwind for CSS @docs:laravel-docs @docs:nextjs-docs @docs:tailwind-css-docs 
Change the current dashboard page @page.js  to be instead a set or recipes.
The recipes are taken from the backend with this end point: localhost/api/recipes
Make sure you use the @axios file to make the request
it returns an array of records, which have these attributes: id, title, slug, description, ingredients, instructions, image_url, among others. Make sure the list of recipes is composed by a recipe card, that displays the image of the recipe, the title and the description of it. Consider a simple, but elegant look that matches current design and consider also responsive design.

### Verification

Make sure:
- next.config.js is configured for localhost:

```js
module.exports = {
    // output: "standalone",
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          //port: '3000',
          pathname: '/images/**',
          // search: '',
        },
      ],
    },
  }
```

- The link to details recipe is recipe (singular, not plural)
- axios is used

## categories-navbar

- I want to have a navigation bar in the header @Header.js , where the list of categories are shown.
- The categories list is gotten from the backend (http://localhost/api/categories).
- Make sure @axios is used for requests
- I want the categories to be shown as clickable images (from image attribute)
  - and displayed name below the image.
- I want the link for the categories to be redirected to `/category/[slug]`
  - where slug is taken from the information gotten from the API.
- I want that categories have the ability to show that they are the active ones if the route matches their slug
  - otherwise to show as inactive
- I want the categories to have a hover in different style
- I want the results to be cached so no excessive calls are done to the backend
- The fields returned for the category records are: name, slug, image
- Do not include the name, just the image, but use the name as an alt for the image

### Verification

Make sure:
- axios is used for the request

## images-logo-icon

**Not from AI**

Not from AI, but instead from svg and to convert to ico from online too https://www.svgrepo.com/ and convert with https://convertio.co

### Verification

Make sure:
- that props is included in the logo when changing ApplicationLogo
- change fill color to white if needed for favicon

## aggregated-visibility

@RecipeCard I want to add the following information in the Recipes shown:
- How many times it has been flagged as favorite
- The average rating
- How many times it has been rated
That information comes from these fields respectively:
- favorites_count
- ratings_average
- ratings_count
I want the information to be formatted like this: "[favorites_count] [heart_icon] [ratings_average] [star_icon] ([ratings_count]", examples:
`20+ [heart_icon] 3.5 [star_icon] (1.5k+)`
I want the icons taken from this library: @phosphor-icons/react. I want that information to be shown on the bottom left portion of the card

### Verification

Make sure:
- to put "use client" if issues are given for icons

## recipe-by-slug

I want now to create a page to see the actual recipe, the recipe page has to show all recipe information:
- title
- description
- ingredients
- instructions
- image (from image_url if present)
- servings
- cook time (taken from cook_time_hours and cook_time_minutes)
- preparation time (taken from prep_time_hours and prep_time_minutes)
- calories
The information should be shown in the following layout:
- Head section:
  - title
  - Image
  - Favorites and rating information
  - servings
  - Cook time
  - preparation time
  - calories
- Next section
  - All other information
- The page route should be in this format: `/recipe/[recipe-slug]`
- The page should call the backend at this endpoint: `/api/recipes/slug/[slug]` to get the recipe
- Make sure @axios is used for the request
- Fix any errors: instructions is a string, not an array, same for ingredients, install skeleton and card and cardcontent from shadcn if needed: npx shadcn@latest add card skeleton
- The page is inside (app)

### Verification

Make sure:
- Aggregated fields are present: `favorites_count`, `ratings_average`, `ratings_count`
- axios is used for requests

## clickable-recipes

now I want each card for recipes to link to the recipe detail page, using the recipe slug field, they should redirect to the route `/recipe/[slug]` when clicked

## dashboard-to-recipes-and-category-filter

Create the page that will contain only the recipes that belong to a particular category only.
The API endpoint from the backend that provides that information is: `localhost/api/recipes/category-slug/[category-slug]`.
Make sure @axios is used for request
Reuse the @RecipeCard to display the list of recipes in the new page.
Currently, is the category navigation @CategoryNav.js  that that have the links to the category pages

### Verification

Make sure:
- the file loads the categories from data without data.recipes
- axios is used for the requests

## search-page

I want to have a search page now, where users will be able to search for recipes and use different filters and criteria to search.
There's a local server that I have up with meilisearch at `http://localhost:7700` to which it can connect. I want the search page to use the react instant search capabilities. @MeiliSearch React . I want the search path to be inside the (app) folder. The index used for searching is "recipes", and the hits return the following information: id, title, slug, description, ingredients, instructions. Please reuse the @RecipeCard to show the information for hits in the page.
Add a "Search" navigation link in @Navigation
This is the index configuration:

```json
{
    "displayedAttributes": [
        "*"
    ],
    "searchableAttributes": [
        "title",
        "description",
        "ingredients",
        "instructions"
    ],
    "filterableAttributes": [
        "categories",
        "prep_time",
        "cook_time",
        "servings",
        "calories",
        "favorites_count",
        "ratings_count",
        "ratings_sum",
        "ratings_average",
        "servings",
        "calories"
    ],
    "sortableAttributes": [
        "comments_count",
        "created_at",
        "favorites_count",
        "ratings_average",
        "ratings_count",
        "ratings_sum"
    ],
    "rankingRules": [
        "words",
        "typo",
        "proximity",
        "attribute",
        "sort",
        "exactness"
    ],
    "stopWords": [],
    "nonSeparatorTokens": [],
    "separatorTokens": [],
    "dictionary": [],
    "synonyms": {},
    "distinctAttribute": null,
    "proximityPrecision": "byWord",
    "typoTolerance": {
        "enabled": true,
        "minWordSizeForTypos": {
            "oneTypo": 5,
            "twoTypos": 9
        },
        "disableOnWords": [],
        "disableOnAttributes": []
    },
    "faceting": {
        "maxValuesPerFacet": 100,
        "sortFacetValuesBy": {
            "*": "alpha"
        }
    },
    "pagination": {
        "maxTotalHits": 1000
    },
    "embedders": {},
    "searchCutoffMs": null,
    "localizedAttributes": null,
    "facetSearch": true,
    "prefixSearch": "indexingTime"
}
```

### Verification

Make sure:
- if there’s an error with "The `searchClient` must implement a `search` method", enclose searchClient with curly braces
- to specify the styles for list for Hits if they show wrong (1 single column, etc.) and for root: `root: 'w-full'`,
- to run `npm install instantsearch.css` and use it in the search page for better look
- to put class for item: `w-auto !p-0 !border-0`
- Add InstantSearch, SearchBox, Hits, RefinementList, Configure, Pagination, HitsPerPage, SortBy, ClearRefinements, CurrentRefinements,

## search-improvements

Add now also a refinement based on rating widget from algolia @web @docs:algolia. The attribute to filter by for rating from the index is: ratings_average 

### Verification

Make sure:
- Class for stars is:

```jsx
className={`ais-RatingMenu-starIcon ais-RatingMenu-starIcon—empty`}
```

- replace path for empty star for this: `d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"`

## favorite-functionality

now I want to have the ability as a user to flag a recipe as favorite.
There must be a heart icon, in the recipe detail page @page.js
- not filled if the recipe is not favorite yet by the current user
- and filled if the recipe is already flagged as favorite by the current user in the past.
Clicking the favorite heart icon would flip the favorite flag:
- From not favorite to favorite:
  - it calls this api to set as favorite: POST `localhost/api/favorites`, with this body:
    - user_id = current user ID
    - recipe_id = current recipe ID
  - it makes the heart now full with red color
- From favorite to not favorite:
  - it calls this api to remove favorite: DELETE `localhost/api/favorites/{id}`
  - it makes the heart now not full and with gray border
- Make sure @axios is used for the requests
The information to know if the current user flagged or not the current recipe as favorite, comes from the request already used, from this field: favorites. If that has a non empty array, it means the user flagged this as favorite
- I don’t want to lose visibility of what I already have for the aggregated fields

### Verification

Make sure:
- axios is used for the request

## ratings-functionality

Now I want to have the ability as a user to rate a recipe with stars in @page
There must be a line of star icons in the recipe detail page.
Not filled if the recipe has not been rated yet by the current user, and filled if the recipe has been already rated by the current user in the past.
It must show always 5 stars, and only the ones representing the rating should be filled and the other empty. If there is no rating at all by the current user, all of them should be empty.
Clicking the star icons would set a rating for the recipe according to the star being clicked:
- First star, rating is one
- Second star, rating is two
- and so on.
Clicking the stars should send a rating request to the backend:
- it calls this api to set the rating: POST `localhost/api/ratings`, with this body:
  - user_id = current user ID
  - recipe_id = current recipe ID
  - rating
- it makes the stars now full with yellow color to represent the rating
There must be a trash icon on the left of the rating
- it means that the rating can be removed for the current user
- it must be gray, disabled and empty if there's no rating, otherwise, it must be filled and clickable, when clicked:
  - it calls this api to remove favorite: DELETE `localhost/api/ratings/{id}`
  - it makes the star icons now not full and with yellow border
The information to know if the current user rated or not the current recipe, comes from the request already used, from this field: ratings. If that has a non empty array, it means the user rated this as recipe, and the value for the rating is on the stars field inside that array
- If there's already a value for a rating, instead of sending another POST request when another star is clicked, it should use a PATCH request instead. That way the record in the DB is updated, rather than inserting a new one.
- Make sure @axios is used for the requests
- I don’t want to lose visibility of what I already have for the aggregated fields

### Verification

Make sure:
- axios is used for the request
- either "rating" is used everywhere, or "star", but it has to be consistent

## recipes-creation

I want logged users now to have the ability to add recipes. The backend API to create recipes is `localhost/api/recipes`. This is an example of a request for required fields:

```json
{
    "user_id": 1,
    "title": "From postman 3",
    "description": "Test",
    "ingredients": "one, dos, trois, vier",
    "instructions": "cook and it will be ready",
    "image_url": "http://localhost:3000/images/recipes/no-dish-placeholder.jpeg",
    "slug": "from-postman-3",
    "servings": 4,
    "prep_time_hours": 0,
    "prep_time_minutes": 30,
    "cook_time_hours": 1,
    "cook_time_minutes": 0,
    "calories": 500,
    "categories": [1, 2]
}
```

Considerations for fields:
- user_id:
  - taken from the session
  - required
  - not visible in form, but sent in the request to create the recipe to the backend
- Title:
  - input box
  - required
- Description:
  - text area input
  - required
- ingredients:
  - text area input
  - required
- Instructions:
  - text area input
  - required
- image_url
  - what's the best strategy for this if images should be generated by AI, then saved / posted to be saved in the `public/images/recipes` folder?
  - this should be a URL sent to the backend
  - required
  - in the mean time, use this default value for it: `http://localhost:3000/images/recipes/no-dish-placeholder.jpeg`
- slug
  - required
  - auto generated based on title
- servings
  - numeric input
  - from 1 to 8
  - required
- preparation time
  - should be a combination of 2 inputs:
    - one for hour
    - another for time
  - required
- cook time
  - should be a combination of 2 inputs:
    - one for hour
    - another for time
  - required
- Calories
  - numeric input
  - required
- categories
  - a combo box (multi select)
  - optional
  - categories should come from the list of categories gotten from the backend from this endpoint: `localhost/api/categories`

Other considerations:
- the user should be redirected to a new page (My recipes) where:
  - Only recipes created by the user are shown
  - a success notification message should be shown after creating the recipe on success
- Validation should be present in the form
  - Errors should be shown at input level if any
  - a general error message should be shown too
  - inputs with errors should be highlighted
  - values that are correct should "survive" validation
- Make sure @axios is used for request
- create an entry for "Create Recipe" in the @navigation

### Verification

Make sure:
- axios is used for the request

## recipes-edit-page

I want to add now the ability to edit a recipe, with the same required considerations for adding a recipe as requested previously

### Verification

Make sure:
- axios is used for the request

## delete-functionality

now I want to implement the ability to delete recipes, with the same criteria than editing, meaning, button should be displayed in the recipe detail page, and only for the author of that recipe. There must be a confirmation dialog shown before actually sending the delete request to the backend, which is: `localhost/api/recipes/slug/{{slug}}`, use a button that has a trash icon and put it next to the edit recipe button from previous request.

### Verification

Make sure:
- axios is used for the request

## categories-in-recipes-detail

Show the categories the recipe belongs to in the recipe detail page @page
It should be shown as a badge, with the name of the category and with rounded border
The category information is in the categories attribute (which is an array) in the response when getting the recipe by slug,
the category name can be taken from name field under categories

## comments-implementations

I want to have now the ability for the user to add comments to the recipe. Consider the following:
- Only logged in users can add comments to the recipe.
- The comments can be added in the recipe detail page only. @page
- It should be a simple implementation, with a list of comments at the end of the page.
- It should show the user first,
  - then when the comment was created in a friendly way (3 days ago, 3 hours ago)
  - then the comment
  - then below the question,
  - then the name user who posted the question,
  - then how many replies it has with a symbol
    - (a triangle facing down or a caret) that it can be clicked to reveal the replies.
- Comments only can have one level replies, meaning, replies cannot have replies.
- Replies shouldn't low immediately on recipe page, but after clicking the symbol, by sending a request to the backend.
  - Replies are loaded by calling this api from the backend: `localhost/api/comments/{id}/replies`
- Comments should load when the page is loading.
  - In the meantime they load, a loading text should be displayed
- If the recipe has more than 10 comments, there should be a "Load more" button at the end
  - that allows to load more comments associated to that recipe, by calling this request: `localhost/api/comments/recipe-slug/spaghetti-carbonara`.
    - That request has pagination links and structure
- Both request for comments and for replies are paginated, they have this structure:

```json
{
  "current_page": number,
  "data": array,
  "first_page_url",
  "from",
  "last_page",
  "last_page_url",
  "links": [
    {
      "url",
      "label"
      "active"
    },
  ],
  "next_page_url",
  "path",
  "per_page",
  "prev_page_url",
  "to",
  "total"
}
```

- There should be a button that says: "Add comment" at the top of the list of the comments
  - When clicked, a modal should appear with a text area that allows the user to submit a comment
    - submissions are using this request: `localhost/api/comments` with body: recipe_id, content as required
    - make sure @axios is used for the requests
- There should be a button that says; "Reply" at the bottom of each comment
  - when clicked, a modal should appear with a test area that allows the user to submit a Reply
    - submissions are using this request: `localhost/api/comments` with body: recipe_id, content and parent_id (the id of the comment being replied)

### Verification

Make sure:
- axios is used for the request

## comments-edition

I want now for users to have the ability to edit their own comments. Consider the following
- Only comments that have the same user id should be eligible to be edited.
- There must be an "Edit" button shown at the right of the comment eligible to be edited.
- Make sure @axios is used for requests
- It must have a pencil icon too
- when the button is clicked:
  - a modal should appear, with a text area
    - showing the current comment
    - with an "Edit" button and a "Cancel" button
  - and the ability for the user to change it
- in the list of comments, I want the word "Edited" to appear if the created_date and the updated_date from it are different

### Verification

Make sure:
- axios is used for the request

## replies-editions

I want the users to have the ability to edit their own replies now. Consider:
- Components should be reused
  - Modal, etc.
- Logic should be reused
  - since replies share the same entity than comments
  - "Edited" word should be shown too
- Make sure @axios is used for requests

### Verification

Make sure:
- axios is used for the request

## new-badge-implementation

I want the recipes to have a badge saying "New" in the @recipecard, considering:
- if the recipe was created within the last week.
- the "new" badge should be shown in the recipe list
- The "new" badge should also be shown in the searchpage results for the hits
- It must be just a simple badge, but visible enough for user that the recipe is new
- It should be placed to the right of the recipe title
- It shouldn't be shown in the detail page for recipe

### Verification

Make sure:
- Convert Unix timestamp to milliseconds if needed

## openai-integration-setup

I want now to have the ability to integrate with openai.
- Set up the project to have integration with it
- For now don't implement any code functionality
  - just setup all dependencies and configurations requirements to start developing with it
- if you need further clarification, ask me questions and based on answers we can go from there.

## recipe-images-generation

Generated AI image with openai @web
- I want to have a way for users to submit their recipes with images generated by openai
  - based on information from the form being posted
- I want to have a "Generate recipe image" button in the creation page @page
  - the button should be only enabled after the following fields are filled from the form:
    - Title
    - Description
    - ingredients
    - Instructions
    - Categories
  - the button should be disabled if any of the values for those inputs is removed
- it should take all the information being inputted so far for the recipe:
  - Title
  - Description
  - ingredients
  - Instructions
  - Categories
- Then it should post that information to openai to request an image
  - for a plate for the recipe being posted
  - with a template like this: `Generate a plate for a recipe with title {title}, description {description}, ingredients {ingredients}, instructions {instructions}, categories {categories}`
    - where values should be replaced from the form being filled
  - The image should be formatted as jpeg
- once the button is clicked:
  - a loading spinner should appear
  - The button should be disabled in the meantime the image is generated
- Once the image is generated
  - The image should be shown
  - The generate button should disappear
  - with an "Accept" button
    - that would make the image to be uploaded to the frontend server in this folder: `public/images/recipes`
  - a "Reject" button
    - this will not update anything to the server and will remove the image from the form
    - if clicked, the generate button should appear again
- Once the form is submitted
  - The form should sent a field "image_url" having the URL of the image that was just generated

### Verification

Make sure:
- `public/images/recipes` exist in frontend
- this is in next.config.js:

```js
{
    protocol: 'http',
    hostname: 'localhost',
    port: '3000',
    pathname: '/images/**',
    // search: '',
},
```

## home-page

Home page design
- I want now to have a home page for guest, where the application is explained.
  - How to create recipes
  - how to view and search for recipes
  - features like:
    - AI powered search 
    - AI automatic generation for recipes
- It should have attracting elements like:
  - hero banners
  - explanation of the page
- it should explain:
  - what's the product about
  - how to create an account
  - how to search for recipes, create them, etc.
- it should be responsive
- it should have the logo and title of the application: "Worldwide recipes"
- it should have a call to action button that says: "Create account", amd that should redirect to the login page
- it should have a footer with:
  - Terms and conditions
  - Privacy
  - About us
  - Copyright
  - Social media

## wcag-home-page

are you able to evaluate if the home page is WCAG complaint?
help me to implement the following:
Adding skip links for keyboard users to bypass navigation
Implementing proper form validation messages
Adding proper ARIA landmarks
Including a proper meta description
Adding proper alt text for any images that might be added in the future

## github-actions

I'd like to consider github actions for this project
GitHub context, next.js context

## semantic-search

** This is manually done without AI assistance **

- https://www.meilisearch.com/docs/learn/ai_powered_search/getting_started_with_ai_search
- https://www.meilisearch.com/docs/guides/ai/openai

- Generate an embedding

```bash
curl \
  -X PATCH 'localhost:7700/indexes/kitchenware/settings/embedders' \
  -H 'Content-Type: application/json' \
  --data-binary '
{
  "recipes-openai": {
  	"source": "openAi",
    "model": "text-embedding-3-small",
    "apiKey": "OPEN_AI_API_KEY",
    "documentTemplate": "A recipe named '{{doc.title}}', whose description is '{{doc.description}}', and it's prepared with '{{doc.ingredients}}'"
  }
}'
```

- test AI search

```bash
curl \
  -X POST 'localhost:7700/indexes/recipes/search' \
  -H 'content-type: application/json' \
  --data-binary '{
    "q": "recipes with tomatoes",
    "hybrid": {
      "semanticRatio": 0.5,
      "embedder": "recipes-openai"
    }
  }'
```