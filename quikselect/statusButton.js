define(["qlik"], function(qlik) {
    return {
      paint: function($element, layout) {
        // Render the button
        $element.html(`
          <div id="status-button-container">
            <button id="status-button" onclick="markFinal()">Mark as Final</button>
            <p id="status-message"></p>
          </div>
        `);
        
        // Disable button if already finalized
        if (localStorage.getItem('reportFinalized')) {
          document.getElementById("status-button").disabled = true;
          document.getElementById("status-message").innerText = "Report already finalized by " + localStorage.getItem('finalizedBy') + " on " + localStorage.getItem('finalizedAt');
        }
      }
    };
  });
  
  function markFinal() {
    const user = qlik.currUser();
    const timestamp = new Date().toLocaleString();
  
    // Call Node.js API to log finalization (assumed to be running at localhost:3000)
    fetch('http://localhost:3000/api/finalize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: user.name, timestamp: timestamp }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Update UI
        document.getElementById("status-button").disabled = true;
        document.getElementById("status-message").innerText = `Report finalized by ${user.name} on ${timestamp}`;
  
        // Store status in local storage
        localStorage.setItem('reportFinalized', true);
        localStorage.setItem('finalizedBy', user.name);
        localStorage.setItem('finalizedAt', timestamp);
      }
    })
    .catch(error => console.error('Error:', error));
  }
  