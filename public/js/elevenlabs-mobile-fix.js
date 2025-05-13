
/**
 * ElevenLabs Mobile Widget Fix
 * This script ensures the ElevenLabs widget is properly displayed and draggable on mobile devices
 */

(function() {
  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a mobile device
    const isMobile = window.innerWidth < 768;
    
    // Function to initialize widget visibility
    function initializeWidget() {
      // Try to find the ElevenLabs widget
      const widget = document.querySelector('elevenlabs-convai');
      const footer = document.querySelector('footer');
      
      if (widget) {
        console.log('ElevenLabs widget found, applying mobile optimizations');
        
        // Calculate footer height or use fallback
        const footerHeight = footer ? footer.offsetHeight : 100;
        
        // Position the widget above the footer
        if (isMobile) {
          widget.style.position = 'fixed';
          widget.style.display = 'block';
          widget.style.opacity = '1';
          widget.style.zIndex = '999';
          widget.style.bottom = (footerHeight + 20) + 'px'; // Position above footer
          widget.style.right = '10px';
        }
        
        // Make widget draggable regardless of device
        makeElementDraggable(widget);
      } else {
        console.log('ElevenLabs widget not found, will retry');
        // If widget not found, try again after a delay
        setTimeout(initializeWidget, 1000);
      }
    }
    
    // Initialize after a short delay to ensure the widget has loaded
    setTimeout(initializeWidget, 1000);
    
    // Make an element draggable
    function makeElementDraggable(element) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      
      element.onmousedown = dragMouseDown;
      element.ontouchstart = dragTouchStart;
      
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // Call a function whenever the cursor moves
        document.onmousemove = elementDrag;
      }
      
      function dragTouchStart(e) {
        const touch = e.touches[0];
        e.preventDefault();
        // Get the touch position at startup
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        document.ontouchend = closeTouchDragElement;
        document.ontouchmove = elementTouchDrag;
      }
      
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Set the element's new position
        const newTop = element.offsetTop - pos2;
        const newLeft = element.offsetLeft - pos1;
        
        // Ensure widget stays within viewport bounds
        const maxX = window.innerWidth - element.offsetWidth;
        const maxY = window.innerHeight - element.offsetHeight;
        
        element.style.top = Math.min(Math.max(0, newTop), maxY) + "px";
        element.style.left = Math.min(Math.max(0, newLeft), maxX) + "px";
        element.style.position = 'fixed';
        element.style.bottom = 'auto'; // Override default bottom position
        element.style.right = 'auto'; // Override default right position
      }
      
      function elementTouchDrag(e) {
        const touch = e.touches[0];
        e.preventDefault();
        // Calculate the new touch position
        pos1 = pos3 - touch.clientX;
        pos2 = pos4 - touch.clientY;
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        // Set the element's new position
        const newTop = element.offsetTop - pos2;
        const newLeft = element.offsetLeft - pos1;
        
        // Ensure widget stays within viewport bounds
        const maxX = window.innerWidth - element.offsetWidth;
        const maxY = window.innerHeight - element.offsetHeight;
        
        element.style.top = Math.min(Math.max(0, newTop), maxY) + "px";
        element.style.left = Math.min(Math.max(0, newLeft), maxX) + "px";
        element.style.position = 'fixed';
        element.style.bottom = 'auto'; // Override default bottom position
        element.style.right = 'auto'; // Override default right position
      }
      
      function closeDragElement() {
        // Stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
      }
      
      function closeTouchDragElement() {
        // Stop moving when touch ends
        document.ontouchend = null;
        document.ontouchmove = null;
      }
    }
    
    // Handle window resize events to keep widget properly positioned
    window.addEventListener('resize', function() {
      const widget = document.querySelector('elevenlabs-convai');
      const footer = document.querySelector('footer');
      
      if (widget && footer) {
        // If window is resized to mobile size
        if (window.innerWidth < 768) {
          const footerHeight = footer.offsetHeight;
          widget.style.bottom = (footerHeight + 20) + 'px';
          widget.style.right = '10px';
        }
      }
    });
  });
})();
