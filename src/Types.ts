interface User{
    id: number;
    "first_name": string;
    "last_name": string;
    "email": string;
    "password": string;
    location: string;
    age: number;
    skills: string[];
    image: string;

}

interface Job{
    id: number;
    title: string;
    description: string;
    skills: string[];
    salary:{
        min: number;
        max: number;
    }
    "job-type": string;
    mobility: string;
    location: {lat: number, lng: number}
    country: string;
    company: string;
}


export type {User, Job}