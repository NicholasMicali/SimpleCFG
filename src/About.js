import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

function About() {

  return (
    <>
    <Header/>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '75px', textAlign: 'center' }}>
      <img alt="cfg" src={require("./sCFG.png")} style={{width: '70%', marginBottom: '50px', opacity: '90%'}}/>
      <div style={{ fontSize: '30px', marginBottom: '200px' }}>
        Simple CFG is a tool to help you visualize your program through a CFG!
      </div>
      <div style={{ fontSize: '50px', marginBottom: '10px', fontWeight: 'bold', color: 'darkcyan'}}>
        What is a CFG?
      </div>
      <div style={{border: 'solid', borderWidth: '1px', width: '30%', height: '0px', marginBottom: '70px'}}></div>
      <div style={{ fontSize: '30px', marginBottom: '50px', width: '80%'}}>
        a control-flow graph, or CFG, is a graphical representation of all paths that might be traversed through a program during its execution.
      </div>
      <img alt="cfg" src={require("./aboutCFG1.png")} style={{border: 'solid', borderColor: 'darkcyan'}}/>
      <div style={{ fontSize: '30px', marginTop: '50px', marginBottom: '50px', width: '80%'}}>
        Think of it like a flowchart, where an If block represents a fork in the road, where you can decide which path to take, like example a:
      </div>
      <img alt="cfg" src={require("./aboutCFG.png")}/>
      <div style={{ fontSize: '30px', marginTop: '50px', marginBottom: '50px', width: '80%'}}>
        loops are represented a similar way, but in this case you are forced to return back up to the entry fork multiple times until you are ready to leave, like example b
      </div>
      <div style={{ fontSize: '50px', marginBottom: '70px', fontWeight: 'bold', color: 'darkcyan'}}>
        Putting it all together
      </div>
      <img alt="cfg" src={require("./aboutCFG2.png")} style={{width: '30%'}}/>
      <div style={{border: 'solid', borderWidth: '1px', width: '30%', height: '0px', marginBottom: '40px'}}></div>
      <div style={{ fontSize: '25px', marginTop: '50px', marginBottom: '50px', width: '80%'}}>
        We construct a larger graph from these smaller components until we represent an entire function. Following this chart will show you all the possible ways your program can function, and doing so will help you understand the basics of programming
      </div>
      <Link to="/">
        <button className="bigButton"> Get Started </button>
      </Link>
      <div style={{height: '100px'}}></div>
    </div>
    </>
  );
}
export default About