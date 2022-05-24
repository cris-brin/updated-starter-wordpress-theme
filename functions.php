<?php
/**
 * Theme functionality
 * -------------------
 */

/**
 * Global theme status
 */
$theme_status = 'prod';

if($theme_status === 'prod')
{
    $ext = '.min';
}

/**
 * Enque theme style
 */
function theme_enqueues() {
    // Style
    wp_enqueue_style( 'theme-style', get_template_directory_uri() . '/assets/css/style' . $ext ?? NULL . '.css' );
    
    // Scripts
    wp_enqueue_script( 'theme-script', get_template_directory_uri() . '/assets/js/script' . $ext ?? NULL . '.js' );
}

add_action( 'wp_enqueue_scripts', 'theme_enqueues' );