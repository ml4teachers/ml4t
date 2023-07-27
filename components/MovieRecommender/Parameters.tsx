import React, { useEffect, useState } from 'react';

const Parameters = () => {
  const [action, setAction] = useState(0);
  const [comedy, setComedy] = useState(0);
  const [z, setZ] = useState(0);
  const [w1, setW1] = useState(0);
  const [w2, setW2] = useState(0);
  const [b, setB] = useState(0);


  const toggleAction = () => {
    setAction((action + 1) % 2);
  };

  const toggleComedy = () => {
    setComedy((comedy + 1) % 2);
  };

  const W1plus = () => {
    if (w1<3){
      setW1(w1 + 1)
    };
  };

  const W1minus = () => {
    if (w1>-3){
      setW1(w1 - 1)
    };
  };

  const W2plus = () => {
    if (w2<3){
      setW2(w2 + 1)
    };
  };

  const W2minus = () => {
    if (w2>-3){
      setW2(w2 - 1)
    };
  };

  const bplus = () => {
    if (b<5){
      setB(b + 1)
    };
    console.log(b)
  };

  const bminus = () => {
    if (b>-5){
      setB(b - 1)
    };
    console.log(b)
  };

  return (
    <div className="flex flex-col pl-4">
    <div className="w-80 h-54 text-2xl pb-4">
      <svg viewBox = "0 0 500 320">
        <line x1="125" y1="100" x2="225" y2="100" stroke={w1 === 0 ? "none" : w1 > 0 ? "#3399ff" : "#da5f31"} strokeWidth={w1 !== 0 ? Math.abs(w1)*4 : 0} stroke-dasharray="10,5"/>
        <path d="M 125 250 C 175 250, 175 100, 225 100" fill="none" stroke={w2 === 0 ? "none" : w2 > 0 ? "#3399ff" : "#da5f31"} strokeWidth={w2 !== 0 ? Math.abs(w2)*4 : 0} stroke-dasharray="10,5"/>
        <line x1="325" y1="100" x2="375" y2="100" stroke="#2b665b" strokeWidth="6" stroke-dasharray="10,5"/>
        <rect className="cursor-pointer" onClick={toggleAction} x="25" y="50" rx="10" ry="10" width="100" height="100" style={{fill:action?'#2b665b':'white', stroke:'#2b665b', strokeWidth:5}} />
        <rect className="cursor-pointer" onClick={toggleComedy} x="25" y="200" rx="10" ry="10" width="100" height="100" style={{fill:comedy?'#2b665b':'white', stroke:'#2b665b', strokeWidth:5}} />
        <rect x="225" y="50" rx="10" ry="10" width="100" height="100" style={{fill:'white', stroke:'#2b665b', strokeWidth:5}} />
        <rect x="375" y="50" rx="10" ry="10" width="100" height="100" style={{fill:(action*w1+comedy*w2>b ? '#2b665b' : 'white'), stroke:'#2b665b', strokeWidth:5}} />
        <text x="75" y="40" text-anchor="middle">Action: {action?'ja':'nein'}</text>
        <text x="75" y="190" text-anchor="middle">Comedy: {comedy?'ja':'nein'}</text>
        <text x="425" y="40" textAnchor="middle">{(action*w1+comedy*w2)>b ? 'Like':'Dislike'}</text>
        <rect id="w1_minus" className="cursor-pointer" onClick={W1minus} x="35" y="105" rx="4" ry="4" width="35" height="35" style={{fill: 'white', stroke: '#2b665b', strokeWidth:4}}/>
        <rect id="w1_plus" className="cursor-pointer" onClick={W1plus} x="80" y="105" rx="4" ry="4" width="35" height="35" style={{fill: 'white', stroke: '#2b665b', strokeWidth:4}}/>
        <rect id="w2_minus" className="cursor-pointer" onClick={W2minus} x="35" y="255" rx="4" ry="4" width="35" height="35" style={{fill: 'white', stroke: '#2b665b', strokeWidth:4}}/>
        <rect id="w2_plus" className="cursor-pointer" onClick={W2plus} x="80" y="255" rx="4" ry="4" width="35" height="35" style={{fill: 'white', stroke: '#2b665b', strokeWidth:4}}/>
        <rect id="b_minus" className="cursor-pointer" onClick={bminus} x="235" y="160" rx="4" ry="4" width="35" height="35" style={{fill: 'white', stroke: '#2b665b', strokeWidth:4}}/>
        <rect id="b_plus" className="cursor-pointer" onClick={bplus} x="280" y="160" rx="4" ry="4" width="35" height="35" style={{fill: 'white', stroke: '#2b665b', strokeWidth:4}}/>
        <text x="39" y="141" style={{pointerEvents: 'none', fontSize: '2.6em', fill: '#da5f31'}}>-</text>
        <text x="83" y="136" style={{pointerEvents: 'none', fontSize: '2em', fill: '#3399ff'}}>+</text>
        <text x="239" y="195" style={{pointerEvents: 'none', fontSize: '2.6em', fill: '#da5f31'}}>-</text>
        <text x="283" y="192" style={{pointerEvents: 'none', fontSize: '2em', fill: '#3399ff'}}>+</text>
        <text x="39" y="291" style={{pointerEvents: 'none', fontSize: '2.6em', fill: '#da5f31'}}>-</text>
        <text x="83" y="286" style={{pointerEvents: 'none', fontSize: '2em', fill: '#3399ff'}}>+</text>
        <path d={`
           M 225,${100-8*(w1*action+w2*comedy)} 
           h 100
           v ${8*(w1*action+w2*comedy)+40}
           a 10,10 0 0 1 -10,10 
           h -80 
           a 10,10 0 0 1 -10,-10 
          `} fill="#2b665b"/>
        <line x1="227" y1={100-b*8} x2="323" y2={100-b*8} stroke={b === 0 ? "#2b665b" : b > 0 ? "#3399ff" : "#da5f31"} strokeWidth="5" stroke-dasharray="10.5"/>
        <line x1="227" y1={100-b*8} x2="323" y2={100-b*8} stroke={w1*action+w2*comedy > 0 && b === 0 ? "white" : ""} strokeWidth="5" stroke-dasharray="10.5"/>
        <text x="230" y="235" >Gewichtung 1:</text>
        <text x="430" y="235" text-anchor="end" >{w1}</text>
        <text x="230" y="270" >Gewichtung 2:</text>
        <text x="430" y="270" text-anchor="end" >{w2}</text>
        <text x="230" y="305" >Schwellenwert:</text>
        <text x="430" y="305" text-anchor="end" >{b}</text>
      </svg>
    </div>
    <div className="text-xs px-4 text-center">
    Perzeptron mit veränderbaren Parametern
    </div>
    </div>
  );
};

export default Parameters;
