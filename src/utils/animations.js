import TweenMax from 'gsap';
import './animations.css'

export function animateErrorButton(button) {
    TweenMax.to(button, 1, {
        backgroundColor: "#e74c3c"
    }); 
    TweenMax.to(button, .1, {
        x: -7,
        ease: TweenMax.Quad.easeInOut
    });
    TweenMax.to(button, .1, {
        repeat: 4,
        x: 7,
        yoyo: true,
        delay: .1,
        ease: TweenMax.Quad.easeInOut
        });
    TweenMax.to(button, .1, {
         x: 0,
        delay: .1 * 4
    });
}

export function expandCard(card, expandedClass, callback) {

    let first = card.getBoundingClientRect();
    card.classList.add(expandedClass);

    let last = card.getBoundingClientRect();


    const invertXY = first.width / last.width;
    const invertSY = first.height/ last.height;
    const invertX = first.left - last.left;
    const invertY = first.top - last.top;

    TweenMax.to(card, 0, {
        scaleX: invertXY,
        scaleY: invertSY,
        y: invertY,
        x: invertX,
        transformOrigin: '0 0'
    })

    console.log(card.getBoundingClientRect().top);
    
    TweenMax.to(card, 0.5, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        ease: TweenMax.Back.easeInOut,
        onComplete: callback
    });
    
}