import styles from "./AboutUsPage.module.css";
const users = [
  {
    id: 654321,
    first_name: "John",
    last_name: "Doe",
    email: "John@gmail.com",
    password: "John",
    location: "New York",
    age: 23,
    skills: ["Java", "C++"],
    image: "john.jpg",
  },
  {
    id: 123456,
    first_name: "Jane",
    last_name: "Doe",
    email: "Jane@gmail.com",
    password: "Jane",
    location: "Los Angeles",
    age: 24,
    skills: ["Python", "C++"],
    image: "jane.jpg",
  },
  {
    id: 6546321,
    first_name: "Mahdi",
    last_name: "Chaabane",
    email: "mahdi@gmail.com",
    password: "mahdi",
    location: "Tunis",
    age: 21,
    skills: ["React", "Typescript", "C++"],
    image: "mahdi.jpg",
  },
  {
    id: 987654,
    first_name: "Emily",
    last_name: "Smith",
    email: "emily@gmail.com",
    password: "emily123",
    location: "London",
    age: 27,
    skills: ["JavaScript", "Node.js"],
    image: "emily.jpg",
  },
  {
    id: 543219,
    first_name: "Michael",
    last_name: "Johnson",
    email: "michael@gmail.com",
    password: "michael",
    location: "Chicago",
    age: 30,
    skills: ["PHP", "MySQL"],
    image: "michael.jpg",
  },
  {
    id: 789012,
    first_name: "Sophia",
    last_name: "Lee",
    email: "sophia@gmail.com",
    password: "sophia123",
    location: "Sydney",
    age: 26,
    skills: ["Swift", "iOS Development"],
    image: "sophia.jpg",
  },
  {
    id: 345678,
    first_name: "Alex",
    last_name: "Nguyen",
    email: "alex@gmail.com",
    password: "alex123",
    location: "Hanoi",
    age: 29,
    skills: ["Ruby", "Ruby on Rails"],
    image: "alex.jpg",
  },
  {
    id: 876543,
    first_name: "Maria",
    last_name: "Garcia",
    email: "maria@gmail.com",
    password: "maria",
    location: "Madrid",
    age: 25,
    skills: ["HTML", "CSS", "JavaScript"],
    image: "maria.jpg",
  },
  {
    id: 234567,
    first_name: "William",
    last_name: "Brown",
    email: "william@gmail.com",
    password: "william123",
    location: "Toronto",
    age: 28,
    skills: ["Angular", "Java"],
    image: "william.jpg",
  },
  {
    id: 901234,
    first_name: "Olivia",
    last_name: "Martinez",
    email: "olivia@gmail.com",
    password: "olivia",
    location: "Barcelona",
    age: 22,
    skills: ["Vue.js", "PHP", "MySQL"],
    image: "olivia.jpg",
  },
];
function AboutUsPage() {
  return (
    <div className={styles.container}>
      <h1>About Us</h1>
      <p>This project is a learning project</p>
      <p>It misses a lot of features</p>
      <p>It is not meant to be used in production</p>
      <p>It uses a fake API</p>
      <ul>
        <h1> Goals of this project:</h1>
        <li>
          The use of React hooks (useState, useEffect, useContext, useReducer,
          useRef)
        </li>
        <li>The use of React Router</li>
        <li>The use of React Context + advanced patterns</li>
        <li>The use of React Leaflet</li>
        <li>Setup project with vite</li>
        <li>The use of TypeScript and framer-motion </li>
        <li>The use of CSS modules</li>
        <li>Deploy it </li>
      </ul>
      <ul>
        <h1>
          {" "}
          List of users:(The user is registred in local storage which is not the
          best option,but the main goal of this porject is to practise React){" "}
        </h1>
        {users.map((user) => (
          <li key={user.id}>
            email: {user.email} | password: {user.password} | skills:{" "}
            {user.skills.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AboutUsPage;
