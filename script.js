const apiUrl = 'https://api.jwstapi.com/all/type/jpg';
const apiKey = '649a6393-4d05-4f5a-83aa-34152808fa1a';
let currentPage = 1;
const perPage = 10;

function fetchImages(page = 1) {
    fetch(`${apiUrl}?page=${page}&perPage=${perPage}`, {
        headers: {
            'X-API-KEY': apiKey,
        }
    })
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('images-container');
        if (data && data.body && Array.isArray(data.body)) {
            data.body.forEach(image => {
                const imageCard = document.createElement('div');
                imageCard.classList.add('image-card');

                const imgElement = document.createElement('img');
                imgElement.src = image.thumbnail || image.location;  // Display thumbnail if available
                imgElement.alt = image.details.description || 'JWST Image';
                imageCard.appendChild(imgElement);

                const titleElement = document.createElement('h3');
                titleElement.textContent = `Observation ID: ${image.observation_id}`;
                imageCard.appendChild(titleElement);

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = `Description: ${image.details.description}`;
                imageCard.appendChild(descriptionElement);

                const programElement = document.createElement('p');
                programElement.textContent = `Program: ${image.program}`;
                imageCard.appendChild(programElement);

                const linkElement = document.createElement('a');
                linkElement.href = '#';
                linkElement.textContent = 'View Full Image';
                linkElement.addEventListener('click', () => openModal(image.location, image.details.description));  // Use high-quality image for modal
                imageCard.appendChild(linkElement);

                container.appendChild(imageCard);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('images-container').innerHTML = '<p>Error loading images.</p>';
    });
}

// Modal logic
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('full-image');
const captionText = document.getElementById('caption');

function openModal(imageUrl, description) {
    modal.style.display = "block";
    modalImg.src = imageUrl;  // Load full-size image in modal
    captionText.innerHTML = description;
}

const span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    modal.style.display = "none";
}

// Load more images
document.getElementById('load-more-btn').addEventListener('click', () => {
    currentPage++;
    fetchImages(currentPage);
});

// Initial fetch
fetchImages(currentPage);


