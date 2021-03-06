/*
This is empty on purpose! Your code to build the resume will go here.
 */

/*
  Function to Internationalize the name
*/
function inName(name){
  console.log(name);
  var n = name.split(" ");
  var first = n[0];
  var last = n[1];

  var f = first.toLowerCase();
  f = f[0].toUpperCase() + f.slice(1);

  var l = last.toUpperCase();
  return f + ' ' + l;
}


//little escape function to protect our site from code
var escape = function(s){
  s = s.replace(/</g, '&lt;');
  s = s.replace(/</g, '&gt;');
  return s;
}

/*
  Function to add misc items to page
  the button didn't belong in a display object
  and the map div didn't either. They were
  separate entities.
*/
function createMisc(){
  /*
  Add the button to the page
  */
  $('#lets-connect').append(internationalizeButton);
  /*
    Add the map
  */
  $('#mapDiv').append(googleMap);
}

//object leteral notation
var bio = {
  "name": "Joe Roop",
  "role": "Web Developer",
  "contacts": {
    "mobile": "800-500-6000",
    "email": "joe.roop@test.com",
    "github": "jroop",
    "twitter": "N/A",
    "location": "Sunnyvale, CA"
  },
  "welcomeMessage": "Welcome everyone have a look around. This is a <b>test</b> website for learning Javascript.",
  "skills": [
    "programming",
    "rock climbing",
    "skiing",
    "flight testing"
  ],
  "biopic": "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s640x640/sh0.08/e35/11909229_1681214395433401_1330360277_n.jpg"
};

var education = {
  "schools": [
    {
      "name": "Georgia Tech",
      "location": "Atlanta, GA",
      "degree": "MS",
      "majors": [
        "Aerospace Engineering",
        "Basket Weaving"
      ],
      "dates": 2006,
      "url": "http://www.gatech.edu/"
    },
    {
      "name": "Embry Riddle Aeronautical University",
      "location": "Prescott, AZ",
      "degree": "BS",
      "majors": [
        "Aerospace Engineering",
        "Nothing in particular"
      ],
      "dates": 2004,
      "url": "https://www.erau.edu/"
    }
  ],
  "onlineCourses": [
    {
      "title": "C++ Programming",
      "school": "UCSC Extension",
      "date": 2014,
      "url": "http://www.ucsc-extension.edu/"
    },
    {
      "title": "C Programming",
      "school": "UCSC Extension",
      "date": 2014,
      "url": "http://www.ucsc-extension.edu/"
    }
  ]
};

var work = {
  "jobs": [
    {
      "employer": "Dell Services Federal Government",
      "title": "Flight Controls Software Developer",
      "location": "NASA Ames Research Center, CA",
      "dates": "July 2013 - Current",
      "description": "Flight test engineer, flight crew member, and software engineer for the RASCAL UH-60A Black Hawk Helicopter project."
    },
    {
      "employer": "Contractor to Sierra Nevada Corporation",
      "title": "Aerospace Engineer III",
      "location": "Centennial, CO",
      "dates": "January 2013 - June 2013",
      "description": "Flight test engineer, aerospace engineer and aero lead for the Night Ryder program."
    }
  ]
};

var projects = {
  "projects": [
    {
      "title": "RASCAL",
      "dates": "July 2013 - Current",
      "description": "Flight test engineer, flight crew member, and software engineer for the RASCAL UH-60A Black Hawk Helicopter project.",
      "images": [
        "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s640x640/sh0.08/e35/11375251_669748829828227_1963679268_n.jpg",
        "https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/s640x640/sh0.08/e35/11324339_505346299631855_895120959_n.jpg",
        "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s640x640/sh0.08/e35/11375241_972779649441322_2061837285_n.jpg"
      ]
    },
    {
      "title": "UDP Python",
      "dates": "July 2013 - Current",
      "description": "Used Python to send UDP packets to command optical sensor",
      "images": [
        "https://scontent.cdninstagram.com/hphotos-xpa1/t51.2885-15/s640x640/sh0.08/e35/10864831_1117440734952411_1360214796_n.jpg",
        "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/11357344_893147847397459_244112919_n.jpg"
      ]
    }
  ]
};

/*
  Function used to reduce amount of cut and pasting
  inStr: string that has %data% in it
  v1: the string to replace %data% with
  v2: optional the string to replace %contact% with
*/
function parser(inStr, v1, v2){
  var str;
  if (v2){
    inStr = inStr.replace('%contact%', v2);
  }
  return inStr.replace('%data%', v1);
}

