   export function createProcessor($win = window) {
       const $doc = $win.document;
       const efp = $doc.elementFromPoint.bind($doc);
       return function(data = []) {
           const bodyHeight = $doc.body.offsetHeight;
           const bodyScrollTop = $doc.body.scrollTop;
           const bodyScrollLeft = $doc.body.scrollLeft;
           const winHeight = $win.innerHeight;
           return data.map((x, i) => {
               let $el = x.$el || (x.$el = $doc.querySelector(x.selector));
               delete x.visible;
               delete x.slient;
               if (!$el) {
                   return x;
               }
               let rect = $el.getBoundingClientRect();
               let _width = rect.width;
               let _height = rect.height;
               let _centerX = rect.left + _width / 2;
               let _centerY = rect.top + _height / 2;
               // refer to http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
               // if the point is scrolled out, then keep it.
               let visible = _width && _height && $el.contains(efp(_centerX, _centerY));
               let slient = _centerY < 0 || _centerY > winHeight && !visible;
               if (slient) {
                   return {
                       ...x,
                       slient
                   }
               }
               if (visible) {
                   _centerX = Math.round(bodyScrollLeft + _centerX);
                   _centerY = Math.round(bodyScrollTop + _centerY);
                   return {
                       ...x,
                       _width,
                       _height,
                       _centerX,
                       _centerY,
                       visible
                   };
               }
               return x;
           });
       }
   }
   
