<?php
/**
 * Theme functionality
 * -------------------
 */


/**
 * Enque theme style
 */
function theme_enqueues() {
    // Style
    wp_enqueue_style( 'theme-style', get_template_directory_uri() . '/assets/css/style.css' );
    
    // Scripts
    wp_enqueue_script( 'theme-script', get_template_directory_uri() . '/assets/js/script.js' );
}

add_action( 'wp_enqueue_scripts', 'theme_enqueues' );