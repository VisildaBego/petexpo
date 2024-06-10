
// Menu

document.addEventListener("DOMContentLoaded", function() {
    // Fetch menu HTML and insert into placeholder
    fetch('./public/menu.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        const menuPlaceholder = document.getElementById('menu-placeholder');
        if (menuPlaceholder) {
          menuPlaceholder.innerHTML = data;
          
          // Navigation links functionality after inserting the menu
          const navLinks = document.getElementById("navLinks");
          const openBtn = document.getElementById("open");
          const closeBtn = document.getElementById("close");
  
          if (openBtn && closeBtn && navLinks) {
            openBtn.addEventListener("click", function() {
              navLinks.style.right = "0";
            });
  
            closeBtn.addEventListener("click", function() {
              navLinks.style.right = "-200px";
            });
          } else {
            console.error("Navigation elements not found after inserting the menu");
          }
        } else {
          console.error("Menu placeholder element not found");
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  });
  
