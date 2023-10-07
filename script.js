document.addEventListener("DOMContentLoaded", function () {
    // Get references to HTML elements we'll be working with
    const dataList = document.getElementById("data-list"); // The list where data will be displayed
    const errorMessage = document.getElementById("error-message"); // Element to display error messages
    const addForm = document.getElementById("add-form"); // Form for adding new items
    const newItemInput = document.getElementById("new-item"); // Input field for new item

    let data = []; // Array to store the data

    // Function to fetch data from an external API
    async function fetchData() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            data = await response.json();
            displayData(data); // Display the retrieved data
        } catch (error) {
            handleErrorMessage(error); // Handle and display any errors that occur during the fetch
        }
    }

    // Function to display data in the HTML
    function displayData(data) {
        dataList.innerHTML = ""; // Clear the existing data list
        data.forEach(item => {
            const listItem = createListItem(item); // Create a list item for each data item
            dataList.appendChild(listItem); // Append the list item to the data list

            // Add event listeners for the "Edit" and "Delete" buttons on each list item
            const editButton = listItem.querySelector(".edit-btn");
            const deleteButton = listItem.querySelector(".delete-btn");

            editButton.addEventListener("click", () => {
                editItem(item, listItem); // Handle the "Edit" button click
            });

            deleteButton.addEventListener("click", () => {
                deleteItem(item, listItem); // Handle the "Delete" button click
            });
        });
    }

    // Function to create a list item element
    function createListItem(item) {
        const listItem = document.createElement("li"); // Create a new list item element
        listItem.innerHTML = `
            <span class="item-text">${item.title}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        return listItem; // Return the created list item
    }

    // Function to handle and display error messages
    function handleErrorMessage(error) {
        errorMessage.textContent = `Error: ${error.message}`;
        errorMessage.classList.remove("hidden");
    }

    // Event listener for the form submission to add a new item
    addForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior
        const newItemText = newItemInput.value.trim(); // Get the trimmed value from the input field
        if (newItemText !== "") {
            // Check if the input is not empty
            const newItem = { title: newItemText };
            data.unshift(newItem); // Add the new item to the beginning of the data array
            displayData(data); // Update the displayed data
            newItemInput.value = ""; // Clear the input field
            // Create a new item


fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST", // Use the HTTP POST method to create a new resource
    headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
    },
    body: JSON.stringify(newItem), // Convert the JavaScript object to JSON string
})
.then(response => {
    if (!response.ok) { // Check if the response status is not okay (e.g., 404 or 500)
        throw new Error("Create request failed.");
    }
    return response.json(); // Parse the response JSON
})
.then(data => {
    console.log("New item created:", data); // Log the response data
})
.catch(error => {
    console.error(error); // Handle and log any errors
});
        }
        
    });

    // Function to handle editing an item
    function editItem(item, listItem) { 
    
        console.log(item, "item")
        console.log(listItem, "listItem")
        const id = item.id
        const newText = prompt("Edit item:", item.title); // Prompt for new text
        if (newText !== null) {
            item.title = newText; // Update the item's text
            listItem.querySelector(".item-text").textContent = newText; // Update the displayed text
            
// Update an existing item
const updatedItem = {
    title: "Updated Item",
    description: "This item has been updated via the API.",
};

fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT", // Use the HTTP PUT method to update an existing resource
    headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
    },
    body: JSON.stringify(updatedItem), // Convert the JavaScript object to JSON string
})
.then(response => {
    if (!response.ok) { // Check if the response status is not okay (e.g., 404 or 500)
        throw new Error("Update request failed.");
    }
    return response.json(); // Parse the response JSON
})
.then(data => {
    console.log("Item updated:", data); // Log the updated item data
})
.catch(error => {
    console.error(error); // Handle and log any errors
});
        }
    }

    // Function to handle deleting an item
    function deleteItem(item, listItem) {
        const confirmDelete = confirm("Delete this item?"); // Confirm deletion
        if (confirmDelete) {
            data = data.filter(i => i !== item); // Remove the item from the data array
            listItem.remove(); // Remove the item's HTML element
        }
    }

    // Initial fetch of data when the page loads
    fetchData();
});
