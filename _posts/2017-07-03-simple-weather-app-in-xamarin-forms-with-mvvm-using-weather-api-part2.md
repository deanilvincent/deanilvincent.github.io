---
layout: post
type: blog
title:  "Simple Weather App in Xamarin Forms with MVVM using Weather API Part 2"
date:   2017-07-03 12:10:33
snippet: This is the continuation of the "Simple Weather App in Xamarin Forms with MVVM using Weather API Part 1" 
---

This is the continuation of the "Simple Weather App in Xamarin Forms with MVVM using Weather API Part 1"

This part is where we will going to start coding and building our application.

## Development Phase

### 5.0 Implementing WeatherAPI

5.1 Right click the folder "WeatherRestClient" and add new class file (Add -> Class...) and name it as "OpenWeatherMap" since we're going to use their api service.

5.2 Inside the file, add these following codes including your api link and key.

{% highlight ruby linenos %}
...
using Newtonsoft.Json;
using System.Net.Http;

namespace SimpleCrossWeatherApp.WeatherRestClient
{
    public class OpenWeatherMap<T>
    {
        private const string OpenWeatherApi = "http://api.openweathermap.org/data/2.5/weather?q=";
        private const string Key = "653b1f0bf8a08686ac505ef6f05b94c2";

        HttpClient _httpClient = new HttpClient();

        public async Task<T> GetAllWeathers(string city)
        {
            var json = await _httpClient.GetStringAsync(OpenWeatherApi + city + "&APPID=" + Key);

            var getWeatherModels = JsonConvert.DeserializeObject<T>(json);

            return getWeatherModels;
        }
    }
}
{% endhighlight %}

### 6.0 Creating Models Based on Weather API

In OpenWeatherMapAPI, you can see the Json format for the possible model names using Advanced REST Client (or other tools)

<img src="https://user-images.githubusercontent.com/10904957/27836532-60e29b10-6112-11e7-8587-0db252f1afff.png"/>

<i>Using this kind of tool, we are able to have the good visualization of "GET" result of our weather api. <i>

For this demo, we're going to use these models (class file):

- WeatherMainDetails.cs
- WeatherSubDetails.cs
- WeatherSysDetails.cs
- WeatherTempDetails.cs
- WeatherWindDetails.cs

// To be continued