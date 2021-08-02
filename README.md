
# TextGraphic

TextGraphic _(previously "TextKit")_ is a framework for creating _Textual Graphics_. It provides layers, styling, rich color, text justification, layouts, tables, view-ports, transparency, etc. All behind a beautiful object-oriented view model that is easy and humane to use. Underneath it also provides a rich rendering engine that is fully independent of any platform and can synthesize rendered code for ANSI Terminals, Web, and plain text format. Written in pure ECMAScript without incorporating any platform provided API, (no node/DOM API is used) and therefore works on any JavaScript platform.

<br>

![Header Screenshots of the TextGraphic Playground and Demos](https://user-images.githubusercontent.com/2157285/124506813-b17be900-dde1-11eb-83d1-2c889eef50c1.png)

<br>

_A remark is that while TextGraphic can be used to style command line interfaces, it is not a command line interface library. It can work on many platforms and is intended to do the core visual tasks. I will have more libraries coming on top of the TextGraphic. A TermKit that provides some advance Terminal features and libraries for textual graphics and textual interfaces._

<br><br>

## The View Model of the TextGraphic

TextGraphic in its core, provides a 2D representation of text which is defined in a set of classes called Views &mdash; _that are implementations of the ViewProtocol standard_. These Views makes it possible to define a 2D textual object: <br><br>

![A demo of TextGraphic in the Playground that shows the basic shaping and styling.](https://user-images.githubusercontent.com/2157285/124508332-f5bcb880-dde4-11eb-9686-d21ea07b116a.png)

TextGraphic makes it possible to compose layers and views by combining the layers together.

![An screenshot showing the label being added to the canvas](https://user-images.githubusercontent.com/2157285/124508639-96ab7380-dde5-11eb-94d1-d83cab4e52fb.png)

<br><br>

## Rendering Capabilities of TextGraphic

### Rich Composition

In TextGraphic you can combine scenes together and each View preserves the boundary for itself. So the children of the view are always retained within the boundaries of the view. This makes it possible to do all sorts of powerful things. &mdash; _P.S. Look how the borders of the boxes are combined together in their intersections :)_

<br>

![The Pane Animation Demo of the TextGraphic that shows how different canvases can be added together independent of their space](https://user-images.githubusercontent.com/2157285/124508914-13d6e880-dde6-11eb-99cf-9fda7acefcc4.gif)

<br>

### Over-lapping Layers and Transparency

TextGraphic is different from some of its alternatives because it uses a Virtual Screen underneath. TextGraphic uses no cursor movements. Instead, it uses a virtual screen to compute the resulting view and then synthesizes the required styling information (ANSI Terminal escape sequences in this example) and returns one single string that you can push to the `stdout` or `.innerHTML`

To do so. TextGraphic uses a simple ray-tracer for z-index locating and then composes layers together. Having z-index and ray-tracing makes it possible to have objects that over-lap and also because of ray-tracing, objects can have transparency in them.

<br>

![Screenshot of a TextGraphic demo showing 3 boxes layered on each other. On with a transparent background and one with a solid colored background](https://user-images.githubusercontent.com/2157285/124674068-46a8db80-decf-11eb-98fe-84d367e36822.png)

<br>

### Graphing Engine

In TextGraphic you can use the GraphView to render mathematical formulas into a textual format. This is done efficiently without taking advantage of a GPU (although I very much hope to have WebGPU as a GPGPU available on browser and the node so that I can implement a super preformat version of it.)

<br>

![Screenshot of a graph being rendered into the screen](https://user-images.githubusercontent.com/2157285/125514236-7ab29f83-df08-4041-963d-54e9a0ad157b.gif)

<br>

### Scalable Vector Graphics

By providing an efficient GraphView, TextGraphic makes it possible to have scalable vector graphics that are useful in making different UI components or graphical arts. You can make these shapes react to zoom, window size and view port size changes.

<br>

![](https://user-images.githubusercontent.com/2157285/125548299-a8242db3-897c-48c0-85ca-593aaeb02b3a.gif)

<br>

### Unicode Box Fine Tunning

TextGraphic's Canvas view can fine tune the intersections of unicode boxes. This table is made of putting 30 independent boxes together, but TextGraphic can change the characters at where these boxes are joined together and it also understands the weights of these connections. So the result is a very beautiful and fine tunned result that previously was impossible or extremely hard to implement. (I know of no other system that implements anything like this. [Monodraw](http://monodraw.helftone.com) does have this ability but it only works for the light lines and weight detection is still unique to TextGraphic I guess)

<br>

![An spreadsheet view demo that shows the UNICODE box fine tunning.](https://user-images.githubusercontent.com/2157285/124509224-c9a23700-dde6-11eb-8db2-f05f35b79fb0.gif)

<br>

### Cropping & Slicing

TextGraphic offers a fast and virtually footprint-free system for cropping views. This makes for a great tool for making layouts, scroll views, etc...

<br>

![](https://user-images.githubusercontent.com/2157285/124509778-bcd21300-dde7-11eb-96b4-89264f582521.gif)

<br>

### Static Render Synthesis

TextGraphic is a rendering engine that synthesizes the final render at once. It does not require any realtime cursor movement or environmental changes. This enables some really powerful features.
- The system becomes platform independent as you see in the next feature title.
- You get to run the renderer as a server side feature while having clients showing its renders.
- It can be used to synthesize and generate all sorts of static content for the machine and the web.
- The synthesized view can be further enhanced and modified by third party code.
- Since you have the whole view computed ahead of time, you get a very high speed when rendering :)

<br>

![](https://user-images.githubusercontent.com/2157285/124675008-0d716b00-ded1-11eb-92d3-dfbb93de1e4d.png)

<br>

### Platform Independent Rendering

The design of TextGraphic is around a central idea of having different renderers for different environments, which are open to anyone to also extend and add to. TextGraphic has a Virtual Screen and Ray-Tracker system that makes it possible to compute optimized native renders for different platforms. Currently TextGraphic offers renderers for [ANSI Terminal](https://github.com/pouyakary/TextGraphic/tree/master/TextGraphic/source/environments/ansi-terminal), [SVG](https://github.com/pouyakary/TextGraphic/tree/master/TextGraphic/source/environments/svg), and [HTML](https://github.com/pouyakary/TextGraphic/tree/master/TextGraphic/source/environments/html).

<br>

![Screenshots of a graphic rendered for ANSI Terminal, SVG and Web](https://user-images.githubusercontent.com/2157285/126066739-24eecd9f-cdf3-410a-aec5-5855dec84509.png)

<br><br>

## Installation and Usage

For now, I'm designing the system so it is both unstable and the API is subject to drastic change. You can look at the [playground examples](https://github.com/pouyakary/TextGraphic/tree/master/TextGraphic/playgrounds) to get an idea of how to use the system. And the package can be installed using and used as:

<br>

```shell
% npm install --save @kary/TextGraphic
```

```TypeScript
import * as TextGraphic from "@kary/TextGraphic"
```

<br>

You can also play inside the playground. TextGraphic has its own environment for playing around with the codes and testing your ideas, It has auto-complete features and debugging views. <br>
[Learn more about the playground and its capabilities →](https://github.com/pouyakary/TextGraphic/wiki/playground)

<br>

![Screenshot showing the TextGraphic Playground](https://user-images.githubusercontent.com/2157285/124616367-425acf00-de8b-11eb-8b0a-a1a3994a61fe.png)


<br><br><br><br><br>
<a href="https://kary.us/"><img src="https://inventory.kary.us/content/signature.png" width="120"></a><br><br>
&copy; Copyright 2020&mdash;present, [Pouya Kary](https://kary.us). All rights reserved.<br><br>
