before-after-slide
==================

# To use:

# scripts
    <script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
    <script src="beforeAfter-0.1.js"></script>


# attach
    $(window).load(function() {
  	    $("#before_after").beforeAfter();
    });

# html
    <div id="before_after">
        <img src="./before.png" />
        <img src="./after.png" />
    </div>

quickly tested in Chrome, Firefox and Safari. Should probably work in IE too

works best with jQuery 1.7+ because the event delegation is way beter

you don't even have to know the image sizes

will adjust image sizes (with css) if they don't match (unles you don't want it to)

you can set the classes of the extra mark-up

You can completely customise the line that splits before and after

you can specify where to bind the mouse event for overflow (defaults to the image container)

if you have padding or borders on the image container or a wide custom line you can adjust the offset from the mouse

It's my first ever jQuery plugin


See the demo to give it a whirl


I know there are other plugins like this (likely better than this one) but this is more of a learning thing for me

Enjoy