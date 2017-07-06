---
layout: post
type: blog
title:  "Simple Weather App in Xamarin Forms with MVVM using Weather API Part 2"
date:   2017-07-03 12:10:33
snippet: This is the continuation of the "Simple Weather App in Xamarin Forms with MVVM using Weather API Part 1" 
---

This is the continuation of <a href="https://deanilvincent.github.io/2017/07/03/simple-weather-app-in-xamarin-forms-with-mvvm-using-weather-api-part1/">"Simple Weather App in Xamarin Forms with MVVM using Weather API Part 1"</a>

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

### 6.0 Creating Model Classes Based on Weather API

In OpenWeatherMapAPI, you can see the Json format for the possible model names using Advanced REST Client (or other tools)

<img src="https://user-images.githubusercontent.com/10904957/27836532-60e29b10-6112-11e7-8587-0db252f1afff.png"/>

<i>Using this kind of tool, we are able to have the good visualization of "GET" result of our weather api. <i>

For this demo, we're going to use this single (class file) representing our main model:

- WeatherMainModel.cs

6.1 Create this class file inside our "Models" folder by right clicking the folder -> Add -> Class... and name it as "WeatherMainModel.cs"

By looking at the "Get" response result from our web api, it returns different json properties. So, we need to add them inside our model in order to use them inside our project.

6.2 Add these following code snippets inside your WeatherMainModel class.

{% highlight ruby linenos %}
...
using Newtonsoft.Json;

namespace SimpleCrossWeatherApp.Models
{
    // serves as our main model in centralizing different classes
    public class WeatherMainModel
    {
        [JsonProperty("name")]
        public string name { get; set; }
        public WeatherTempDetails main { get; set; }
        public List<WeatherSubDetails> weather { get; set; }
        public WeatherWindDetails wind { get; set; }
        public WeatherSysDetails sys { get; set; }
    }
    
    public class WeatherSubDetails
    {        
        [JsonProperty("main")]
        public string main { get; set; }
        [JsonProperty("description")]
        public string description { get; set; }
    }

    public class WeatherSysDetails
    {
        [JsonProperty("country")]
        public string country { get; set; }
    }

    public class WeatherTempDetails
    {
        [JsonProperty("temp")]
        public string temp { get; set; }
        [JsonProperty("humidity")]
        public string humidity { get; set; }
    }

    public class WeatherWindDetails
    {
        [JsonProperty("speed")]
        public string speed { get; set; }
    }
}
{% endhighlight %}

We use different classes in order to match them to our web api request.

### 7.0 Creating Service Handler File between WeatherMainModel, OpenWeatherMap RestClient and ViewModels.

7.1 Go to "ServicesHandler" folder and add new class file by right clicking the folder -> Add -> Class... and name it as "WeatherServices.cs"

7.2 Add this code snippets for WeatherServices.cs

{% highlight ruby linenos %}
...
using SimpleCrossWeatherApp.Models;
using SimpleCrossWeatherApp.WeatherRestClient;

namespace SimpleCrossWeatherApp.ServicesHandler
{
    public class WeatherServices
    {
        OpenWeatherMap<WeatherMainModel> _openWeatherRest = new OpenWeatherMap<WeatherMainModel>();
        public async Task<WeatherMainModel> GetWeatherDetails(string city)
        {
            var getWeatherDetails = await _openWeatherRest.GetAllWeathers(city);
            return getWeatherDetails;
        }
    }
}
{% endhighlight %}

### 8.0 Implementing INotifyPropertyChanged

8.1 Go to "ViewModels" folder and add new class file by right clicking the folder -> Add -> Class... and name it as "WeatherViewModel.cs"

8.2 Add NotifyProperty interface in your class in order to notify the binding client that the property has changed value.

{% highlight ruby linenos %}
...
using System.ComponentModel;

namespace SimpleCrossWeatherApp.ViewModels
{
    public class WeatherViewModel : INotifyPropertyChanged
    {
        ...
    }
}
{% endhighlight %}

8.3 Inside the WeatherViewModel class, add this code snippet in order to use the method OnPropertyChanged()

{% highlight ruby linenos %}
// import this for CallerMemberName
...
using System.Runtime.CompilerServices;

public event PropertyChangedEventHandler PropertyChanged;

protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
{
    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}
{% endhighlight %}

### 9.0 Creating Properties for Model and for the String Property of the "city" (string parameter) 

9.1 Inside the WeatherViewModel, add this following code snippets.

{% highlight ruby linenos %}
// import these following references
...
using SimpleCrossWeatherApp.Models;
using SimpleCrossWeatherApp.ServicesHandler;

WeatherServices _weatherServices = new WeatherServices();

private WeatherMainModel _weatherMain;  // for xaml binding
public WeatherMainModel WeatherMain
{
    get { return _weatherMain; }
    set
    {
        _weatherMain = value;
        OnPropertyChanged();
    }
}

private string _city;   // for entry binding and for method parameter value
public string City
{
    get { return _city; }
    set
    {
        _city = value;
        InitializeGetWeatherAsync().Wait(); // We put .Wait() method in order to wait the thread while it's processing
        OnPropertyChanged();
    }
}

private bool _isBusy;   // for showing loader when the task is initializing
public bool IsBusy
{
    get { return _isBusy; }
    set
    {
        _isBusy = value;
        OnPropertyChanged();
    }
}
{% endhighlight %}

### 10.0 Adding Method to get the Returning Weather Details from WeatherServices

10.1 Add this following code snippets inside the WeatherViewModel

{% highlight ruby linenos %}
private async Task InitializeGetWeatherAsync()
{
    try
    {
        IsBusy = true; // set the ui property "IsRunning" to true(loading) in Xaml ActivityIndicator Control
        WeatherMain = await _weatherServices.GetWeatherDetails(_city);
    }
    finally
    {
        IsBusy = false;
    }
}
{% endhighlight %}

On the last page, we'll going to create our UI Page for our simple weather app

<a href="https://deanilvincent.github.io/2017/07/03/simple-weather-app-in-xamarin-forms-with-mvvm-using-weather-api-part3/">Simple Weather App in Xamarin Forms with MVVM using Weather API Part 3</a>

If have you some questions or comments regarding the Part 2 page, please drop it below. :)
