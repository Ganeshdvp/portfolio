AOS.init({
  duration: 3000, // Animation duration in milliseconds
  once: true, // Whether animation should happen only once
});

// JavaScript to toggle the dropdown
const themeToggle = document.getElementById("themeToggle");
const dropdown = document.getElementById("dropdown");
const body = document.body;

themeToggle.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// Optional: Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!themeToggle.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.add("hidden");
  }
});

function toggleDropdown(button) {
  const dropdown = button.nextElementSibling;
  dropdown.classList.toggle("hidden");
}

// themes
function switchToggle(mode){
  if(mode === 'light'){
    body.classList.remove("dark");
    body.classList.add("light");
    dropdown.classList.toggle("hidden");
  }
  else if(mode === 'dark'){
    body.classList.remove("light");
    body.classList.add("dark");
    dropdown.classList.toggle("hidden");
  }
}

// Typing Effect
const typingElement = document.getElementById("typing");
const skills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Bootstrap",
  "NodeJS",
  "ExpressJS",
  "MySql",
];
let skillIndex = 0;
let charIndex = 0;

function typeSkill() {
  if (charIndex < skills[skillIndex].length) {
    typingElement.textContent += skills[skillIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeSkill, 100);
  } else {
    setTimeout(eraseSkill, 1500);
  }
}
function eraseSkill() {
  if (charIndex > 0) {
    typingElement.textContent = skills[skillIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseSkill, 100);
  } else {
    skillIndex = (skillIndex + 1) % skills.length;
    setTimeout(typeSkill, 500);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  typeSkill();
});



// my practices
document.addEventListener("DOMContentLoaded", () => {
  const carouselInner = document.getElementById("carouselInner");
  const prevArrow = document.getElementById("prevArrow");
  const nextArrow = document.getElementById("nextArrow");

  let currentIndex = 0; // Track the current item index
  const items = carouselInner.children; // Get all carousel items
  const itemWidth = items[0].offsetWidth + 16; // Width of a single item (including margin)
  const visibleItems = Math.floor(carouselInner.parentElement.offsetWidth / itemWidth); // Number of visible items
  const maxIndex = items.length - visibleItems; // Maximum index to prevent extra space

  // Move to the previous item
  prevArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Move to the next item
  nextArrow.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Update the carousel position
  function updateCarousel() {
    const offset = currentIndex * -itemWidth;
    carouselInner.style.transform = `translateX(${offset}px)`;
    carouselInner.style.transition = "transform 0.5s ease-in-out"; // Smooth transition
  }
});

// see more
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 3000, // Animation duration in milliseconds
    once: false, // Allow animations to happen multiple times
  });

  // See More Button Logic
  const seeMoreButton = document.getElementById("seeMoreButton");
  const hiddenProjects = document.getElementById("hiddenProjects");

  if (seeMoreButton && hiddenProjects) {
    seeMoreButton.addEventListener("click", () => {
      hiddenProjects.classList.toggle("hidden");
      seeMoreButton.textContent = hiddenProjects.classList.contains("hidden")
        ? "See More"
        : "See Less";

      // Refresh AOS animations for the newly visible content
      AOS.refresh();
    });
  } else {
    console.error("See More button or hidden projects container not found.");
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const successPopup = document.getElementById("successPopup");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        successPopup.classList.remove("hidden");
        setTimeout(() => {
          successPopup.classList.add("hidden");
        }, 3000); // Hide popup after 3 seconds
        contactForm.reset(); // Reset the form
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  });
});




