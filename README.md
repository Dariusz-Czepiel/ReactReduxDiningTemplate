# ReactReduxDiningTemplate
An advanced dining app template with .NET 5, React, REST API and ONION architecture

# What you need
Visual Studio 2019 (v16.8) with web and .net core functionality\
Node.js 10+\
Sql Server in any flavor (if it's not Sql Server Express LocalDB you need to change connectionstring in appsettings.json)

# REST API
This project comes with SwaggerUI proconfigured so you can go to [local address]/swagger and examine the REST API
unfortunately for now the Authentication doesn't work so not all controllers will return

# Scenarios
manage restaurants WIP

if you register as a admin@email.com an 'Admin' role will be automatically applied to your account and your will be able to access management console from which you can view restaurants
