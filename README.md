# Community Front End
Throughout my time at General Assembly’s software engineer immersive, one of the things that I often come back to is how much I enjoy the collaborative atmosphere and community of the campus. I wanted to pay homage to that for my full-stack project by building Community.  In Community, you can meet up virtually with friends or strangers to discuss anything you want to. Whether that be programming related or talking about last night’s game.

The front end of this project relied heavily on HTML’s canvas element which, while was difficult, proved to be a great challenge and made consider and rethink a lot of my original planning.

## Technologies Used

* JavaScript
* Ruby
* Rails
* HTML5
* CSS3
* Bootstrap
* jQuery
* Ajax
* Heroku
* moment.js

## Planning  

Planning started by creating my wireframe and ERD to establish my goal. Breaking that into steps and milestones, I first started by attacking the backend and creating my tables. I had mapped out the relationships I needed ahead of time to cut-back on any hiccups that I would encounter.  When that was established, I jumped into canvas and started working on keydown events and player movement. After I had tackled the basics, I started to create my views so I could better test user authorization and character creation. From there, I decided to add a personal stretch goal of messaging.  After fiddling around with a chat feature, I couldn’t come up with a display that I was happy with and came up with the idea to attach messaging to speech bubbles above player heads to give it a more retro-gaming aesthetic.


## Future Iterations

Some things that I would really like to implement would be player collision detection. I had white-boarded the logic but didn’t have time to add the functionality. Another feature would be NPC(non-playable-characters) to interact with. If I had more time, I would consider websockets to take some of the heavy lifting off of the client.  Community was a two birds with one stone project. I’d like to stay consistent with updates to it as it started as a personal project that I was able to implement into a project. I can imagine it being a much larger scale game that I can periodically add further substance to but for the sake of meeting requirements think I excelled in creating a basic game engine that I can add to.  

## Wireframe

![Community Wireframe](https://i.imgur.com/nhVYqll.png)

## User Stories

#### Auth

As a user, I want to be able create an account.

As a user, I want to be able to sign in with a created account

As a user, I want to be able to update my password

As a user, I want to be able to logout

#### Character

As a user, I want to be able to create a character

As a user, I want to be able to play as that character

As a user, I want to be able to delete my character

As a user, I want to be able to update my character to reflect changes made

#### Messaging

As a user, I want to be able to send messages

As a user, I want to be able to receive messages

## Links

### [Front-end Client](https://mmarsden89.github.io/community-game/)

### [Backend Heroku Link](https://polar-forest-19026.herokuapp.com/)

### [Front-end Github Repository](https://github.com/mmarsden89/community-game)

### [Back-end Github Repository](https://github.com/mmarsden89/community-game-api)

### Licensing

According to the rules of the LPC all art submissions were dual licensed under both GNU GPL 3.0 and CC-BY-SA 3.0. These art submissions are considered all images present in the directory `spritesheets` and it's subdirectories. Further work produced in this repository is licensed under the same terms.

CC-BY-SA 3.0:
 - http://creativecommons.org/licenses/by-sa/3.0/
 - See the file: [cc-by-sa-3.0](cc-by-sa-3_0.txt)

GNU GPL 3.0:
 - http://www.gnu.org/licenses/gpl-3.0.html
 - See the file: [gpl-3.0](gpl-3_0.txt)
