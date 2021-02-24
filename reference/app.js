$(document).ready(function() {
  const database = firebase.database()

  // get data on load
  readData()

  // watch for add button click
  onAddButtonClick()

  // watch for delete button click
  onDeleteButtonClick()

  // functions
  function readData() {
    var itemsRef = firebase.database().ref('items');
    itemsRef.on('child_added', (data) => {
      // addCommentElement(postElement, data.key, data.val().text, data.val().author);
      console.log(data.val())
      appendItemToList(data.key, data.val())
    });

    itemsRef.on('child_changed', (data) => {
      // setCommentValues(postElement, data.key, data.val().text, data.val().author);
      console.log(data.val())
    });

    itemsRef.on('child_removed', (data) => {
      // deleteComment(postElement, data.key);
      console.log(data.val())
    });
  }

  function appendItemToList(itemId, itemData) {
    if (!itemData.isActive) return
    let item = 
    `<li class="list-group-item" id="${itemId}">
      ${itemData.name} - ${itemData.description}
      <button class="btn btn-danger float-right delete-item-btn" data-id="${itemId}">Delete</button>
    </li>`
    
    $('#todo-list-container').append(item)
  }

  function onAddButtonClick() {
    // on add button click
    $('#add-item-button').click((e)=> {
      e.preventDefault();
      let name = $('#nameInput').val()
      $('#nameInput').val('')
      let description = $('#descriptionInput').val()
      $('#descriptionInput').val('')
      let itemsRef = database.ref("items");
      let newItemRef = itemsRef.push();

      newItemRef.set({
        name: name,
        description: description,
        isActive: true
      });
    })
  }

  function onDeleteButtonClick() {
    $(document).on( 'click', '.delete-item-btn', function(e){
      $('#'+$(e.target).data('id')).remove()
      let itemsRef = database.ref("items/"+$(e.target).data('id'))
      itemsRef.update({ isActive: false })
    });
  }
})


