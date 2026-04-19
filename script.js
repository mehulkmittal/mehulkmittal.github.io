const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

document.querySelectorAll("[data-reveal]").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll("img[data-fallback-src]").forEach((image) => {
  image.addEventListener("error", () => {
    const fallbackSrc = image.getAttribute("data-fallback-src");
    if (fallbackSrc && image.getAttribute("src") !== fallbackSrc) {
      image.setAttribute("src", fallbackSrc);
    }
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".site-nav a")];

const setActiveLink = () => {
  const scrollPosition = window.scrollY + window.innerHeight * 0.25;

  let activeId = sections[0]?.id;

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
  });
};

setActiveLink();
window.addEventListener("scroll", setActiveLink, { passive: true });

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(pointer:fine)").matches) {
  cursorGlow.style.opacity = "1";

  window.addEventListener(
    "pointermove",
    (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    },
    { passive: true }
  );
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
