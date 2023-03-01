/*
    Assignment 05
    Parth Prajapati
*/

$(document).ready(function () {
  
  // Define the ContentItem class
class ContentItem {
  constructor(id, name, description, category) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
  }

  updateContentItem(id, name, description, category) {
    if (id === this.id) {
      if (name !== null) this.name = name;
      if (description !== null) this.description = description;
      if (category !== null) this.category = category;
    }
  }

  toString() {
    return `<div class="content-item-wrapper" id="contentitem-${this.id}">
              <h2>${this.name}</h2>
              <p>${this.description}</p>
              <div>${this.category}</div>
            </div>`;
  }
}

// Create an array of ContentItems
const contentItems = [
  new ContentItem(0, "The Witcher", "Geralt of Rivia hunts monsters", "Fantasy"),
  new ContentItem(1, "Breaking Bad", "Walter White cooks meth", "Drama"),
  new ContentItem(2, "The Mandalorian", "Bounty hunter protects Baby Yoda", "Science Fiction"),
  new ContentItem(3, "Stranger Things", "Kids fight supernatural threats in the 80s", "Horror"),
  new ContentItem(4, "Naruto", "Ninja becomes Hokage", "Anime")
];

// Display the content items on the page
const $contentItemList = $("#content-item-list");

// Clear any existing content
$contentItemList.empty();

// Loop through the contentItems array and append each one to the content-item-list
for (const contentItem of contentItems) {
  const $contentItemWrapper = $(contentItem.toString());

  // Add some CSS styles to the content item wrapper
  $contentItemWrapper.css({
    "border": "1px solid black",
    "width": "50%",
    "padding": "10px",
    "margin": "auto",
    "margin-top": "20px",
    "margin-bottom": "20px"
  });

  // Add the content item wrapper to the content-item-list
  $contentItemList.append($contentItemWrapper);
}

// Display the theme of the content items
const $theme = $("#theme");
$theme.text("My Favorite TV Shows and Movies");



// Add two buttons to update ContentItems
const $updateSuccessButton = $("<button>").text("Update ContentItem (Success)");
const $updateFailureButton = $("<button>").text("Update ContentItem (Failure)");

// Add click event handlers to the buttons
$updateSuccessButton.on("click", function() {
contentItems[0].updateContentItem(0, "The Witcher 2", null, "Fantasy");
const $contentItemWrapper = $(contentItems[0].toString());
$contentItemList.find(`#contentitem-${contentItems[0].id}`).replaceWith($contentItemWrapper);
});

$updateFailureButton.on("click", function() {
contentItems[1].updateContentItem(0, "Breaking Bad 2", null, "Drama");
const $contentItemWrapper = $(contentItems[1].toString());
$contentItemList.find(`#contentitem-${contentItems[1].id}`).replaceWith($contentItemWrapper);
});

// Add the buttons to the page
$("body").append($updateSuccessButton);
$("body").append($updateFailureButton);

});


