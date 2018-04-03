   nPontos = 50;
   vert = [];
   blob = []

   function movepontos() {
     i = 0

     debug(blob.length)

     for (bl = 0; bl < blob.length; bl++) {
       blb = blob[bl]
       blb.dx = Math.cos(clock / 20 + 10 * blb.c3) * .4
       blb.dy = Math.sin(clock / 30 + 10 * blb.c3) * .4
     }

     for (var x = 0; x < nPontos; x++) {
       for (var y = 0; y < nPontos; y++) {

         p = vert[i++]
         p.x = x / nPontos - .5
         p.y = y / nPontos - .5

         r1 = 0
         g1 = 0
         b1 = 0

         for (bl = 0; bl < blob.length; bl++) {
           blb = blob[bl]

           aa = Math.sqrt((p.x - blb.dx) * (p.x - blb.dx) + (p.y - blb.dy) * (p.y - blb.dy))
           r1 += blb.c2 * Math.sin(clock * blb.c2a) * Math.cos(aa * 3) / aa
           g1 += blb.c2 * Math.sin(clock * blb.c2b) * Math.cos(aa * 3) / aa
           b1 += blb.c2 * Math.sin(clock * blb.c2c) * Math.cos(aa * 3) / aa
         }

         p.r = r1
         p.g = g1
         p.b = b1

       }
     }
   }

   function Blob() {
     return {
       c1: Math.random() * 2 - .2,
       c2: Math.random() * .2 + .1,

       c2a: Math.random() * .1 + .01,
       c2b: Math.random() * .1 + .01,
       c2c: Math.random() * .1 + .01,

       c3: Math.random() * 6,
       c4: Math.random() * .28,
       c5: Math.random() * .1 - .05
     }
   }

   function Vertice() {
     var r = Math.floor(Math.random() * 200) + 56
     var g = Math.floor(Math.random() * 200) + 56
     var b = Math.floor(Math.random() * 200) + 56
     var rnd1 = Math.random() - .5
     var rnd2 = Math.random() - .5
     return {
       x: 0,
       y: 0,
       z: 0,
       r1: rnd1,
       r2: rnd2,
       cor: "rgb(" + r + "," + g + "," + b + ")"
     }
   }

   function main() {
     limpaTela()
     movepontos()
     desenhapontos()
     return true
   }

   function desenhapontos() {

     if (1)
       for (i = 0; i < vert.length; i++) {
         p = vert[i]
         p.z = -p.r - p.g - p.b
         var x = p.x * (p.y + 1.5)
         var y = p.y + p.z / 50
         cnv.fillStyle = "rgb(" + Math.floor(p.r * 300) + "," + Math.floor(p.g * 300) + "," + Math.floor(p.b * 300) + ")"
         cnv.fillRect(x * 400 + w / 2, y * 400 + h / 2, 2, 2)
       }

     i = 0
     raiz = Math.sqrt(vert.length)
     for (x = 0; x < raiz; x++)
       for (y = 0; y < raiz; y++) {
         p = vert[i++]
         cnv.fillStyle = "rgb(" + Math.floor(p.r * 300) + "," + Math.floor(p.g * 300) + "," + Math.floor(p.b * 300) + ")"
         cnv.fillRect(w - raiz * 4 + x * 4, h - raiz * 4 + y * 4, 4, 4)
       }
   }



   function gerapontos() {
     for (var x = 0; x < nPontos; x++)
       for (var y = 0; y < nPontos; y++) {
         p = new Vertice();
         vert.push(p)
       }
     for (var x = 0; x < 5; x++)
       blob.push(new Blob())
   }



   function limpaTela() {
     cnv.fillStyle = "black";
     cnv.fillRect(0, 0, w, h)
   }
   window.onload = function(e) {
     cnv = obj.getContext('2d');
     gerapontos();
     update()
   }

   function debug(text) {
     document.getElementById('debug').innerHTML = text
   }
   obj = document.getElementById('canvas')
   w = obj.parentNode.clientWidth;
   h = w * .75

   w = 800
   h = 600

   clock = 0
   obj.width = w
   obj.height = h




   window.lol =
     window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     window.oRequestAnimationFrame ||
     window.msRequestAnimationFrame ||
     function(callback) {
       window.setTimeout(callback, 1e3 / 60)
     }

   function update() {
     clock++
     main()
       //window.lol(update)
     setTimeout(update, 40)
   }


   // https://jsfiddle.net/k4gwcLsq/
   // https://jsfiddle.net/4kfw0tgs/1/
   // https://jsfiddle.net/7suabafm/1/
