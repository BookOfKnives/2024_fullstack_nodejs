const guestbookForm = document.getElementById("guestbook-form");
const name_elem = document.getElementById("name-input");
const commentText_elem = document.getElementById("commentText-input")

let name, commentText;

guestbookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    name = name_elem.value;
    commentText = commentText_elem.value;
    let data = {
        name, 
        commentText
    };
    fetch("../../api/comments", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
  });
});
