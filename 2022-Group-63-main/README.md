# Documentation and Project report

## 1. Introduction 
*As our project encompasses a complete overview over a traditional web engineering project, being composed of both a backend and a frontend, as well as making use of external tools for specialized functionality and efficient storage in an external database, the resulting technology is rather extensive.*

## 2. Technology Stack
*We are employing the following technologies:*

### 2.1 Languages Used

#### 2.1.1 JavaScript
*JavaScript is one of the most used languages for the employment of apps of the World Wide Web. Based on its clear, powerful syntax and deploy-ability, JS represented a well-fitting choice for the purpose of this project.NodeJS, one of the technologies that we will be discussing in the next few lines is written in JS*

#### 2.1.2 HyperText Markup Language
*HyperText Markup Language, abbreviated to HTML, is one of the most extensively used languages for the design of web pages.
Due to its simple syntax and comprehensive documentation, we have decided that it is also useful for the scope of this project.*

### 2.1.3 CSS
*CSS is an assisting technology for Markup languages, such as HTML that describes the aspect of a web document. It comes only natural that we would also resort to using its functionalities as the presenetation for a web application is of uttermost importance for a user*

## 2.2 Node JS
*Node JS is an open-source, cross platform enviroment for running a JavaScript defined backend.*

## 2.3 ExpressJS
*ExpressJS is a framework for developing web applications, that provides an extensive set of functionalities for them, for both the web and mobile versions.
For the scope of this project, we have used ExpressJS as our web server, as it is minimal and flexible, characteristics which we considered to be a good fit.*

## 2.4 MongoDB Atlas
*MongoDB Atlas is a fully-managed cloud database that handles all the complexity of deploying, managing, and healing your deployments on the cloud service provider of your choice. We originally started with MongoDB Compass which stores the database locally but we realised later it was much more manageable and testable this way.*

## 2.5 React JS
*React is an open-source JavaScript library for building the frontend of web applications, by creating components of user interfaces.
We are using React as the foundation for the frontend part of the project.*

## 2.6 React Bootstrap
*React-Bootstrap is library for React components, that offers native Bootstrap elements. We have used this technology as it can be used for creating a pleasant and interesting user interface, as it is easy and straightforward to employ.*

## 2.7 Docker
*Docker is a software platform that allows you to build, test and deploy applications quickly. You can start our application in the terminal by enetering 'docker compose up'*.

## Endpoints
*We tested our endpoints by using Swagger Preview which is a Visual Studio code extension which allows you to convert a spec.yaml file into an interactive file. We would run our backend and then test all of our endpoints and checking for all the correct responses. 
We did run into some trouble with edge cases but had most of our issues with the PUT endpoint in Songs.*

Update: *The frontend has been implemented and the endpoints can be tested as following:*
- The search page contains the endpoints to search for songs by id or name and to update and delete by id.

- The upload page is used to post a song. The fields popularity and duration need to be greater than 0 and release date needs to be in the form YYYY-MM-DD.

- The artists page contains the endpoints to search a list of songs or a summary of the artists by id or name, when returing a list of songs you can delete them from here.

- The most popular page contains the endpoints to return the most popular songs or artists based on some queries.
   
## Milestones and Requirements:
Requirement 1: *This was pretty straight forward for us as we found it easy to follow other examples of how restful API works and how to use it.*

Requirement 2: *We actually somehow brushed over this requirement in the beginning but thats to feedback from our TA he pointed it out to us, allowing us to make the appropraite fixes. Again this step wasnt too difficult.*

Requirement 3: *This was self explainatory although our API documentation isnt the nicest looking (could do with some love) it explains everything well enough for an outside user to get an understandable enough grasp of how our endpoints work*

Requirement 4: *We found this step moderately challenging. We found it hardest to connect to our database but once we got that working everything else sort of fell into place(e.g once we got our first GET endpoint for songs by id every other endpoint seemed to follow the same proceedure more or less making it simple enough to finish out our backend*

Requirement 5: *We assumed this step was going to be a lot easier than the backend but we really got stuck for a long time on connecting our backend to our frontened. We tried multiple different methods mostly involving react apps but could not seem to send requests to our backend appropriatley, but thankfully we got it done in the end. Design of the user interface was fun! and not too hard more so a small bit tedious just trying to get react icons,navBars ect. in the correct places*

Requirement 6: *I guess this file counts for this requirement*

Requirement 7: *We were able to get this working although due to us messing around with our frontend so many times we had to also fix our docker file a lot of times too*

Milestones: *We reached all of our deadlines pretty effectively all of our feeback was positive although there was a lot of criticism it was usually stuff to do with us overlooking certain areas and never about us have bad code practice or anything like that.* 

Update: *The frontend has been implemented and it was not as hard as we initially thought, we just weren't able to find a good example of how a frontend project was implemented along with the stress of the deadline and exams. But after having more time available after the exams and (sadly enough) after the deadline we were able to figure out something ourselves and ended up with this. We think we managed to make a decent looking website.*

## What we learned
During the making of this project we learned how to make a functioning web page. At a glance a webpage looks fairly easy to make, but from the user interface you can't what's under the hood. And oh boy is that a little bit more complicated. But with our foundation of programming it is definitely doable. During the lectures you get introducded to the theory of web engineering which was very helpful for practice, but for this project you kind of just get thrown into the deep end. Which is of course not a bad thing, since figuring things out by working in a team was an enjoyable and valuable experience. The API specifaction is explained pretty well in the tutorial, but the tutorials after that weren't too useful in our case. This is because we used different frameworks for our project of course but also because the one from the tutorial is quite advanced (in our eyes) because the guy has been coding for a few years for sure. So we had to figure out the backend and frontend for ourselves. After reading 20+ (lost count) documentations we learned how to structure a database for easy querying. How to make a backend from our previously created API specification and how to make a nice looking page that uses the backend to fetch our data from the database. Also using docker for easy deployment on other devices. All in all, this has been a very educational project and we enjoyed our journey.

## Bugs and improvement points:
With programming, inevitably come bugs. We will state the most severe bugs and improvement points here:

- Since Songs and Artists are two seperate collections in the database deleting something from one will not delete it from the other and vice versa. Since this project is not about the database though we figured it is not worth fixing for now.(Eventual consistency)

- This also goes for updating and posting a song, it will not get added to the Artists collection.

- Another database consistency issue when deleting songs from artists, summary will stay the same.

- We tried to do the error handling in the backend for each error seperately but some of the endpoints were breaking as a consequence. We kept the error handling as is and made sure to handle some of the obvious errors like returning empty etc. in the frontend.

- The structure of the frontend is a bit messy, the backend is a lot cleaner in comparison. This will be an improvement point for the next project.

### Team Effort and conclusion:
*We split everything up pretty much 50/50 we were able to work well together as we just divided up tasks between each other and were able to do them in our own time. We would meet up in person every week or every two weeks depending on the work load and sort out any issues we were having on our tasks
We really enjoyed the course. We learned a lot of useful skills and feel pretty comfortable working with Mongo DB, react and a few new coding languages along with that*
