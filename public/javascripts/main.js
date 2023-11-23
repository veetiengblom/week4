document.addEventListener("DOMContentLoaded", () => {
  loadPage();
  userRecipe();
});

const loadPage = async () => {
  try {
    const response = await fetch("recipe/pizza");
    if (!response.ok) {
      throw new Error("HTTP Error: ${response.status}");
    }
    const data = await response.json();
    console.log(data);
    displayRecipe(data);
  } catch (error) {
    console.log("Error when loading the page: " + error.message);
  }
};

function displayRecipe(data) {
  const header = document.getElementById("recipe-name");
  header.textContent = data.name;

  const ingredients = document.getElementById("ingredients");
  console.log(data);
  const li1 = data.ingredients;
  li1.forEach((element) => {
    const ingredient = document.createElement("p");
    ingredient.textContent = element;
    ingredients.appendChild(ingredient);
  });

  const instructions = document.getElementById("instructions");
  const li2 = data.instructions;
  li2.forEach((element) => {
    const instruction = document.createElement("p");
    instruction.textContent = element;
    instructions.appendChild(instruction);
  });
}
const userRecipe = async () => {
  userIngredients = [];
  userInstructions = [];
  document
    .getElementById("add-ingredient")
    .addEventListener("click", function () {
      const userInput = document.getElementById("ingredients-text");
      userIngredients.push(userInput.value);
      userInput.value = "";
    });

  document
    .getElementById("add-instruction")
    .addEventListener("click", function () {
      const userInput = document.getElementById("instructions-text");
      userInstructions.push(userInput.value);
      userInput.value = "";
    });

  document.getElementById("submit").addEventListener("click", async () => {
    const name = document.getElementById("name-text");

    const obj = {
      name: name.value,
      instructions: userInstructions,
      ingredients: userIngredients,
    };
    console.log(obj);

    try {
      //addImage();
      const response = await fetch("/recipe/", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("HTTP Error: " + response.status);
      }
      const data = await response.json();
      console.log(data);
      displayRecipe(data);
    } catch (error) {
      console.log("Error when loading the page: " + error.message);
    }
    name.value = "";
  });
};

const addImage = async () => {
  const fileInput = document.getElementById("image-input");
  const formData = new FormData();

  const listOfFiles = fileInput.files;
  listOfFiles.forEach((element) => {
    formData.append("images", element);
  });

  try {
    const response = await fetch("/images", {
      method: "post",
      body: formData,
    });
  } catch (error) {
    console.log("Error when loading the page: " + error.message);
  }
};
