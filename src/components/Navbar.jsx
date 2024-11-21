import React, { Component } from 'react'

export class Navbar extends Component {
  render() {
    return (
      
        <nav className="navbar">
          <div className="logo">MOVIO</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="nav-toggle">☰</div>
          <div className="message">{this.state.message}</div>
          <button className="gold-button" onClick={this.changeText}>Sign up</button>
          <button className="gold-button" onClick={this.changeName}>Sign in</button>
        </nav>
      
       
    )
  }
}

export default Navbar