const state = {
  puppyList: [],
  singlePuppyDetails: {}
}
const header = document.querySelector(`header`);
const main = document.querySelector(`main`);

const getPuppies = async() => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-ft/players`);
  const jsonObject = await response.json();
  const allPuppies = jsonObject.data.players;
  state.puppyList = allPuppies;
  renderPuppies();
}

const renderPuppies = () => {
  main.innerHTML = `<img id="main-image" src="./main-image/puppy-bowl-pic.jpg" />`;
  const header = document.querySelector(`header`);
  header.innerHTML = `<h1>Puppy Bowl</h1>`;
  const form = document.createElement(`form`);
  const select = document.createElement(`select`);
  const option = document.createElement(`option`);
  option.innerText = `Choose a Puppy`;
  select.append(option);
  state.puppyList.forEach((singlePuppy) => {
    const option = document.createElement(`option`);
    option.innerText = singlePuppy.name;
    select.append(option);
  });

  select.addEventListener(`change`, (e) => {
      const findName = state.puppyList.find((puppy) => {
        return puppy.name === e.target.value;
      });
      state.singlePuppyDetails = findName;
      renderSinglePuppyDetails();
    });

  form.append(select);
  header.append(form);
}

const renderSinglePuppyDetails = () => {
  let teamName = state.singlePuppyDetails.teamId;
  if (teamName === 3678) {
    teamName = `Fluff`;
  } else {
    teamName = `Ruff`;
  }

  const puppyDetailsHTML = `
  <h1>${state.singlePuppyDetails.name}</h1>
  <section id="bio">
  <div id="left">
  <p>Breed: ${state.singlePuppyDetails.breed}</p>
  <p>Team: ${teamName}</p>
  <p>Status: ${state.singlePuppyDetails.status}</p>
  </div>
  <div id="right">
  <img class="bio-image" src="${state.singlePuppyDetails.imageUrl}" />
  </div>
  </section>
  `;

  const button = document.createElement(`button`);
  button.innerText = `Back`;
  button.addEventListener(`click`, () => {
    renderPuppies();
  });
  main.innerHTML = puppyDetailsHTML;
  main.append(button);
}

getPuppies();