/*
  Display functions for the resume component objects. Did not
  directly embed into the objects so that it was easier to JSlint.
*/

/*
  Bio display function
*/
bio.display = function(){
  var e = $('#header');

  //use this because we are inside of an object
  e.prepend(parser(HTMLheaderRole, this.role));
  e.prepend(parser(HTMLheaderName, this.name));

  //append all the contact info to topContacts
  for (var key in this.contacts){
    //ensure that we are only getting properties from this class and not a
    //base class
    if (this.contacts.hasOwnProperty(key)){
      $('#topContacts').append(parser(HTMLcontactGeneric, this.contacts[key], key));
      //also add to the footer
      $('#footerContacts').append(parser(HTMLcontactGeneric, this.contacts[key], key));
    }
  }

  //make a nice div tha we can put things in
  var s = '<div class="box"></div>';
  var container = $('<div id="container"></div>');
  e.append(container);

  var pic = $(s);
  pic.append(parser(HTMLbioPic, this.biopic));


  var welcome = $(s);
  welcome.append(parser(HTMLwelcomeMsg, this.welcomeMessage));


  //e.append(parser(HTMLbioPic, this.biopic));
  //e.append(parser(HTMLwelcomeMsg, this.welcomeMessage));

  //append skills header
  var skills = $(s);
  skills.append(HTMLskillsStart);
  container.append(skills);
  //now do each skill
  for (var key in this.skills){
    if (this.skills.hasOwnProperty(key)){
      $('#skills').append(parser(HTMLskills, this.skills[key]));
    }
  }
  container.append(welcome);
  container.append(pic);


}

/*
  Education display function
*/
education.display = function(){
  var e = $('#education');

  for (var i = 0; i < this.schools.length; i++){
    //create an education entry div
    var s = $(HTMLschoolStart);
    //name and degree with link
    var a = $(parser(HTMLschoolName, this.schools[i].name) +
      parser(HTMLschoolDegree, this.schools[i].degree));
    //replace the href link with the school's link
    a.attr('href', this.schools[i].url);
    s.append(a);
    //dates
    s.append(parser(HTMLschoolDates, this.schools[i].dates));
    //location
    s.append(parser(HTMLschoolLocation, this.schools[i].location));
    //majors this is an array
    for(var j = 0; j < this.schools[i].majors.length; j++){
      s.append(parser(HTMLschoolMajor, this.schools[i].majors[j]));
    }
    //now slap everything onto the document
    e.append(s);
  }


  var s = $(HTMLschoolStart);
  var h3 = $(HTMLonlineClasses);
  h3.addClass('highlight-color-2')
  e.append(h3);
  e.append(s);

  //now to the online classes bit
  for (var i = 0; i < this.onlineCourses.length; i++){
    var a = $(parser(HTMLonlineTitle, this.onlineCourses[i].title) +
      parser(HTMLonlineSchool, this.onlineCourses[i].school));
    a.attr('href', this.onlineCourses[i].url);
    s.append(a);
    //dates
    s.append(parser(HTMLonlineDates, this.onlineCourses[i].date));
    //url
    s.append(parser(HTMLonlineURL, this.onlineCourses[i].url));
  }
}

/*
  Work display function
*/
work.display = function(){
  var e = $('#workExperience');

  for (var i = 0; i < this.jobs.length; i++){
    var s = $(HTMLworkStart);
    var a = $(parser(HTMLworkEmployer, this.jobs[i].employer) +
      parser(HTMLworkTitle, this.jobs[i].title));
    s.append(a);
    s.append(parser(HTMLworkDates, this.jobs[i].dates));
    s.append(parser(HTMLworkLocation, this.jobs[i].location));
    s.append(parser(HTMLworkDescription, this.jobs[i].description));
    e.append(s);
  }
}

/*
  Projects display function
*/
projects.display = function(){
  var e = $('#projects');

  for (var i = 0; i < this.projects.length; i++){
    var s = $(HTMLprojectStart);
    var a = $(parser(HTMLprojectTitle, this.projects[i].title));

    s.append(parser(HTMLprojectDates, this.projects[i].dates));
    s.append(parser(HTMLworkDescription, this.projects[i].description));
    //images this is an array
    for (var j = 0; j < this.projects[i].images.length; j++){
      s.append(parser(HTMLprojectImage, this.projects[i].images[j]));
    }
    s.prepend(a); //gotta make sure to use at least 1 prepend
    e.append(s);
  }
}

/*
  Call all the functions
*/
bio.display();
education.display();
work.display();
projects.display();
createMisc(); //adds map and international button