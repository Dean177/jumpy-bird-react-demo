import { Next, Previous, Goto } from '../../shared/Constants/SlidesActionTypes';
import { socket } from '../App';

export function nextSlide(currentSlideNumber, shiftKey, ctrlKey) {
    if (shiftKey && ctrlKey) { socket.emit(Goto, currentSlideNumber + 1); }
    return { type: Next };
}

export function previousSlide(currentSlideNumber, shiftKey, ctrlKey) {
    if (shiftKey && ctrlKey) { socket.emit(Goto, currentSlideNumber - 1); }
    return { type: Previous };
}

export function gotoSlide(slideNumber) {
    return {
        type: Goto,
        slideNumber
    }
}