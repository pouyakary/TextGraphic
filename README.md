
# TextKit

TextKit is a framework for creating _Textual Graphics_. It provides layers, styling, rich color, text justification, layouts, tables, view-ports, transparency, etc. All behind a beautiful object-oriented view model that is easy and humane to use

Underneath it also provides a rich rendering engine that is fully independent of any platform and can synthesize rendered code for ANSI Terminals, Web, and plain text format. Written in pure ECMAScript without incorporating any platform provided API, (no node/DOM API is used) and therefore works on any JavaScript platform.

<br>

![Header Screenshots of the TextKit Playground and Demos](https://user-images.githubusercontent.com/2157285/124506813-b17be900-dde1-11eb-83d1-2c889eef50c1.png)

<br><br>

## The View Model of the TextKit

TextKit in its core, provides a 2D representation of text which is defined in a set of classes called Views &mdash; _that are implementations of the ViewProtocol standard_. These Views makes it possible to define a 2D textual object: <br><br>

![A demo of TextKit in the Playground that shows the basic shaping and styling.](https://user-images.githubusercontent.com/2157285/124508332-f5bcb880-dde4-11eb-9686-d21ea07b116a.png)

TextKit makes it possible to compose layers and views by combining the layers together.

![An screenshot showing the label being added to the canvas](https://user-images.githubusercontent.com/2157285/124508639-96ab7380-dde5-11eb-94d1-d83cab4e52fb.png)

<br><br>

## Advanced Rendering Capabilities of TextKit

<br>

### Rich Composition

In TextKit you can combine scenes together and each View preserves the boundary for itself. So the children of the view are always retained within the boundaries of the view. This makes it possible to do all sorts of powerful things. &mdash; _P.S. Look how the borders of the boxes are combined together in their intersections :)_

<br>

![The Pane Animation Demo of the TextKit that shows how different canvases can be added together independent of their space](https://user-images.githubusercontent.com/2157285/124508914-13d6e880-dde6-11eb-99cf-9fda7acefcc4.gif)

<br>

### Unicode Box Fine Tunning

TextKit's Canvas view can fine tune the intersections of unicode boxes. This table is made of potting 30 independent boxes together, but TextKit can change the characters at where these boxes are joined together and it also understands the weights of these connections. So the result is a very beautiful and fine tunned result that previously was impossible or extremely hard to implement. I know of now other system that implements anything like this. ([Monodraw](http://monodraw.helftone.com) does have this ability but it only works for the light lines and weight detection is still unique to TextKit.)

<br>

![An spreadsheet view demo that shows the UNICODE box fine tunning.](https://user-images.githubusercontent.com/2157285/124509224-c9a23700-dde6-11eb-8db2-f05f35b79fb0.gif)

<br>

### Advanced Cropping & Slicing

TextKit offers a fast and virtually footprint-free system for cropping views. This makes for a great tool for making layouts, scroll views, etc...

<br>

![](https://user-images.githubusercontent.com/2157285/124509778-bcd21300-dde7-11eb-96b4-89264f582521.gif)

<br><br>

### Platform Independent Rendering

The design of TextKit is around a central idea of having different renderers for different environments, which are open to anyone to also extend and add to. TextKit has a Virtual Screen and Ray-Tracker system that makes it possible to compute optimized native renders for each platform that look exactly the same.

<br>

![Screenshots of a graphic rendered for ANSI Terminal and Web](https://user-images.githubusercontent.com/2157285/124510265-b001ef00-dde8-11eb-8066-8c6df650ab7d.png)