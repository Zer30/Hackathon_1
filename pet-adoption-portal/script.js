const pets = [
    { type: "Dog", age: 2, location: "New York", description: "Friendly and playful" },
    { type: "Cat", age: 3, location: "Los Angeles", description: "Quiet and cuddly" },
    { type: "Rabbit", age: 1, location: "Chicago", description: "Active and curious" },
    { type: "Parrot", age: 5, location: "Miami", description: "Talkative and colorful" },
    { type: "Hamster", age: 1, location: "Dallas", description: "Small and energetic" }
];

document.addEventListener("DOMContentLoaded", () => {
    loadPets();
});

function loadPets() {
    const petList = document.getElementById("pet-list");
    petList.innerHTML = "";
    pets.forEach((pet, index) => {
        const petElement = document.createElement("div");
        petElement.classList.add("pet", "col-md-3", "m-3");
        petElement.innerHTML = `
            <h3>${pet.type}</h3>
            <p>Age: ${pet.age}</p>
            <p>Location: ${pet.location}</p>
            <p>${pet.description}</p>
            <button class="btn btn-danger" onclick="deletePet(${index})">Delete</button>
        `;
        petList.appendChild(petElement);
    });
}

function searchPets() {
    const query = document.getElementById("search").value.toLowerCase();
    const filteredPets = pets.filter(pet => 
        pet.type.toLowerCase().includes(query) || 
        pet.age.toString().includes(query) || 
        pet.location.toLowerCase().includes(query)
    );
    const petList = document.getElementById("pet-list");
    petList.innerHTML = "";
    filteredPets.forEach((pet, index) => {
        const petElement = document.createElement("div");
        petElement.classList.add("pet", "col-md-3", "m-3");
        petElement.innerHTML = `
            <h3>${pet.type}</h3>
            <p>Age: ${pet.age}</p>
            <p>Location: ${pet.location}</p>
            <p>${pet.description}</p>
        `;
        petList.appendChild(petElement);
    });
}

function deletePet(index) {
    pets.splice(index, 1);
    loadPets();
}
