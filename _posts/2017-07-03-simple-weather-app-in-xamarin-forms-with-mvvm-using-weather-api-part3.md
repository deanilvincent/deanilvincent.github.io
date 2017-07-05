---
layout: post
type: blog
title:  "Simple Weather App in Xamarin Forms with MVVM using Weather API Part 3"
date:   2017-07-03 12:33:33
snippet: This is the continuation of the "Simple Weather App in Xamarin Forms with MVVM using Weather API Part 2" where we will start putting our UI design for our simple weather app
---

This is the continuation of the "Simple Weather App in Xamarin Forms with MVVM using Weather API Part 2" where we'll going to put our UI

This is the last part of building our simple weather app

## Front-End Xaml Phase

### 11.0 The Xaml Page

11.1 Open the MainPage.xaml Page and reference the ViewModel inside the Xaml Page

{% highlight ruby linenos %}
xmlns:weatherVm="clr-namespace:SimpleCrossWeatherApp.ViewModels"
{% endhighlight %}

<img src="https://user-images.githubusercontent.com/10904957/27872545-fdd59936-615d-11e7-904a-cbfadc49a592.PNG"/>

11.2 Add these following code snippets

{% highlight ruby linenos %}
<ContentPage.BindingContext>
    <weatherVm:WeatherViewModel/>
</ContentPage.BindingContext>

<StackLayout Padding="20,40,20,20">
    <Entry Text="{Binding City, Mode=TwoWay}"
           Placeholder="Search City"/>
    <ActivityIndicator IsRunning="{Binding IsBusy,Mode=TwoWay}"/>
    <StackLayout Orientation="Horizontal">
        <StackLayout HorizontalOptions="StartAndExpand">
            <Label Text="City:"/>
        </StackLayout>
        <StackLayout HorizontalOptions="EndAndExpand">
            <Label Text="{Binding WeatherMainModel.name}"/>
        </StackLayout>
    </StackLayout>

    <StackLayout Orientation="Horizontal">
        <StackLayout HorizontalOptions="StartAndExpand">
            <Label Text="Country:"/>
        </StackLayout>
        <StackLayout HorizontalOptions="EndAndExpand">
            <Label Text="{Binding WeatherMainModel.sys.country}"/>
        </StackLayout>
    </StackLayout>

    <StackLayout Orientation="Horizontal">
        <StackLayout HorizontalOptions="StartAndExpand">
            <Label Text="Temperature:"/>
        </StackLayout>
    <StackLayout HorizontalOptions="EndAndExpand">
            <Label Text="{Binding WeatherMainModel.main.temp}"/>
        </StackLayout>
    </StackLayout>

    <StackLayout Orientation="Horizontal">
        <StackLayout HorizontalOptions="StartAndExpand">
            <Label Text="Humidity:"/>
        </StackLayout>
    <StackLayout HorizontalOptions="EndAndExpand">
            <Label Text="{Binding WeatherMainModel.main.humidity}"/>
        </StackLayout>
    </StackLayout>

    <StackLayout Orientation="Horizontal">
        <StackLayout HorizontalOptions="StartAndExpand">
            <Label Text="Weather Main Status:"/>
        </StackLayout>
    <StackLayout HorizontalOptions="EndAndExpand">
            <Label Text="{Binding WeatherMainModel.weather[0].main}"/>
        </StackLayout>
    </StackLayout>

    <StackLayout Orientation="Horizontal">
        <StackLayout HorizontalOptions="StartAndExpand">
            <Label Text="Weather Status:"/>
        </StackLayout>
        <StackLayout HorizontalOptions="EndAndExpand">
            <Label Text="{Binding WeatherMainModel.weather[0].description}"/>           
        </StackLayout>
     </StackLayout>

    <StackLayout Orientation="Horizontal">
        <StackLayout HorizontalOptions="StartAndExpand">
            <Label Text="Wind Speed:"/>
        </StackLayout>
    <StackLayout HorizontalOptions="EndAndExpand">
            <Label Text="{Binding WeatherMainModel.wind.speed}"/>
        </StackLayout>
    </StackLayout>
</StackLayout>
{% endhighlight %}

## Final Step

Run the App