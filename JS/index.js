const charactersInCollectFavorites = document.querySelector(
  ".characters-in-favorite-container"
);

let people;

const charactersInCollectContainer = document.querySelector(
  ".characters-in-collect-container"
);

const charactersInCollectContainerParagraphs = document.querySelectorAll(
  ".characters-in-collect-container p"
);
const content = document.querySelectorAll("p.content");

let counter = 1;

let buttonTrack = 0;

const showPeople = () => {
  console.log(people);
};

const addToCollection = (person) => {
  charactersInCollectContainer.insertAdjacentHTML(
    "beforeend",
    `<div class='col' id= '${counter}'>
    <div class><img src=${person.image} alt=${person.fullName}><div/>
    <p class='content'> 
  ${person.nickname}  <br>
   ${person.hogwartsHouse} <br>
    ${person.birthdate}     
    </p>
    <div/>`
  );
  charactersInCollectFavorites.insertAdjacentHTML(
    "beforeend",
    `<div class='fav 'id= '${counter}'>
    <div class><img src=${person.image} alt=${person.fullName}><div/>
    <p class='content'> 
  ${person.nickname}  <br>
   ${person.hogwartsHouse} <br>
    ${person.birthdate}     
    </p>
    <div/>`
  );
  counter++;
  const favoritePeople = document.querySelectorAll(".fav");
  favoritePeople.forEach((person) => {
    person.style.display = "none";
  });
  const colPeople = document.querySelectorAll(".col");
  colPeople.forEach((person) => {
    person.style.display = "block";
  });
};

const buildEachPerson = () => {
  people.forEach((person) => {
    addToCollection(person);
  });
};

const getTheTotalStatsInCollections = () => {
  const totalInCollections = document.querySelectorAll(".col");
  const collection = document.querySelectorAll(".collect");

  console.log(totalInCollections);
  const text = [];

  totalInCollections.forEach((person) => {
    if (person.style.display === "block") {
      console.log(person);
      text.push(person.textContent);
    }
  });
  console.log(text);

  const Gryffindor = text.filter((names) => {
    return names.includes("Gryffindor");
  }).length;
  const Hufflepuff = text.filter((names) => {
    return names.includes("Hufflepuff");
  }).length;
  const Slytherin = text.filter((names) => {
    return names.includes("Slytherin");
  }).length;
  const Ravenclaw = text.filter((names) => {
    return names.includes("Ravenclaw");
  }).length;

  const house = [
    Hufflepuff + Slytherin + Gryffindor + Ravenclaw,
    Hufflepuff,
    Slytherin,
    Gryffindor,
    Ravenclaw,
  ];

  let i = 0;
  collection.forEach((space) => {
    space.textContent = house[i];
    i++;
  });
};
const getTheTotalStatsInFavorites = () => {
  const totalInFavorites = document.querySelectorAll(".fav");
  const favor = document.querySelectorAll(".favor");

  const text = [];

  totalInFavorites.forEach((person) => {
    if (person.style.display === "block") {
      console.log(person);
      text.push(person.textContent);
    }
  });

  const Gryffindor = text.filter((names) => {
    return names.includes("Gryffindor");
  }).length;
  const Hufflepuff = text.filter((names) => {
    return names.includes("Hufflepuff");
  }).length;
  const Slytherin = text.filter((names) => {
    return names.includes("Slytherin");
  }).length;
  const Ravenclaw = text.filter((names) => {
    return names.includes("Ravenclaw");
  }).length;

  const house = [
    Hufflepuff + Slytherin + Gryffindor + Ravenclaw,
    Hufflepuff,
    Slytherin,
    Gryffindor,
    Ravenclaw,
  ];

  let i = 0;
  favor.forEach((space) => {
    space.textContent = house[i];
    i++;
  });
};

const clickOnPicturesInCollections = () => {
  return charactersInCollectContainer.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.style.display = "none";
    const fav = document.querySelectorAll(".fav");
    fav.forEach((person) => {
      if (person.id === e.target.parentElement.parentElement.id) {
        person.style.display = "block";
      }
    });
    getTheTotalStatsInCollections();
    getTheTotalStatsInFavorites();
  });
};

const clickOnPicturesInFavorites = () => {
  return charactersInCollectFavorites.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.style.display = "none";
    const col = document.querySelectorAll(".col");
    col.forEach((person) => {
      if (person.id === e.target.parentElement.parentElement.id) {
        person.style.display = "block";
      }
    });
    getTheTotalStatsInFavorites();
    getTheTotalStatsInCollections();
  });
};

const clickOnButtonSort = () => {
  const buttonContainer = document.querySelector(
    ".switch-order-container-collect"
  );

  return buttonContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("A-Z") && buttonTrack === 1) {
      const collectionContainer = document.querySelector(
        ".characters-in-collect-container"
      );
      const collectionOfPeople = document.querySelectorAll(".col");

      const reverseCol = Array.from(collectionOfPeople).reverse();

      reverseCol.forEach((person) => {
        collectionContainer.append(person);
      });

      const favoriteContainer = document.querySelector(
        ".characters-in-favorite-container"
      );
      const favoritePeople = document.querySelectorAll(".fav");
      const reverseFav = Array.from(favoritePeople).reverse();
      reverseFav.forEach((person) => {
        favoriteContainer.append(person);
      });

      buttonTrack++;
    } else if (e.target.classList.contains("Z-A") && buttonTrack === 0) {
      const collectionContainer = document.querySelector(
        ".characters-in-collect-container"
      );
      const collectionOfPeople = document.querySelectorAll(".col");

      const reverseCol = Array.from(collectionOfPeople).reverse();

      reverseCol.forEach((person) => {
        collectionContainer.append(person);
      });

      const favoriteContainer = document.querySelector(
        ".characters-in-favorite-container"
      );
      const favoritePeople = document.querySelectorAll(".fav");
      const reverseFav = Array.from(favoritePeople).reverse();
      reverseFav.forEach((person) => {
        favoriteContainer.append(person);
      });
      buttonTrack++;
    }

    if (buttonTrack === 2) {
      buttonTrack = 0;
    }
  });
};

const fetchData = async () => {
  const API = await fetch(
    "https://potterapi-fedeperin.vercel.app/en/characters"
  )
    .then((res) => res.json())
    .then((res) => {
      people = res;
    });
  showPeople();
  buildEachPerson();
  getTheTotalStatsInCollections();
  getTheTotalStatsInFavorites();
  clickOnPicturesInCollections();
  clickOnPicturesInFavorites();
  clickOnButtonSort();
  return API;
};

fetchData();
