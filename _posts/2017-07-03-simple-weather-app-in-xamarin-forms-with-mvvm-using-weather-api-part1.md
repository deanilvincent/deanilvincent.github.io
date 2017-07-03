---
layout: post
type: blog
title:  "Simple Weather App in Xamarin Forms with MVVM using Weather API Part 1"
date:   2017-07-03 11:10:33
snippet: This post will help you getting started in creating simple weather app in xamarin forms connected on a weather api
---

I'm going to guide you today on how to creating <a href="/2017/07/03/simple-weather-app-in-xamarin-forms-with-mvvm-using-weather-api-part1">"Simple Weather App in Xamarin Forms with MVVM using Weather API."</a>

<strong>Overview:</strong>This simple cross platform mobile weather app gets the weather data from weather api that we'll going to use in order to show the weather details after typing the name of the city. In fetching the weather data, your app needs to be connected over the internet connection.

If you haven't heard about Web API, this link might help you to explain how it works: 

<a href="https://deanilvincent.github.io/2017/05/16/steps-in-creating-basic-aspnet-web-service-api/">Steps in Creating Basic ASP.NET Web Service API</a>

Another thing is, we'll going to use <a href="https://deanilvincent.github.io/2017/06/03/basic-understanding-of-mvvm-and-databinding-in-xamarin-forms/">MVVM</a> architectural pattern in Xamarin forms. If you haven't heard about MVVM (Model-View-View-Model) yet, this link might help you understand the basics of this architectural pattern.

<a href="https://deanilvincent.github.io/2017/06/03/basic-understanding-of-mvvm-and-databinding-in-xamarin-forms/">Basic Understanding How Data Binding and MVVM works in Xamarin Forms</a>

When you are ready to start, you can now proceed in reading the steps below.

## Weather APIs

If you're already familiar on how web api works, you're wondering now what weather api we will going to use for this post. To give you some ideas, 

Here are the top 8 common weather apis for developing apps:

- <a href="http://www.openweathermap.com/">OpenWeatherMap</a> 
- <a href="http://apidev.accuweather.com/developers/">AccuWeather API</a>
- <a href="https://developer.yahoo.com/weather/">Yahoo Weather API</a>
- <a href="https://www.apixu.com/">Apixu</a>
- <a href="https://www.wunderground.com/weather/api/">Wunder Undergroud</a>
- <a href="https://developer.worldweatheronline.com/api/">World Weather Online</a>
- <a href="https://darksky.net/dev/">Dark Sky API</a>
- <a href="https://www.aerisweather.com/develop/">Aeris Weather</a>

You can use some of weather apis for free but if you want to get the update, example, after 10 minutes, you need to pay for it. 

For the purpose of this demo, we'll going to use OpenWeatherMap free subscription. Here's the <a href="https://openweathermap.org/price">pricing plan link.</a>

## Creating Your Personal Weather Api using OpenWeatherMap 

### 1.0 Generating Your Weather API Key

1.1 Visit this link: <a href="https://openweathermap.org/">https://openweathermap.org/</a>

<img src="https://user-images.githubusercontent.com/10904957/27801416-7f8ce786-6050-11e7-975f-44c89764bddd.png"/>

1.2 Create your account (if you haven't created yet) <a href="https://home.openweathermap.org/users/sign_up">https://home.openweathermap.org/users/sign_up</a>

1.3 After creating your account, Go to your Account Details and look for "API Keys"

By default, you already have api key created. 

<img src="https://user-images.githubusercontent.com/10904957/27801820-b72a4d3a-6052-11e7-8224-db6373192287.png"/>

### 2.0 Accessing Your Own Weather API with Your API Key

You can visit this link to choose what type of weather forecast you want to fetch. Each forecast has its own api doc. For this demo, we'll going to use the "Current weather data."

2.1 Go to this link <a href="https://openweathermap.org/current">https://openweathermap.org/current</a> and you'll find examples on how to access your weather api.

For this demo, it's important you understand this screenshot because our app will fetch the current weather by city name.

<img src="https://user-images.githubusercontent.com/10904957/27802079-25de5b8a-6054-11e7-8a5b-65025eaeb196.png"/>

2.2 Combining api link for city name and your api key.

In associating your api key, it's important you understand this simple example:

<img src="https://user-images.githubusercontent.com/10904957/27802471-8c15208a-6056-11e7-87ae-35b5cd0796d9.png"/>

{% highlight ruby linenos %}
// link     :   http://api.openweathermap.org/data/2.5/weather?q=
// cityname :   Manila
// appid    :   653b1f0bf8a08686ac505ef6f05b94c2

http://api.openweathermap.org/data/2.5/weather?q=Manila&APPID=653b1f0bf8a08686ac505ef6f05b94c2
{% endhighlight %}

Working link: <a href="http://api.openweathermap.org/data/2.5/weather?q=Manila&APPID=653b1f0bf8a08686ac505ef6f05b94c2">http://api.openweathermap.org/data/2.5/weather?q=Manila&APPID=653b1f0bf8a08686ac505ef6f05b94c2</a>

<img src="https://user-images.githubusercontent.com/10904957/27802669-cf351c3e-6057-11e7-94ff-475d46372dc0.png"/>

<i>It returns a json weather details</i>

Now you already have your own working api, it's time to consume those data to our cross platform mobile application.

To be continued...