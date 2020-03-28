// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-eaten").on("click", function(event) {
    var id = $(this).data("id");
    var newEaten = $(this).data("newEaten");

    var newEatenState = {
      eaten: 1

    };

    // Send the PUT request.
    $.ajax("/api/slices/" + id, {
      type: "PUT",
      data: newEatenState
    }).then(
      function() {
        console.log("changed eaten to", newEaten);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newSlice = {
      name: $("#ca").val().trim(),
      // Eaten: $("[name=eaten]:checked").val().trim()
      eaten: 0
    };

    // Send the POST request.
    $.ajax("/api/slices", {
      type: "POST",
      data: newSlice
    }).then(
      function() {
        console.log("created new slice");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-slice").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/slices/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted slice", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
