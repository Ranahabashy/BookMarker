var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");
var bookMarksList = []
if (localStorage.getItem("bookmark") !== null) {
  bookMarksList = JSON.parse(localStorage.getItem("bookmark"));
  display();
}
function addBookMark() {
  if (bookmarkNameInput.value === "" || bookmarkURLInput.value === "") {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      text: "Site Name or URL is not valid. Please follow the rules below:\n Site name must contain at least 3 characters.\n Site URL must be a valid one.",
      icon: "warning",
    });
    return;
  }

  var bookmark = {
    code: bookmarkNameInput.value,
    link: bookmarkURLInput.value,
  };


  bookMarksList.push(bookmark);
  localStorage.setItem("bookmark", JSON.stringify(bookMarksList));
  display();
  clearInput();
  bookmarkNameInput.classList.remove('is-valid')
  bookmarkURLInput.classList.remove('is-valid')
}
function display() {
  var cartona = ''
  for (i = 0; i < bookMarksList.length; i++) {
    cartona += `
      <tr>
        <td> ${i + 1} </td>
        <td>${bookMarksList[i].code}</td>
        <td>
          <button onclick="visit(${i})" class="btn btn-visit">
            <i class="fa-solid fa-eye"></i>  
            Visit
          </button>
        </td>
        <td>
          <button class="btn btn-delete" onclick="deleteBookmark(${i})">
            <i class="fa-solid fa-trash"></i>
            Delete
          </button>
        </td>
      </tr>
    `;
  }
  document.getElementById("tableContent").innerHTML = cartona;
}
function clearInput() {
  bookmarkNameInput.value = null;
  bookmarkURLInput.value = null;
}
function deleteBookmark(deleteIndex) {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger mx-2"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
   

    if (result.isConfirmed) {
      bookMarksList.splice(deleteIndex, 1);
      localStorage.setItem("bookmark", JSON.stringify(bookMarksList))
      display()
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
}
function visit(index) {
  var bookmarkLink = bookMarksList[index].link;

  // console.log(bookmarkLink);
  window.open(bookmarkLink);
}
function validForm(ele) {
  var regex = {
    bookmarkName: /^[a-z]{3,}$/i,
    bookmarkURL: /^(https|http):\/\/(www\.)?[a-zA-Z]{1,}\.com$/i,

  }
  if (regex[ele.id].test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    ele.nextElementSibling.classList.add("d-none"); 
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
    ele.nextElementSibling.classList.remove("d-none");
}
}


 