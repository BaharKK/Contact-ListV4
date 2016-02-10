
$(function() {
  //populates the table with contacts and hides the contact-form when loadContacts button is clicked 
  $("#loadContacts").on('click', function() {
    $("#ContactForm").hide();
    $.getJSON('/contacts', function(contacts) {
      var table = $("#contact_table").find('tbody').empty();
      contacts.forEach(function(contact) {
        var tr = $("<tr>").addClass('contact').appendTo(table);
        $("<td>").appendTo(tr).text(contact.id);
        $("<td>").appendTo(tr).text(contact.name);
        $("<td>").appendTo(tr).text(contact.surname);
        $("<td>").appendTo(tr).text(contact.email);
        $("<td>").appendTo(tr).text(contact.phone);
        $("<td>").appendTo(tr).html($("<button>").text("Delete").on('click', function(data) {
          $.post('/contacts/delete',{id: contact.id}, function(data) {
            // debugger;
            if(data.success){
              alert("The contact has been deleted successfully");
            } else {
              alert("The contact could not be deleted.The ID of the contact is "+data.id);
            }
          }, 'json');
          console.log(contact);
        }));
        // $("<td>").appendTo(tr).html("<form><input type=""hidden"" name=""contact_id"" value=""contact.id""><button id=""delete"" type=""submit"">Delete Contact</button></input></form>");
        $("#results").fadeIn('slow');
      });
    });
  });

  

  $("#searchContact").on('click', function(e) {
    $("#ContactForm").hide();
  });

  $("#search").on('submit', function() {
    var query = $("#query").val();
    if(query == ""){
      alert("You must type a name or surname or email of a contact to seach.");
      return false;
    }
    $.getJSON('/contacts/search',{query: query}, function(contacts) {
      if(contacts.length == 0) {
        alert("No contact by search criteria found");
      } else {
        var table = $("#contact_table").find('tbody').empty();
        contacts.forEach(function(contact) {
          var tr = $("<tr>").addClass('contact').appendTo(table);
          $("<td>").appendTo(tr).text(contact.id);
          $("<td>").appendTo(tr).text(contact.name);
          $("<td>").appendTo(tr).text(contact.surname);
          $("<td>").appendTo(tr).text(contact.email);
          $("<td>").appendTo(tr).text(contact.phone);
          $("#results").fadeIn('slow');
        });
      }
    });
    return false;
  });
  // this function invokes after addContact button is clicked, hides the list of contacts and displays the contact-form  
  $("#addContact").on('click', function() {
    $("#results").hide();
    $("#ContactForm").show();
  });


  //takes  the values entered in the input tags and assigns them to variables 
  $("#newContact").on('submit', function(){
    var name = $("#name").val();
    var surname = $("#surname").val();
    var email = $("#email").val();
    var phone = $("#phone").val();


    //checks the values entered in the form input tags and alerts if a value input hasn't been filled
    if(name == "" || surname == "" || email == "" || phone == "") {
      alert("You must fill out all fields, to add a contact.");
      return false;
    }
    $.post('/contacts',{name: name, surname: surname, email: email, phone: phone}, function(data) {
      if(data.result) {
        //this line clears the form inputs after contact has been saved
        $("#name").add("#surname").add("#email").add("#phone").val('');
        alert("The Contact has been added to the Contact List. Contact ID is: "+data.id);
      } else {
        alert("The contact was not Added to the Contact List. Please try again!");
      }
    }, 'json');
    return false;
  });


  
});





