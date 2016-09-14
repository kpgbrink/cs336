'use strict';

// Make a Person and a base class Student

// Person class
function Person(name, birthDate) {
    this.name = name;
    this.birthDate = new Date(birthDate);
    this.friends = [];
    console.log(this.birthDate);
}

Person.prototype.setName = function(name) {
    this.name = name;
}

Person.prototype.getAge = function() {
    var today = new Date();
    var age = today.getFullYear() - this.birthDate.getFullYear();
    var m = today.getMonth() - this.birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
        age--;
    }
    return age;
}

Person.prototype.addFriend = function(friend) {
    this.friends.push(friend);
}

Person.prototype.greet = function() {
    console.log("Hello I am a person");
}

Person.prototype.toString = function () {
    return `Hello my name is ${this.name} and I am ${this.getAge()} years old I was born on ${this.birthDate} and I have ${this.friends.length} friends`;
}

// Student class
function Student(name, birthDate, study) {
    Person.call(this, name, birthDate);
    this.study = study;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.greet = function() {
    console.log("Hello I am a Student");
}

Student.prototype.toString = function () {
    return Person.prototype.toString.call(this) + ` I am studying ${this.study}.`;
}

var person1 = new Person("Bob", "1980/08/10");
var person2 = new Person("Todd", "1995/08/10");
var student1 = new Student("Takashi", "1996/03/12", "computer science");
var student2 = new Student("Barbie", "2010/12/9", "biology");

person1.addFriend(person2);
person1.addFriend(student1);
person1.addFriend(student2);
person2.addFriend(person1);

person1.greet();
person2.greet();
student1.greet();
student2.greet();

console.log(String(person1));
console.log(String(person2));
console.log(String(student1));
console.log(String(student2));

// Check to see if Student is subclass of Person
console.log(`Student a Person? ${student1 instanceof Person}`);
// Check to see if Student is also a Student
console.log(`Student a Student? ${student1 instanceof Student}`);