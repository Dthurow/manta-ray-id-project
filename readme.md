Manta Ray ID Project
=================
Upgraded site for the manta pacific research foundation's ID project website


Project Organization
------------

### ← index.html
The home page, all HTML is here

### ← style.css

CSS styles taken from [this project](https://github.com/kacieguthrie/manta-ray-demo)

### ← script.js

All javascript. Uses VueJS and a small amount of jquery. Entry point is in the "created" function, which calls the GetContent().
This hits the API to load all mantas. VueJS then loops through the newly returned manta rays and generates the HTML needed for the initial
information displayed on the site. It puts in a filler "loading" gif for the image, since the returned mantas doesn't have an image path.
The code then loops through the returned mantas, and requests the Best Venteral Photo's photo object
from the API. It pulls in the path to that image, and then sets that manta ray's ImagePath property using the custom Vue.set() function.
This triggers vue to re-load the image on the webpage.

### ← images

Has only the loading gif displayed while fetching the images, and the manta pacific research foundation's logo



Third-Party Javascript Libraries Used
------------

### VueJS
[Code Website](https://vuejs.org/)

Templating javascript framework. Lets you create javascript arrays/fields/objects, and then create HTML templates based on those properties. 
When the javascript data is updated, it auto-magically updates the HTML to match. Also supports event-driven programming

### Jquery Modal
[Code Website](https://github.com/kylefox/jquery-modal)

A simple & lightweight method of displaying modal windows with jQuery.
Added as part of [this project](https://github.com/kacieguthrie/manta-ray-demo), left in since it does make modal display very simple.
Used to display the manta ray details, the "About" pop-up, and the "Report a Sighting" pop up

### Jquery
[Code Website](https://jquery.com/)

Jquery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. 

Used for some very simple HTML manipulation, also needed for jquery Modal library.



