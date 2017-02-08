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

export function rippleAnimation(button, event, timing) {
    
}