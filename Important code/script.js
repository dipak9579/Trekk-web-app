document.addEventListener('DOMContentLoaded', () => {
    const userName = "Dipak"; // Replace with dynamic data
    const referenceNumber = "ABC123456"; // Replace with dynamic data

    document.getElementById('user-name').innerText = userName;
    document.getElementById('reference-number').innerText = referenceNumber;

    document.getElementById('back-home').addEventListener('click', () => {
        window.location.href = 'index.html'; // Replace with your home page URL
    });
});
