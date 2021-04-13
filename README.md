# Welcome to `itzibitzi.js`
Based on my previous experience with implementing a 
[solution in Haskell](https://github.com/einar-io/MongoDB-Coding-Challenge),
I decided to reimplement the challenge in JavaScript, because I concluded that
would have a better tool for the job all along.  To improve the approachability
of the code, I thought I would implement a tiny web interface as well.  
I took the opportunity to upgrade my VPS to Nginx.
The web interface is available right now at my homepage: https://einar.io/code/MongoDB-Coding-Challenge.JS


## Command-line interface
I am going to assume you have already installed `node.js` and `npm` on your system.
Then run:

    git clone git@github.com:einar-io/MongoDB-Coding-Challenge.JS.git
    cd MongoDB-Coding-Challenge.JS
    npm start


## Test suite
The tests can be run with

    npm test

There are currently 11 unit tests.


## Steps
The steps taken were as follows:

1. Set up `node.js` project.
2. Create simple echo service as CLI.
3. Implement the `evaluator` function for flatten.
4. Create web interface.
5. Migrate web server form Apache2 to Nginx.
6. Port the tests from Haskell to `jest`.

I consider implementing the following features:

7. Add `async`/`await` to `itzibitzi.js`.
8. Dockerize the app and set up `nginx` as a reverse proxy.
9. Add CSS and improve the presentation of the web interface.
10. Add type annotations for TypeScript.
11. Add continuous integration and automatic deployment.


## Takeaways

1. Unfortunately I did not manage to make a black-box testing of the `cli.js`.
   Either I need to understand Jest better, or there is a bug somewhere.  The
   manual tests conducted did not reveal any problems.
2. Jest's integration with ES6 modules seemed to be unreliable, so I went with CommonJS
   after some headaches.
3. JavaScript is not known for its consistent type system.  This time around I learnt that:

    typeof null === Object
    null instanceof Object === false


## Thank you for reading!
Do not hesitate to contact me if you have questions or need advice on how to
use my solution.

Kind regards  
Einar



