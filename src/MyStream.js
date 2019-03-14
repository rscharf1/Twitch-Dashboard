import React from "react";

function Stream(props) {
  return (
    <div className="stream container">
      <div className="row">
        <div className="stream-image col-sm-3">picture goes here</div>
        <div className="stream-info col-sm-7">
          <h5 className="name">Test</h5>
          <p className="game">{props.stream.game}</p>
          <p className="viewers">Number of viewers</p>
          <p className="description">Description</p>
        </div>
      </div>
    </div>
  );
}

export default Stream;

// function Stream(props) {
// return (
//     <div className="stream container">
//         <div className="row">
//             <div className="stream-image col-sm-3"><img src={props.stream.image}/></div>
//             <div className="stream-info col-sm-3">
//                 <h5 className="name">{props.stream.name}</h5>
//                 <p className="game">{props.stream.game}</p>
//                 <p className="viewers">{props.stream.viewers}</p>
//                 <p className="description">{props.stream.description}</p>
//             </div>
//         </div>
//     </div>
// );
// }
