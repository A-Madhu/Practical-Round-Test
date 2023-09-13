const apiUrl = "http://127.0.0.1:5000"
let bookList = []

const getBookList = async () => {
    try {
        const response = await fetch(`${apiUrl}/bookList`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        bookList=data.res
        console.log(data)
        if (data.res) {
            data.res.forEach((res,i) => {
                document.getElementById('tbody').innerHTML += `<tr id=${i}>
                <td>${res['bookName']}</td>
                <td>${res['author']}</td>
                <td>Date</td>
                <td>
                    <button type="button" class="btn btn-primary edit-button">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-primary">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
              </tr>`
            })
        }
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}


const table = document.querySelector('table');

table.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button')) {
        const row = event.target.closest('tr');
        
        const id = row.getAttribute('id');
        console.log(id)
        
        console.log(bookList[id].author)
        document.getElementById('author').value=bookList[id].author
        document.getElementById('bookName').value=bookList[id].bookName

    }
});


document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${apiUrl}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

    } catch (error) {
        console.error('Error submitting form:', error);
    }

});

window.addEventListener('load', getBookList);
