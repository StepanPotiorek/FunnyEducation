const quoteSection = document.querySelector(".quote");
const form = document.querySelector(".form");
const countryInput = document.querySelector(".country-name");

// Functions to add a paragraph to a page
const paragraphToWebsite = (content, whereToAdd, color) => {
  const newParagraph = document.createElement("p");
  newParagraph.textContent = content;
  newParagraph.style.color = color;
  newParagraph.style.margin = "10px";
  whereToAdd.append(newParagraph);
};

// Functions to add a flag to a page
const addFlagToWebsite = (flagUrl, whereToAdd) => {
  const flagImage = document.createElement("img");
  flagImage.src = flagUrl; 
  flagImage.alt = "Country flag"; 
  flagImage.style.width = "150px"; 
  flagImage.style.marginTop = "20px"; 
  whereToAdd.append(flagImage);
};

// Event listener for sending form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const countryName = countryInput.value.trim(); // Trim whitespaces

  fetch("https://restcountries.com/v3.1/name/" + countryName)
    .then((response) => response.json())
    .then((data) => {
      // Clean up section
      quoteSection.textContent = "";

      // Added content
      paragraphToWebsite(data[0].capital[0], quoteSection, "red");
      paragraphToWebsite(data[0].name.common, quoteSection, "pink");
      paragraphToWebsite(data[0].region, quoteSection, "yellow");

      // Added flag
      addFlagToWebsite(data[0].flags.png, quoteSection);
    })
    .catch((error) => {
      console.error("Error fetching country data:", error);
      quoteSection.textContent = "Země nebyla nalezena.";
    });
});
