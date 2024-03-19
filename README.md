<h1>SimpleCFG is a web application that generates control flow graphs from Python code and visualizes the execution path</h1>

<p>Research on the background, utility, and implementation of the project can be found in this report:</p>
https://docs.google.com/document/d/1O0-If9rTouspUwNJ6GDiobwbVlvK6HytXST2VulOUtU/edit?usp=sharing

<h2>To test locally:</h2>
clone the repo and install npm/node

In the command line run:
$ cd backend
$ node server.js

and in a separate window of the root directory:
$ npm start

<h2>Using the applications:</h2>

Code window:
- The only implemented language is python3
- The file must contain a main function
- The standard output of the program can be viewed by pressing 'Output'
- More detail can be found by pressing the '?' icon

CFG:
- The server will generate your CFG from the code widow when 'Generate'is pressed.
- Step through the program blocks using the left and right arrows, with associated code lines being highlighted in parallel
- Pressing 'Run' will run the whole program once, without line highlighting.
- Reset the execution, or expand into full screen with the respective icons.

Other Pages:
- Learn about what CFGs are by viewing the About page.
- To learn more about how you might use the application, visit the example problems page
