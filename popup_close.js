var last_position;
function closePopup() {
    last_position = window.pageYOffset;

    // The immediate timeout doesn't always work, so we add a slightly slower
    // one to ensure that it works while reducing flickering in most cases.
    // Doubling up isn't strictly necessary, if you want to avoid it.
    setTimeout('window.scroll(0, last_position)', 1);
    setTimeout('window.scroll(0, last_position)', 4);
}
