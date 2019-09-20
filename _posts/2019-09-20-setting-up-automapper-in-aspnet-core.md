---
layout: post
type: blog
title:  "Setting up AutoMapper in ASP.NET Core"
date:   2019-09-20 05:05:33
snippet: Today I'm going to demonstrate how to setup AutoMapper in ASP.NET Core Web API
---

Automapper is very useful especially if you want to avoid too much manual mapping from DTO class (Data transfer object) to your Model class vice versa. But what is Automapper?

"AutoMapper is a simple little library built to solve a deceptively complex problem - getting rid of code that mapped one object to another. This type of code is rather dreary and boring to write, so why not invent a tool to do it for us?" - <a href="https://automapper.org/">Automapper.org</a>

Pretty sure you've seen or even tried using this kind of code scenario.

CustomerDto.cs
{{highlight ruby linenos}}
    public class CustomerDto {
        public int CustomerId {get;set}
        public string Firstname {get;set}
        ... (let's say you have many properties)
    }
{{endhighlight}}

And you want to map it to your model class.

Customer.cs
{{highlight ruby linenos}}
    public class Customer {
        public int CustomerId {get;set}
        public string Firstname {get;set}
        ...
    }
{{endhighlight}}

What you usually do is manually do this:
{{highlight ruby linenos}}
    ...
    public void ManuallyMap(CustomerDto dto)
    var customer = new Customer{
        CustomerId = dto.CustomerId,
        Firstname = dto.Firstname,
        ... so on and so forth.
    }
    ...
{{endhighlight}}

This kind of approach is not good because you waste a lot of time manually mapping each property. Good thing, you AutoMapper is available in <a href="https://www.nuget.org/">nuget package manager</a> where you can just simply install.
### FTF (First Things First)

Make sure you've already created or you have existing ASP.NET Core project (MVC or Web API).

### 1.0 Install the Package
1.1 Open the terminal and execute the command or open Nuget Package Manager. Look for this package. `AutoMapper.Extensions.Microsoft.DependencyInjection`
<img src="https://user-images.githubusercontent.com/10904957/65323593-61b43980-dbdc-11e9-8eab-fb0781427a5d.PNG" alt="Mark Deanil Vicente" />

{{highlight ruby linenos}}
    Install-Package AutoMapper.Extensions.Microsoft.DependencyInjection
{{endhighlight}}

This is an AutoMapper extensions for ASP.NET Core project.
### 2.0 Setup AutoMapper Helper class. 

I named this class `AutoMapperProfile.cs`. You can map multiple dtos & model class in there.

I include this class inside my "Helpers" folder but it depends on you where do you want to store this class file.

{{highlight ruby linenos}}
    using AutoMapper;

    public class AutoMapperProfile : Profile 
    {
        public AutoMapperProfile()
        {
            CreateMap<CustomerDto, Customer>();
        }
    }
{{endhighlight}}

### 3.0 Modify Startup.cs.

Add the automapper in the constructor & register the AutoMapper service in the `ConfigureServices` method.

{{highlight ruby linenos}}
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<AutoMapperProfile>();
            });
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ...
            // add Automapper
            services.AddAutoMapper();
            ...
        }
    }
{{endhighlight}}

### 4.0 Sample Usage.

Inject first the `IMapper` in the class constructor.

{{highlight ruby linenos}}
    public class CustomerService 
    {
        private readonly IMapper mapper;
        public CustomerService(IMapper mapper)
        {
            this.mapper = mapper;
        }

        public Customer CustomerDtoToCustomer(CustomerDto customerDto)
        {
            return mapper.Map<Customer>(customerDto);
        }

        public CustomerDto CustomerToCustomerDto(Customer customer)
        {
            return mapper.Map<CustomerDto>(customer);
        }
    }
{{endhighlight}}

As you see from above, it will automatically map based on their property. It's easy so try it on your future or existing projects.

If you have some questions or comments, please drop it below 👇 :)
