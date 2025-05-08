import React, { useEffect, useRef } from 'react';
import imagesLoaded from 'imagesloaded';
import './ImageTrailEffect.css';

const ImageTrailEffect = ({ images }) => {
  const contentRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    // Check if we need to load GSAP from CDN
    const loadGSAP = () => {
      return new Promise((resolve) => {
        if (window.TweenMax) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js';
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    // Initialize the image trail effect once images are loaded
    const initImageTrail = () => {
      // Remove loading class
      document.body.classList.remove('loading');
      
      // Create the ImageTrail instance
      new ImageTrailClass();
    };

    // Preload images
    const preloadImages = () => {
      return new Promise((resolve, reject) => {
        imagesLoaded(contentRef.current.querySelectorAll('img'), resolve);
      });
    };

    // MathUtils helper
    const MathUtils = {
      // linear interpolation
      lerp: (a, b, n) => (1 - n) * a + n * b,
      // distance between two points
      distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1)
    };

    // Get mouse position
    const getMousePos = (ev) => {
      let posx = 0;
      let posy = 0;
      if (!ev) ev = window.event;
      if (ev.pageX || ev.pageY) {
        posx = ev.pageX;
        posy = ev.pageY;
      } else if (ev.clientX || ev.clientY) {
        posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      return { x: posx, y: posy };
    };

    // Mouse positions
    let mousePos = { x: 0, y: 0 };
    let lastMousePos = { x: 0, y: 0 };
    let cacheMousePos = { x: 0, y: 0 };

    // Update mouse position on mousemove
    const mouseMoveHandler = (ev) => {
      mousePos = getMousePos(ev);
    };
    window.addEventListener('mousemove', mouseMoveHandler);

    // Get mouse distance
    const getMouseDistance = () => MathUtils.distance(
      mousePos.x, mousePos.y, 
      lastMousePos.x, lastMousePos.y
    );

    // Image class
    class Image {
      constructor(el) {
        this.DOM = { el: el };
        // image default styles
        this.defaultStyle = {
          scale: 1,
          x: 0,
          y: 0,
          opacity: 0
        };
        // get sizes/position
        this.getRect();
        // init/bind events
        this.initEvents();
      }
      
      initEvents() {
        // on resize get updated sizes/position
        window.addEventListener('resize', () => this.resize());
      }
      
      resize() {
        // reset styles
        window.TweenMax.set(this.DOM.el, this.defaultStyle);
        // get sizes/position
        this.getRect();
      }
      
      getRect() {
        this.rect = this.DOM.el.getBoundingClientRect();
      }
      
      isActive() {
        // check if image is animating or if it's visible
        return window.TweenMax.isTweening(this.DOM.el) || this.DOM.el.style.opacity !== 0;
      }
    }

    // ImageTrail class
    class ImageTrailClass {
      constructor() {
        // images container
        this.DOM = { content: contentRef.current };
        // array of Image objs, one per image element
        this.images = [];
        [...this.DOM.content.querySelectorAll('img')].forEach(img => 
          this.images.push(new Image(img))
        );
        // total number of images
        this.imagesTotal = this.images.length;
        // upcoming image index
        this.imgPosition = 0;
        // zIndex value to apply to the upcoming image
        this.zIndexVal = 1;
        // mouse distance required to show the next image
        this.threshold = 100;
        // render the images
        requestAnimationFrame(() => this.render());
      }
      
      render() {
        // get distance between the current mouse position and the position of the previous image
        let distance = getMouseDistance();
        // cache previous mouse position
        cacheMousePos.x = MathUtils.lerp(cacheMousePos.x || mousePos.x, mousePos.x, 0.1);
        cacheMousePos.y = MathUtils.lerp(cacheMousePos.y || mousePos.y, mousePos.y, 0.1);

        // if the mouse moved more than [this.threshold] then show the next image
        if (distance > this.threshold) {
          this.showNextImage();

          ++this.zIndexVal;
          this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
          
          lastMousePos = mousePos;
        }

        // check when mousemove stops and all images are inactive (not visible and not animating)
        let isIdle = true;
        for (let img of this.images) {
          if (img.isActive()) {
            isIdle = false;
            break;
          }
        }
        // reset z-index initial value
        if (isIdle && this.zIndexVal !== 1) {
          this.zIndexVal = 1;
        }

        // loop..
        requestAnimationFrame(() => this.render());
      }
      
      showNextImage() {
        // show image at position [this.imgPosition]
        const img = this.images[this.imgPosition];
        // kill any tween on the image
        window.TweenMax.killTweensOf(img.DOM.el);

        // Ensure we have the current dimensions since height is now auto
        img.getRect();

        new window.TimelineMax()
          // show the image
          .set(img.DOM.el, {
            startAt: { opacity: 0, scale: 1 },
            opacity: 1,
            scale: 1,
            zIndex: this.zIndexVal,
            x: cacheMousePos.x - img.rect.width / 2,
            y: cacheMousePos.y - img.rect.height / 2
          }, 0)
          // animate position
          .to(img.DOM.el, 0.9, {
            ease: window.Expo.easeOut,
            x: mousePos.x - img.rect.width / 2,
            y: mousePos.y - img.rect.height / 2
          }, 0)
          // then make it disappear
          .to(img.DOM.el, 1, {
            ease: window.Power1.easeOut,
            opacity: 0
          }, 0.4)
          // scale down the image
          .to(img.DOM.el, 1, {
            ease: window.Quint.easeOut,
            scale: 0.2
          }, 0.4);
      }
    }

    // Load GSAP, then load images and init
    loadGSAP().then(() => {
      preloadImages().then(initImageTrail);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      // Clean up event listeners for each image
      if (window.TweenMax) {
        document.querySelectorAll('.content__img').forEach(img => {
          window.TweenMax.killTweensOf(img);
        });
      }
    };
  }, [images]);

  return (
    <div className="image-trail-wrapper">
      <div ref={contentRef} className="content">
        {images.map((src, index) => (
          <img 
            key={index} 
            className="content__img" 
            src={src} 
            alt={`${index + 1}`} 
            ref={el => el && (imagesRef.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageTrailEffect; 