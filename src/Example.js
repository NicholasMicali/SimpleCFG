import React from 'react';
import Header from './Header';

function About() {

  return (
    <>
    <Header/>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '75px' }}>
      <div style={{ fontSize: '50px', marginBottom: '130px', fontWeight: 'bold', color: 'darkcyan'}}>
        Example Graphs/Problems:
      </div>
      <div style={{ fontSize: '30px', marginBottom: '10px', fontWeight: 'bold', alignSelf: 'flex-start', marginLeft: '50px' }}>
        Example 1: If Statements
      </div>
      <div className="body" style={{ display: 'flex', justifyContent: 'center', gap: '200px', alignItems: 'flex-start', marginTop: '75px', marginLeft: '30px', marginRight: '0px'}}>
        <img alt="cfg" src={require("./ex1.png")} style={{width: '20%'}}/>
        <img alt="cfg" src={require("./ex1Code.png")} style={{width: '50%'}}/>
      </div>
      <div style={{ fontSize: '25px', marginTop: '50px', marginBottom: '70px', width: '80%', textAlign: 'center'}}>
        This is a basic if block, note how the Then and Else blocks converge after they have finished.
      </div>
      <div style={{ fontSize: '30px', marginBottom: '10px', fontWeight: 'bold', alignSelf: 'flex-start', marginLeft: '50px' }}>
        Example 2: Loops
      </div>
      <div className="body" style={{ display: 'flex', justifyContent: 'center', gap: '200px', alignItems: 'flex-start', marginTop: '75px', marginLeft: '30px', marginRight: '30px'}}>
        <img alt="cfg" src={require("./ex2.png")} style={{width: '30%'}}/>
        <img alt="cfg" src={require("./ex2While.png")} style={{width: '30%'}}/>
      </div>
      <div style={{ fontSize: '25px', marginTop: '50px', marginBottom: '70px', width: '80%', textAlign: 'center'}}>
        When we remove an else block from an if, it now has the option to never enter the if block, jumping to the end with the red path. This is a lot like how loop coditions work, however this jump is the only way to exit a loop.
      </div>
      <div style={{ fontSize: '30px', marginBottom: '10px', fontWeight: 'bold', alignSelf: 'flex-start', marginLeft: '50px' }}>
        Example 3: Fibonacci
      </div>
      <div className="body" style={{ display: 'flex', justifyContent: 'center', gap: '200px', alignItems: 'flex-start', marginTop: '75px', marginLeft: '30px', marginRight: '30px'}}>
        <img alt="cfg" src={require("./ex3.png")} style={{width: '30%'}}/>
        <img alt="cfg" src={require("./ex3Code.png")} style={{width: '50%'}}/>
      </div>
      <div style={{ fontSize: '25px', marginTop: '50px', marginBottom: '70px', width: '80%', textAlign: 'center'}}>
        This is a classic program which highlights how base cases work in recursion. Note how the graphs has dead-ends, effectivly stopping the infinite recursion. Data will continue to flow on the far right path, returning back to the top after the function call, until it hits a base case.
      </div>
      <div style={{ fontSize: '30px', marginBottom: '10px', fontWeight: 'bold', alignSelf: 'flex-start', marginLeft: '50px' }}>
        Example 4: Nested Loops
      </div>
      <div className="body" style={{ display: 'flex', justifyContent: 'center', gap: '200px', alignItems: 'flex-start', marginTop: '75px', marginLeft: '30px', marginRight: '30px'}}>
        <img alt="cfg" src={require("./ex4.png")} style={{width: '30%'}}/>
        <img alt="cfg" src={require("./ex4Code.png")} style={{width: '50%'}}/>
      </div>
      <div style={{ fontSize: '25px', marginTop: '50px', marginBottom: '70px', width: '80%', textAlign: 'center'}}>
        This code demonstrates nested loops, or loops within loops. note how the further left we go, the more nested, or smaller, the loop is.
      </div>
      <div style={{ fontSize: '30px', marginBottom: '10px', fontWeight: 'bold', alignSelf: 'flex-start', marginLeft: '50px' }}>
        Example 5: FizzBuzz
      </div>
      <div className="body" style={{ display: 'flex', justifyContent: 'center', gap: '100px', alignItems: 'flex-start', marginTop: '75px', marginLeft: '30px', marginRight: '30px'}}>
        <img alt="cfg" src={require("./ex5.png")} style={{width: '30%'}}/>
        <img alt="cfg" src={require("./ex5Code.png")} style={{width: '50%'}}/>
      </div>
      <div style={{ fontSize: '25px', marginTop: '50px', marginBottom: '70px', width: '80%', textAlign: 'center'}}>
        This is another classic program that demonstrates nested if statements. These are used to deduce something about a number, based on a series of conditions.
      </div>
      <div style={{ fontSize: '30px', marginBottom: '10px', fontWeight: 'bold', alignSelf: 'flex-start', marginLeft: '50px' }}>
        Example 6: Nesting Hell
      </div>
      <div className="body" style={{ display: 'flex', justifyContent: 'center', gap: '200px', alignItems: 'flex-start', marginTop: '75px', marginLeft: '30px', marginRight: '30px'}}>
        <img alt="cfg" src={require("./ex6.png")} style={{width: '30%'}}/>
        <img alt="cfg" src={require("./ex6Nested.png")} style={{width: '40%'}}/>
      </div>
      <div style={{ fontSize: '25px', marginTop: '50px', marginBottom: '70px', width: '80%', textAlign: 'center'}}>
        This example demonstrates how complicated programs can get when the have many nested elements. Note how if we simply limit the width of our graph, simpleCFG encapsulates a lot of the complexity into the Nested If block. 
      </div>
    </div>
    </>
  );
}
export default About