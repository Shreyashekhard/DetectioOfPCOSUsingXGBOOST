document.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const content = document.querySelector('.content');
    const scrollPosition = window.scrollY;

    // Move content up when scrolling
    content.style.transform = `translateY(-${scrollPosition * 0.5}px)`; // Adjust the factor for the desired parallax effect
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pcosForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Gather form data
        const formData = new FormData(this);

        // Send the data using fetch
        fetch('/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Update the div with the prediction result
            document.getElementById('predictionResult').innerHTML = `
                <h3>Prediction Result</h3>
                <p>This Person has PCOS ${data.prediction}</p>
                <!-- You can add more details or formatting as needed -->
            `;
            
            // Example: Redirect to another page after displaying result
            // window.location.href = '/pcos.html';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('predictionResult').innerText = 'An error occurred';
        });
    });
});
