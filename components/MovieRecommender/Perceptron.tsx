import React, { useEffect, useState } from 'react';

const Perceptron = () => {
  const [action, setAction] = useState(0);
  const [comedy, setComedy] = useState(0);
  const [horror, setHorror] = useState(0);
  const [fill, setFill] = useState(34);
  const [outputText, setOutputText] = useState("Dislike");
  const [fillColor, setFillColor] = useState("white");
  const [opacity1, setOpacity1] = useState("100%");
  const [opacity2, setOpacity2] = useState("0%");
  const [opacity3, setOpacity3] = useState("0%");

  useEffect(() => {
    setFill((action + comedy - horror) * 33 + 34);

    if (fill === 100) {
      setOutputText("Like");
      setFillColor("#2b665b");
      setOpacity1("0%");
      setOpacity2("0%");
      setOpacity3("100%");
    } else if (fill === 67) {
      setOutputText("Dislike");
      setFillColor("white");
      setOpacity1("0%");
      setOpacity2("100%");
      setOpacity3("0%");
    } else if (fill === 34) {
      setOutputText("Dislike");
      setFillColor("white");
      setOpacity1("100%");
      setOpacity2("0%");
      setOpacity3("0%");
    } else {
      setOutputText("Dislike");
      setFillColor("white");
      setOpacity1("0%");
      setOpacity2("0%");
      setOpacity3("0%");
    }
  }, [action, comedy, horror, fill]);

  const toggleAction = () => {
    setAction((action + 1) % 2);
  };

  const toggleComedy = () => {
    setComedy((comedy + 1) % 2);
  };

  const toggleHorror = () => {
    setHorror((horror + 1) % 2);
  };

  return (
    <div className="flex flex-col pl-4 select-none">
    <div className="w-64 h-64 text-2xl">
      <svg viewBox = "0 0 500 500">
        <path d="M 125 100 C 175 100, 175 250, 225 250" stroke="#3399ff" strokeWidth="6" fill="none" stroke-dasharray="10,5"/>
        <line x1="125" y1="250" x2="225" y2="250" stroke="#3399ff" strokeWidth="6" stroke-dasharray="10,5"/>
        <path d="M 125 400 C 175 400, 175 250, 225 250" stroke="#da5f31" strokeWidth="6" fill="none" stroke-dasharray="10,5"/>
        <line x1="325" y1="250" x2="375" y2="250" stroke="#2b665b" strokeWidth="6" stroke-dasharray="10,5"/>
        <rect className="cursor-pointer" onClick={toggleAction} x="25" y="50" rx="10" ry="10" width="100" height="100" style={{fill:action?'#2b665b':'white', stroke:'#2b665b', strokeWidth:5}} />
        <rect className="cursor-pointer" onClick={toggleComedy} x="25" y="200" rx="10" ry="10" width="100" height="100" style={{fill:comedy?'#2b665b':'white', stroke:'#2b665b', strokeWidth:5}} />
        <rect className="cursor-pointer" onClick={toggleHorror} x="25" y="350" rx="10" ry="10" width="100" height="100" style={{fill:horror?'#2b665b':'white', stroke:'#2b665b', strokeWidth:5}} />
        <rect x="225" y="200" rx="10" ry="10" width="100" height="100" style={{fill:'white', stroke:'#2b665b', strokeWidth:5}} />
        <path d={`
           M 225,260 
           h 100
           v 28 
           a 10,10 0 0 1 -10,10 
           h -80 
           a 10,10 0 0 1 -10,-10 
          `} fill="#2b665b" opacity={opacity1}/>
        <path d={`
           M 225,230 
           h 100
           v 60 
           a 10,10 0 0 1 -10,10 
           h -80 
           a 10,10 0 0 1 -10,-10 
          `} fill="#2b665b" opacity={opacity2}/>
        <rect x="225" y="200" rx="10" ry="10" width="100" height="100" style={{fill:'#2b665b', opacity:opacity3}} />
        <rect x="375" y="200" rx="10" ry="10" width="100" height="100" style={{fill:fillColor, stroke:'#2b665b', strokeWidth:5}} />
        <text x="25" y="40">Action: {action?'ja':'nein'}</text>
        <text x="25" y="190">Comedy: {comedy?'ja':'nein'}</text>
        <text x="25" y="340">Horror: {horror?'ja':'nein'}</text>
        <text x="425" y="190" textAnchor="middle">{outputText}</text>
      </svg>
    </div>
    <div className="text-xs px-4">
    Perzeptron mit veränderbaren Eingabesignalen
    </div>
    </div>
  );
};

export default Perceptron;
