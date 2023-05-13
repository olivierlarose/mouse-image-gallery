'use client'
import styles from './page.module.css'
import { useRef } from 'react';

export default function Home() {

  let refs = []
  let currentIndex = 0;
  let steps = 0;
  let maxNumberOfImages = 8;
  let nbOfImages = 0;

  const manageMouseMove = (e) => {
    const { clientX, clientY, movementX, movementY } = e;

    steps+= Math.abs(movementX) + Math.abs(movementY);

    if(steps >= currentIndex * 150){
      moveImage(clientX, clientY)
    }

    if(nbOfImages == maxNumberOfImages){
      removeImage();
    }

    if(currentIndex == refs.length){
      currentIndex = 0;
      steps = 0;
    }

  }

  const moveImage = (x, y) => {
    const currentImage = refs[currentIndex].current;
    currentImage.style.left = x + "px";
    currentImage.style.top = y + "px";
    currentImage.style.display = "block";
    currentImage.style.zIndex = 1;
    resetZIndex();
    currentIndex++;
    nbOfImages++;
  }

  const resetZIndex = () => {
    for(let i = 0 ; i < refs.length ; i++){
      if(i != currentIndex){
        refs[i].current.style.zIndex = 0;
      }
    }
  }

  const removeImage = () => {
    let indexToRemove = currentIndex - maxNumberOfImages
    if(indexToRemove < 0) indexToRemove = indexToRemove + refs.length
    const currentImage = refs[indexToRemove].current;
    currentImage.style.display = "none";
    nbOfImages--;
  }

  return (
    <main onMouseMove={(e) => {manageMouseMove(e)}} className={styles.main}>
       {
        [...Array(19).keys()].map( (_, index) => {
          const ref = useRef(null);
          refs.push(ref)
          return <img key={index} onClick={() => {console.log(refs)}} ref={ref} src={`/images/${index}.jpg`}></img>
        })
      }
    </main>
  )
}
