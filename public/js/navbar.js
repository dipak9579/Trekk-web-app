
// Function to open a new web page
function openLoginPage() {
    // URL of the login page
    const loginUrl = "/login"; // Replace with your actual login page URL
    // Open the new page
    window.location.href = loginUrl;
  }
  
  // Add event listener to the image
  document.getElementById("login-trigger").addEventListener("click", openLoginPage);