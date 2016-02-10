# Homepage (Root path)
get '/' do
  erb :index
end


get'/contacts' do 
  Contact.all.to_json
end

post '/contacts' do 
  name = params[:name]
  surname = params[:surname]
  email = params[:email]
  phone = params[:phone]
  results = {result: false}

  contact = Contact.new(name: name, surname: surname, email: email, phone: phone)
  if contact.save 
    results[:result] = true
    results[:id] = contact.id 
  end
  results.to_json
end 

get '/contacts/search' do
  search_term = params[:query].downcase
  contacts = Contact.where("name LIKE ? OR surname LIKE ? OR email LIKE ?", search_term, search_term, search_term) 
  return contacts.to_json
end

get '/contacts/:id' do 
  contact =Contact.find params[:id]
  contact.to_json 
end

post '/contacts/delete' do 
  contact = Contact.find params[:id]
  results ={success: false}
  # contact.destroy 
  if contact.destroy
    results[:success] = true
  else 
    results[:id] = contact.id 
  end
  results.to_json
end

