/* Step 1: using axios, send a GET request to the following URL 
           (replacing the placeholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

const cards = document.querySelector(".cards");

axios.get("https://api.github.com/users/jiangeyre")
  .then(response => {
    //console.log.(response.data.message);
    const data = response.data;
    cards.append(CreateCard(data));
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

axios.get("https://api.github.com/users/jiangeyre/followers").then(response => {
  response.data.map(xxx => {
    followersArray.push(xxx.login);
  })
})

function passTheGit(arr){
  arr.map(xxx => {
    axios.get("https://api.github.com/users/" + xxx).then(response => {
      const newGit = CreateCard(response.data);
      cards.append(newGit);
    })
  })
}



const githubFollowersProfile = followersArray.map(xxx => {
  return `https://api.github.com/users/${xxx}`;
})

githubFollowersProfile.forEach(xxx => {
  axios.get(xxx)
  .then(response => {
    const data = response.data;
    cards.append(CreateCard(data));
  })
  .catch(error => {
    console.log(error);
  });
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function CreateCard(obj){
  const
    card = document.createElement('div'),
    img = document.createElement('img'),
    cardInfo = document.createElement('div'),
    nameH3 = document.createElement('h3'),
    username = document.createElement('p'),
    userLocation = document.createElement('p'),
    userProfile = document.createElement('p'),
    userLink = document.createElement('a'),
    followersPar = document.createElement('p'),
    followingPar = document.createElement('p'),
    biography = document.createElement('p');

  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(nameH3);
  cardInfo.appendChild(username);
  cardInfo.appendChild(userLocation);
  cardInfo.appendChild(userProfile);
  cardInfo.appendChild(followersPar);
  cardInfo.appendChild(followingPar);
  cardInfo.appendChild(biography);

  userProfile.appendChild(userLink);

  card.classList.add('card');
  cardInfo.classList.add('card-info');
  nameH3.classList.add('name');
  username.classList.add('username');

  img.src = obj.avatar_url;
  nameH3.textContent = obj.name;
  username.textContent = obj.login;
  userLocation.textContent = `Location: ${obj.location}`;
  userLink.setAttribute("href", obj.html_url);
  userProfile.innerHTML = `Profile: <a href=${userLink}>${userLink}</a>`;
  followersPar.textContent = `Followers: ${obj.followers}`;
  followingPar.textContent = `Following: ${obj.following}`;
  biography.textContent = `Biography: ${obj.bio}`;

  let cards = document.querySelector(".cards");
  cards.appendChild(card);
  return cards;

}
setTimeout(passTheGit, 500, followersArray);

/*'DustinG98', 'RobertDGordon', 'BryanKAdams', 'Godnoken', 'astubbings', 'JacobWashburn', 'toddmurphy', 'MarinaBaskova', 'dtauraso', 'cjrobinson831', 'Thestartofyou'*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/