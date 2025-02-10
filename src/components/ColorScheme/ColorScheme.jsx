import React, { useState } from 'react';

function App() {
  const [buttonColor, setButtonColor] = useState('#6cc14f'); // Color for the buttons
  const [iconColor, setIconColor] = useState('#6cc14f'); // Color for the website Icons

  return (
    <div>
        <button style={{ backgroundColor: buttonColor }} className="button-class">
            Button
        </button>
        <i style={{ color: iconColor }} className="icon-class">
            Icon
        </i>
    </div>
  );
}

export default App;