import TweenMax from 'gsap';

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
    
    TweenMax.to(card, 0.2, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        ease: TweenMax.ease,
        onComplete: callback
    });   
}

export function expand(card, expandedClass, callback) {
    let header = document.getElementById('mainHeader');
    let tl = new TweenMax.TimelineMax();
    tl.to(header, 0.1, {y: '-120%'}, TweenMax.ease);
    tl.add(() => {expandCard(card, expandedClass, callback)});
}

export function fadeIn(target, fromOpacity, toOpacity, cb) {
    TweenMax.fromTo(target, 1, {opacity: fromOpacity}, {opacity: toOpacity, onComplete: cb});
}

export function leave(target, duration,  direction, cb) {
    let dir = direction === 'right' ? '100%' : '-100%';
    let tl = new TweenMax.TimelineMax();
    tl.to(target, duration, {x : dir});
    tl.add(cb);
}

export function enter(target, duration, from, cb) {
    let dir = from ==='right' ? '100%' : '-100%';
    let tl = new TweenMax.TimelineMax();
    tl.fromTo(target, duration, {x : dir}, {x: '0%'});
    tl.add(() => cb());
    tl.play();
}

export function enterTop(target, duration, delay, cb) {
    let tl = new TweenMax.TimelineMax();
    tl.fromTo(target, duration, {y: '-100%'}, {y: '0%', ease: TweenMax.Bounce.easeOut}, delay);
    tl.add(() => cb());
    tl.play();
}

export function animateSuccessButton(target, toElement, cb) {

    let tl = new TweenMax.TimelineMax();
    tl.to(target, 0.6, {backgroundColor: "green"}, TweenMax.easeInOut);
    tl.to(target, 0.6, {backgroundColor: '#34495e'}, TweenMax.easeInOut, "+=0.6");
    tl.add(() => cb());
    tl.play();
}
