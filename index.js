AOS.init({
  duration: 3000, // Animation duration in milliseconds
  once: true, // Whether animation should happen only once
});

// Hamburger menu toggle for <600px
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const navLinks = document.getElementById('navLinks');
  const navLis = navLinks.querySelectorAll('li');
  
  function closeMenu() {
    navLinks.style.display = 'none';
  }

  mobileMenuButton.addEventListener('click', function(e) {
    e.stopPropagation();
    if (navLinks.style.display === 'flex') {
      closeMenu();
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '80px';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'black';
      navLinks.style.zIndex = '50';
      navLinks.style.padding = '1rem';
    }
  });

  navLis.forEach(li => {
    li.addEventListener('click', function() {
      // Only close if on mobile
      if (window.innerWidth <= 600) closeMenu();
    });
  });

  document.addEventListener('click', function(e) {
    if (window.innerWidth > 600) return;
    if (!navLinks.contains(e.target) && e.target !== mobileMenuButton) {
      closeMenu();
    }
  });

  // Hide navLinks on resize above 600px
  window.addEventListener('resize', function() {
    if (window.innerWidth > 600) {
      navLinks.style.display = '';
      navLinks.style.flexDirection = '';
      navLinks.style.position = '';
      navLinks.style.top = '';
      navLinks.style.left = '';
      navLinks.style.width = '';
      navLinks.style.background = '';
      navLinks.style.zIndex = '';
      navLinks.style.padding = '';
    }
  });
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
  "Redux Toolkit",
  "Tailwind CSS",
  "Axios",
  "Bootstrap",
  "NodeJS",
  "ExpressJS",
  "REST API's",
  "MySql",
  "MangoDB(Familiar)",
  "Cloudflare",
  "Firebase"
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


// contact form 
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const sendBtn = document.getElementById("sendBtn");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show loading effect
    sendBtn.disabled = true;
    sendBtn.innerHTML = `<span class="loader"></span> Sending...`;

    const formData = new FormData(contactForm);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Restore button
      sendBtn.disabled = false;
      sendBtn.innerHTML = "Send Message";

      if (response.ok) {
        alert("Message sent successfully!");
        contactForm.reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      // Restore button
      sendBtn.disabled = false;
      sendBtn.innerHTML = "Send Message";
      alert("An error occurred. Please try again.");
    }
  });
});

