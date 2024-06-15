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
    `<div id= '${person.index + 1}'class ='col'>
   <img src=${person.image} alt=${person.fullName}>
    <p> 
   <span> ${person.nickname}</span> <br>
   ${person.hogwartsHouse}<br>
    ${person.birthdate}     
    </p>
    </div>`
  );
};

const buildEachPerson = () => {
  people.forEach((person) => {
    addToCollection(person);
  });
};

const getTheTotalStatsInCollections = () => {
  const totalInCollections = document.querySelectorAll(".col");
  const collection = document.querySelectorAll(".collect");

  const text = [];

  totalInCollections.forEach((person) => {
    text.push(person.textContent);
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
    text.push(person.textContent);
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

const clickOnPictures = () => {
  const pictures = document.querySelectorAll("img");
  const main = document.querySelector(".characters-in-collect-container");
  const favorite = document.querySelector(".characters-in-favorite-container");
  pictures.forEach((picture) => {
    picture.addEventListener("click", (e) => {
      const moveTo = ![...e.target.parentElement.classList].includes("col")
        ? main
        : favorite;

      if ([...e.target.parentElement.classList].includes("fav")) {
        e.target.parentElement.classList.remove("fav");
        e.target.parentElement.classList.add("col");
        moveTo.append(e.target.parentElement);
        return;
      }
      e.target.parentElement.classList.remove("col");
      e.target.parentElement.classList.add("fav");
      moveTo.append(e.target.parentElement);

      getTheTotalStatsInFavorites();
      getTheTotalStatsInCollections();
    });
  });
};

const sortContainerChildren = (container, dir) => {
  [...container.children]
    .sort((a, b) => {
      nameA = a.querySelector("p span").textContent;
      nameB = b.querySelector("p span").textContent;
      console.log(nameA, nameB);
      console.log(nameA > nameB);

      if (nameA > nameB) return dir === "asc" ? 1 : -1;
      else if (nameB > nameA) return dir === "asc" ? -1 : 1;
      else return 0;
    })
    .forEach((item) => container.append(item));
};

const clickOnButtonSort = () => {
  const buttonContainer = document.querySelector(
    ".switch-order-container-collect"
  );
  return buttonContainer.addEventListener("click", (e) => {
    const mainContainer = document.querySelector(
      ".characters-in-collect-container"
    );
    const favContainer = document.querySelector(
      ".characters-in-favorite-container"
    );
    const direction = e.target.dataset.order;

    [mainContainer, favContainer].forEach((item) => {
      sortContainerChildren(item, direction);
    });
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
  clickOnPictures();
  clickOnButtonSort();
  return API;
};
fetchData();
