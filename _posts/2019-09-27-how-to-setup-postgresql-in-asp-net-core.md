---
layout: post
type: blog
title:  "How to setup PostgreSQL in ASP.NET Core"
date:   2019-09-27 08:03:33
snippet: In this article, I'm going to help you how to install and use PostgreSQL (an alternative open-source object-relational database management system) in your ASP.NET Core App.
---

If you are looking for free & open-source alternative relational database management system for you application, there are a lot of options out there. But one of my top picks is the PostgreSQL. PostgreSQL is not new in the industry, in fact it has been around for more than two decades and a lot of small, medium to enterprise businesses are using this.

## What is exactly PostgreSQL?

PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads. <a href="https://www.postgresql.org/about/">postgresql.org/about</a>

The good thing is, we can easily use this as our database for our ASP.NET Core Web App.

So enough intro, let's get started.

### FTF (First Things First)

Make sure you already downloaded and installed PostgreSQL in your machine. If you haven't installed yet, you can visit this link <a href="http://www.postgresqltutorial.com/install-postgresql/">http://www.postgresqltutorial.com/install-postgresql/</a>.

### 1.0 Install the Package
In this sample, I'm using ASP.NET Core Web API project but the procedure can be implemented in ASP.NET Core MVC.

1.1 Open the terminal and execute the command or open Nuget Package Manager. Look for this package. `Npgsql.EntityFrameworkCore.PostgreSQL`
<img src="https://user-images.githubusercontent.com/10904957/65769646-a274fb00-e166-11e9-9438-c85e0b8c7fbb.PNG" alt="Mark Deanil Vicente" />

{{highlight ruby linenos}}
    Install-Package Npgsql.EntityFrameworkCore.PostgreSQL
{{endhighlight}}

You can find different versions <a href="https://www.nuget.org/packages/Npgsql.EntityFrameworkCore.PostgreSQL">here</a> that fits on your .net core version.

### 2.0 Setup connection string. 

Locate your the method that implements `DbContextOptionsBuilder optionsBuilder` and update your connection string similar to this. Normally you can find them in your Startup.cs or in your DbContext file.

{{highlight ruby linenos}}
    optionsBuilder.UseNpgsql(@"Server=127.0.0.1;Port=5432;Database=myDataBase;User Id=myUsername;Password=myPassword;");
{{endhighlight}}

The example above is only a standard connection string, if you want the other options, you can find them <a href="https://www.connectionstrings.com/postgresql/">here</a>.

### 3.0 Execute database migrations.

One you finish the steps above, you can now do the migrations and database update using your command line.

{{highlight ruby linenos}}
    dotnet ef migrations add InitialCreateToPostgreSQL

    dotnet ef database update
{{endhighlight}}

That's it. It's very simple to setup!

If you have some questions or comments, please drop it below 👇 :)
