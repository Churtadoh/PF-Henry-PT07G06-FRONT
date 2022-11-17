
import React from "react";
import styles from "./Hero.module.css";
//import logo from "../media/juira_color.png";
import { useSelector } from "react-redux";
import Carousel from './Carousel.jsx';


export default function Hero() {
  const { categories } = useSelector((state) => state.app.filterState);
  return (
    <section className={styles.heroContainer}>
      {/* <div className={styles.divContainer}>
                <div className={styles.centerBox}>
                    hero
                </div>
            </div> */}

      <div className={styles.box}>
        {/* <img className={styles.img} src={logo} alt='Juira logo' /> */}
        {/* <div>{categories === "Todos" ? "BIENVENIDO A JUIRA" : categories.toUpperCase()}</div> */}
        {<Carousel />}
      </div>
      {/* <div className={styles.imgWrapper}> */}
      <div className={styles.imgPattern}></div>
      {/* </div> */}
    </section>
  );

}
