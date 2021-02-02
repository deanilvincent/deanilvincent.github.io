---
layout: post
type: blog
title:  "Create Simple Custom URL Redirection for Vue.JS, React.JS or Angular"
date:   2021-01-16 00:00:33
snippet: In this blog, we're going to create our simple custom URL redirection for your javascript application.
---

<script>
    window.location.replace('https://dnilvincent.com/blog/posts/create-simple-custom-url-redirection-for-your-javascript-app')
</script>

On this blog, we're going to create our simple custom URL redirection for your javascript application. This is helpful especially if you're working with session timeout and you want to put the user's previous url in the login page URL path or in the local storage so when the user has successfully logged in, then it will redirect to the previous page before the session timeout.

We're setting up a simple redirection for <a href="https://vuejs.org/" target="_blank">Vue.JS</a>,  <a href="https://reactjs.org/" target="_blank">React.JS</a> and <a href="https://angular.io/" target="_blank">Angular</a>. But you can also try to implement or make similar approach on Vanilla.Js and other JS frameworks or libraries.

<img src="https://i.imgur.com/27il9OM.jpg" width="100%">

### 1. Add path in your app framework routing

Make sure to register this path on your routing system. Examples below.

For React.JS
{{highlight ruby linenos}}
    <Switch>
        <Route exact path="/login/r/:redirectionUrl">
            <Login />
        </Route>
    </Switch>
{{endhighlight}}

For Vue.JS
{{highlight ruby linenos}}
    const routes = [
        { path: '/login/r/:redirectionUrl', component: Login }
    ]
{{endhighlight}}

For Angular
{{highlight ruby linenos}}
    const routes: Routes = [
        { path: "login/r/:redirectionUrl", component: LoginComponent }
    ]
{{endhighlight}}

`r` stands for redirection. I just made it simplified in our url path. 

Alternatively, you can store the previous page path in `localStorage` or `sessionStorage` depending on your requirements.
### 2. Add the redirection logic inside the method that checks or triggers the session timeout.

I decided to put this simple javascript logic inside JWT token expiration validator. So when the JWT token is expired, then we redirect the user to the login page with that previous page attach to its url.

{{highlight ruby linenos}}
    import jwt_decode from "jwt-decode"

    function checkIfJwtTokenExpired(){
        const token = localStorage.getItem("token")
        if(token){
            const decodedToken = jwt_decode(token)
            if(decodedToken.exp < new Date().getTime() / 1000){
                window.location.href = `/login/r/${window.location.pathname}`
            }
        }
    }
{{endhighlight}}

If you're using other session validator, then it's fine. The main highlight of that code is our 
```
window.location.href = `/login/r/${window.location.pathname}`
```

### 3. Check if successfully login
In this step, let's assume that we're at the login page with attached URL of the previous page. For example, 
```
http://yourhost/login/r/products
```
So what we want is to redirect back the page if the user has been successfully logged in.

{{highlight ruby linenos}}
    let redirectURLPath = window.location.pathname
    // slice first 8 characters which is /login/r
    redirectURLPath = redirectURLPath.slice(8)

    // then we check if it's successfully login or not. (In depends on what logic you have)
    if(successAuth || validAccess){
        // we get the value of `redirectURLPath` and redirect it to the page. In our example, it's the `products` page.

        // for Vue.JS 
        this.$router.push({path: redirectURLPath})
        // for React.JS
        <Redirect to={ { pathname: redirectURLPath } } />
        // for Angular
        this.router.navigate([redirectURLPath]) or this.router.navigateByUrl(redirectURLPath);
    }
{{endhighlight}}

That's it. I hope you find this blog helpful. 

If you have some questions or comments, please drop it below 👇 :)
