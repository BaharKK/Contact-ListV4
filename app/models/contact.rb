class Contact < ActiveRecord::Base 
  validates :name, :surname, :email, :phone, presence: true 
end
