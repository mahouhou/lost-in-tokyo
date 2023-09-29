import "./css/main.css";
import "./css/tachyons.css";

import React from "react";
import menu from "./data/menu"; //nav menu data
import attractions from "./data/attractions"; //attractions data

function App() {
  const Nav = () => (
    <nav className="pt3 pt4-ns mb4 mb0-ns">
      <ul className="list flex flex-wrap flex-nowrap-ns justify-between items-center pa0 ma0">
        {menu.map((item) => (
          <NavItem {...item} key={item.children} />
        ))}
      </ul>
    </nav>
  );

  //Receive props from menu data via Nav component
  const NavItem = ({ className, href, children, logo }) => (
    <li className={`mh2-ns f6 f4-l tc ${className}`}>
      <a className="white no-underline" href={href}>
        {logo ? (
          <img
            src={require("./images/logo.svg").default}
            className="db center logo"
            alt="Lost in Tokyo"
          />
        ) : (
          children
        )}
      </a>
    </li>
  );

  const Intro = () => (
    <div className="m-auto-ns f4 f3-m f2-1 tc w-80-1 normal">
      <div className="mb3 mb4-ns">
        <Highlight colour="aqua">Lost in Tokyo</Highlight> is a directory of fun
        places to see, play in and{" "}
        <Highlight colour="yellow">explore</Highlight>, in{" "}
        <Highlight colour="blue">Tokyo</Highlight>, Japan.
      </div>
      <div>
        From <Highlight colour="blue">museums</Highlight> and{" "}
        <Highlight colour="blue">galleries</Highlight>, to{" "}
        <Highlight colour="pink">Robot Restaurants</Highlight> and{" "}
        <Highlight colour="pink">kitten cafes</Highlight>, Tokyo is the gift
        that keeps on giving. <Highlight colour="yellow">Dattebayo!</Highlight>
      </div>
    </div>
  );

  const Highlight = ({ colour, children }) => (
    <span className={`relative highlight highlight-${colour}`}>
      <span className="relative z-2">{children}</span>
    </span>
  );

  // Pass props from attractions data via Attraction component
  const Overlay = ({ showInfo, title, description, link }) => (
    <div
      className="absolute w-100 h-100 flex items-center pa3 pa4-ns bg-aqua overlay"
      style={{ transform: showInfo ? "none" : "translateY(-100%)" }}
    >
      <div>
        <h1 className="f4 f3-ns mt0 mb2 regular black normal lh-title">
          <a href={link}>{title}</a>
        </h1>
        <p className="lh-title lh-copy-ns mv0 black f6 measure-l">
          {description}
        </p>
      </div>
    </div>
  );

  class Attraction extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // Default state is hidden
        showInfo: false,
      };
      this.toggleInfo = this.toggleInfo.bind(this);
      this.closeInfo = this.closeInfo.bind(this);
    }

    // toggleInfo function flips the showInfo state
    toggleInfo() {
      this.setState((prevState, props) => ({
        showInfo: !prevState.showInfo,
      }));
    }

    // closeInfo function resets the showInfo state back to hidden
    closeInfo() {
      this.setState({
        showInfo: false,
      });
    }

    render() {
      return (
        <div
          className={`ph4 ph5-ns ph0-l mb4 mb5-ns w-100 overflow-hidden pointer attraction ${this.props.className}`}
          onClick={this.toggleInfo}
          onMouseLeave={this.closeInfo}
        >
          <div className="relative">
            <Overlay {...this.props} {...this.state} />
            <img
              src={`${process.env.PUBLIC_URL}/images/${this.props.image}`}
              className="db"
              alt={this.props.title}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="App">
      <div className="min-vh-100 ph4 flex flex-column">
        <Nav />
        <Intro />
      </div>
      <div className="flex flex-wrap container">
        {attractions.map((attraction) => (
          <Attraction {...attraction} key={attraction.title} />
        ))}
      </div>
    </div>
  );
}

export default App;
