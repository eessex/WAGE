# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Employee.create(name: 'Joe Doe', email: 'joe@doe.com', manager: false)
Employee.create(name: 'Jane Doe', email: 'jane@doe.com', manager: true)
Employee.create(name: 'Bob Dole', email: 'bob@dole.com', manager: false)
Employee.create(name: 'John Doe', email: 'john@doe.com', manager: true)
issue = User.create(institution_name: "ISSUE Project Room", email: "test@issueprojectroom.org", password: "password", password_confirmation: "password")
artistsspace = User.create(institution_name: "Artists Space", email: "test@artistsspace.org", password: "password", password_confirmation: "password")


cert1 = Certification.create(user_id: 1, fiscal_start: "2015-01-01", fiscal_end: "2015-12-31", operating_expenses: 500000)
