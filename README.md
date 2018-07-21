## To run the app: 
`npm start` 
(But it won't work for you unless you get the image files and TEAM.json which are gitignored.)

----

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

----

# Documentation of How This Came Together

Geoff suggested that I put it in writing for myself and others. 

# Part 0: Why

One day, in a FE meeting, it became clear to me that I didn't know who the new people were, or their names. I figured that it was probably difficult for them to learn who everyone here is. I got the idea for a little name learning game, based loosely on Memory. I knew that the Niche team page, with it's uniform and up-to-date photos, was a great asset.

I also thought it would be fun to have a little project, all my own, like I used to make before I got this job. The code wouldn't have to conform to any standards. I could just throw it together, not worrying about the form or the details too much. I worked on it for two nights.

# Part 1: Concept

Initially, I had in mind something like the game Memory, where you have a grid of hidden cards. You turn over two. If they match, they come off the board. But thinking a little more about it, I realized this wouldn't really help someone learn names or even practice them. I changed the design to one where you have three columns: one for photos, one for first names, and one for last names. All are visible. In each column, the order is scrambled, but if you match photo, first, last, those items disappear. Leaving a smaller set to choose from.

A user is more likely to find someone that they know in a larger set. A user is more likely to guess correctly the people that they don't know as the scrambled set shrinks. 

I also liked the random juxtaposition of names and faces, which is kind of funny, and gives a little interest to the game, even if you already know everybody's name.

# Part 2: Getting the Photos/Names

This app probably wouldn't have been built if there had not been a relatively easy way to get the names and photos. I knew that the photos were on a webpage and could be saved individually, but I did not want to do that. I knew that the names could all be typed out as well, but I did not want to do that. 

I went to https://about.niche.com/team and did a File > Save in the browser. This downloaded a folder called `Working At Niche – Niche_files`. That folder had all of the photos right there! And luckily enough, the file names were all in the format: [FIRSTNAME]-[LASTNAME].jpg

I sorted the filelist by type and deleted everything I didn't need. Then I did a Select All (in the Finder), Copy, Paste (in SublimeText). And there was a list of everyone's name, on separate lines. Using multiple-selection, I was able to duplicate these file-names, and format them (without too much typing) as an array of objects like below.
    
    { 
        firstName: 'Aaron',
        lastName: 'Miller',
        src: 'Aaron-Miller.jpg',
        title: '',
    }, 

# Part 3: The React Boilerplate

I have become accustomed to the Babel/React/Node development Environment that we have at work, and I knew I wanted as much of that environment as possible without having to do any configuration. So I just used the Create-React-App boilerplate and I was up in a few minutes. 

No Less, no linter, no other things we have at work, but it is always a good exercise to shift the paradigm and learn to not take those things for granted. 
