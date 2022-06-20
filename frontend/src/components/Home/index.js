import React from 'react';
import ImgKidsHavingFun from './vector-illustration-cute-kids-having-fun-slide-playground-cute-kids-having-fun-slide-playground-117607840-removebg-preview.png';
import './main.css';

const Home = () => {
    return (
        <>
            <div id="welcome">
            <p>Welcome to <br /> PlaygroundFinder!</p>
        </div>

        <main>
            <div id="quicksearch">
                <article>
                    <h2>Playground near me</h2>
                    <img src={ImgKidsHavingFun} />

                </article>

                <input type="search" id="search" name="q" />
                <button>search</button>
                <p>
                    <label><input type="checkbox" name="Feature Alternatives" value="Yes" />disabled</label>
                    <label><input type="checkbox" name="Feature Alternatives" value="Yes" />indoor</label>
                    <label><input type="checkbox" name="Feature Alternatives" value="Yes" />Age 0-3</label>
                    <label><input type="checkbox" name="Feature Alternatives" value="Yes" />Age 3-6</label>
                    <label><input type="checkbox" name="Feature Alternatives" value="Yes" />Age 6-12</label>

                </p>

            </div>
            <div id="weather">
                <h2>Weather</h2>
                <img src="Images/unnamed.png" />
            </div>

            <div id="top3">
                <h2>TOP 3 PLAYGROUNDS</h2>
                <div>

                </div>
            </div>

            <div id="map">
                <article>
                <h2>How to get there</h2>
                <p>
                    Here you will find detailed information about how to get from where you are right now
                    (wherever that is) to where you (or at least your kids) want to be: the perfect playground.
                </p>
                </article>
                <img src="Images/map.png" />
            </div>

            </main>
        </>
    );
};

export default Home;